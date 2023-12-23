import type { PageServerLoad } from './$types';

export const load = ((event) => {
	return {
		streamed: {
			post: event.fetch(`/api/posts/${event.params.id}`).then((data) => data.json()),
		},
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch, params }) => {
		const data = await request.formData();
		const id = params.id;
		const title = data.get('title');
		const published_on = data.get('published');
		const content = data.get('content');

		await fetch(`/api/posts/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				title,
				published_on,
				content,
			}),
		});
	},
};
