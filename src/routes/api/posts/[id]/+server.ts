import { sequelize } from '$lib/server/db';
import type { Post } from '$lib/server/db.models';
import { error, json } from '@sveltejs/kit';

const verifyPostExists = async (id: string) => {
	const allPostIds = (await sequelize.query('SELECT id FROM posts')) as [Post[], unknown];

	if (!allPostIds[0].some((post) => post.id === id)) {
		error(404, {
			message: `Post with ID '${id}' was not found.`,
		});
	}
};

export async function GET({ params }) {
	await verifyPostExists(params.id);
	const post = (await sequelize.query(`SELECT * FROM posts WHERE id='${params.id}';`)) as [
		Post[],
		unknown,
	];
	return json(post[0][0]);
}

export async function PUT({ params, request }) {
	const { title, published_on, caption } = await request.json();
	await verifyPostExists(params.id);
	const queryResult = await sequelize.query(`
    UPDATE posts
    SET title='${title}', published_on='${published_on}', caption='${caption}'
    WHERE id='${params.id}';
  `);
	return json(queryResult[0]);
}

export async function DELETE({ params }) {
	await verifyPostExists(params.id);

	// Update links
	const allPosts = (await sequelize.query('SELECT * FROM posts')) as [Post[], unknown];
	const thisPost = allPosts[0].find((post) => post.id === params.id);
	const previousId = thisPost?.previous_post;
	const nextId = thisPost?.next_post;
	if (previousId && nextId) {
		await sequelize.query(`
			UPDATE posts
			SET next_post='${nextId}'
			WHERE id='${previousId}';
		`);

		await sequelize.query(`
			UPDATE posts
			SET previous_post='${previousId}'
			WHERE id='${nextId}';
		`);
	} else if (previousId && !nextId) {
		await sequelize.query(`
			UPDATE posts
			SET next_post=NULL
			WHERE id='${previousId}';
		`);
	} else if (!previousId && nextId) {
		await sequelize.query(`
			UPDATE posts
			SET previous_post=NULL
			WHERE id='${nextId}';
		`);
	}

	const queryResult = await sequelize.query(`
    DELETE FROM posts
    WHERE id='${params.id}';
  `);
	return json(queryResult[0]);
}
