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
	const { title, published_on, content } = await request.json();
	await verifyPostExists(params.id);
	const queryResult = await sequelize.query(`
    UPDATE posts
    SET title='${title}', published_on='${published_on}', content='${content}'
    WHERE id='${params.id}';
  `);
	return json(queryResult[0]);
}

export async function DELETE({ params }) {
	await verifyPostExists(params.id);
	const queryResult = await sequelize.query(`
    DELETE FROM posts
    WHERE id='${params.id}';
  `);
	return json(queryResult[0]);
}
