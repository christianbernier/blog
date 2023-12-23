import { error, type NumericRange } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const response = await event.fetch(`/api/posts/${event.params.post}`);
	const post = await response.json();
	if (!response.ok) {
		error(response.status as NumericRange<400, 599>, post.message);
	}
	return { post };
}) satisfies PageServerLoad;
