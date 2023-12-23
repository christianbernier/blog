export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = data.get('id');
		const title = data.get('title');
		const published_on = data.get('published');
		const content = data.get('content');

		await fetch(`/api/posts`, {
			method: 'POST',
			body: JSON.stringify({
				id,
				title,
				published_on,
				content,
			}),
		});
	},
};
