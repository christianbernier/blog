import { Post, sequelize } from '$lib/server/db';
import type { Post as PostType } from '$lib/server/db.models';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	const queryResult = await sequelize.query('SELECT * FROM posts ORDER BY published_on DESC');
	return json(queryResult[0]);
}

export async function POST({ request }) {
	const { id, title, published_on, caption, imageLocation } = await request.json();
	const allPostIds = (await sequelize.query('SELECT id FROM posts ORDER BY published_on DESC')) as [
		PostType[],
		unknown,
	];

	if (allPostIds[0].some((post) => post.id === id)) {
		error(400, {
			message: `Post with ID ${id} already exists.`,
		});
	}

	// Update previous post
	if (allPostIds[0].length > 0) {
		await sequelize.query(`
			UPDATE posts
			SET next_post='${id}'
			WHERE id='${allPostIds[0][0].id}';
		`);
	}

	const newPost = {
		id,
		title,
		published_on,
		caption,
		image_location: imageLocation,
		previous_post: allPostIds[0].length > 0 ? allPostIds[0][0].id : null,
	};

	await Post.create(newPost);

	return json(newPost);
}
