import { error, type NumericRange } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const response = await event.fetch('/api/posts');
	const posts = await response.json();
	if (!response.ok) {
		error(response.status as NumericRange<400, 599>, posts.message);
	}
	return { posts };
}) satisfies PageServerLoad;
