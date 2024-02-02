import { Post, sequelize } from '$lib/server/db';
import type { Post as PostType } from '$lib/server/db.models';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	const queryResult = await sequelize.query('SELECT * FROM posts ORDER BY published_on DESC');
	return json(queryResult[0]);
}

export async function POST({ request }) {
	const { id, title, published_on, caption, imageLocation } = await request.json();
	const allPostIds = (await sequelize.query('SELECT id FROM posts')) as [PostType[], unknown];

	if (allPostIds[0].some((post) => post.id === id)) {
		error(400, {
			message: `Post with ID ${id} already exists.`,
		});
	}

	const newPost = {
		id,
		title,
		published_on,
		caption,
		image_location: imageLocation,
	};

	await Post.create(newPost);

	return json(newPost);
}
