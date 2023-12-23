import { sequelize } from '$lib/server/db';
import type { Post } from '$lib/server/db.models';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	const queryResult = await sequelize.query('SELECT * FROM posts ORDER BY published_on DESC');
	return json(queryResult[0]);
}

export async function POST({ request }) {
	const { id, title, published_on, content } = await request.json();
	const allPostIds = (await sequelize.query('SELECT id FROM posts')) as [Post[], unknown];

	if (allPostIds[0].some((post) => post.id === id)) {
		error(400, {
			message: `Post with ID ${id} already exists.`,
		});
	}

	const queryResult = await sequelize.query(`
  INSERT INTO posts (id,title,published_on,content)
  VALUES ( '${id}', '${title}', '${published_on}', '${content}' )
  `);
	return json(queryResult[0]);
}
