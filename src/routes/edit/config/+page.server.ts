import type { EditableSiteConfig } from '$lib/site-config';
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream';
import type { PageServerLoad } from './$types';
import { env } from '$lib/server/env';
import { error } from '@sveltejs/kit';
import { s3 } from '$lib/server/s3';

export const load = ((event) => {
	return {
		streamed: {
			config: event.fetch(`/api/config`).then((data) => data.json() as Promise<EditableSiteConfig>),
		},
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();

		const profilePicture = data.get('homepage__profile');
		if (profilePicture && (profilePicture as File).size > 0) {
			const file = profilePicture as File;
			const stream = new ReadableWebToNodeStream(file.stream());
			const imageKey = `${env.SITE_KEY}.profile.jpg`;
			try {
				await s3
					.upload({
						Bucket: 'blog-config',
						ACL: 'public-read',
						Body: stream,
						Key: imageKey,
						ContentType: 'image/jpeg',
					})
					.promise();
			} catch (e) {
				error(500, {
					message: 'Error uploading to S3',
				});
			}
		}

		const newConfig: EditableSiteConfig = {
			site: {
				title: data.get('site__title') as string,
			},
			homepage: {
				header: data.get('homepage__header') as string,
				description: data.get('homepage__description') as string,
				button: data.get('homepage__button_text') as string,
			},
			styles: {
				colors: {
					background: data.get('colors__background') as string,
					onBackground: data.get('colors__on_background') as string,
					primary: data.get('colors__primary') as string,
					onPrimary: data.get('colors__on_primary') as string,
					secondary: data.get('colors__secondary') as string,
					onSecondary: data.get('colors__on_secondary') as string,
					topBar: data.get('colors__top_bar') as string,
				},
				fonts: {
					default: data.get('fonts__default') as string,
					welcome: data.get('fonts__welcome') as string,
					siteName: data.get('fonts__site_name') as string,
				},
			},
		} as EditableSiteConfig;

		await fetch(`/api/config`, {
			method: 'PUT',
			body: JSON.stringify(newConfig),
		});
	},
};
