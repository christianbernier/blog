import { s3 } from '$lib/server/s3';
import { error } from '@sveltejs/kit';
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = data.get('id');
		const title = data.get('title');
		const published_on = data.get('published');
		const caption = data.get('caption');
		const image = data.get('image');

		const file = image as File;
		const stream = new ReadableWebToNodeStream(file.stream());
		const imageKey = `${id}_${file.name}`;
		try {
			await s3
				.upload({
					Bucket: 'blog-images',
					ACL: 'public-read',
					Body: stream,
					Key: imageKey,
				})
				.promise();
		} catch (e) {
			error(500, {
				message: 'Error uploading to S3',
			});
		}
		const imageLocation = `https://pub-0010a80c3ac14686bea0406aac7d1914.r2.dev/${imageKey}`;

		await fetch(`/api/posts`, {
			method: 'POST',
			body: JSON.stringify({
				id,
				title,
				published_on,
				caption,
				imageLocation,
			}),
		});
	},
};
