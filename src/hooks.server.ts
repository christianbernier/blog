import { connectToDB } from '$lib/server/db';
import { env } from '$lib/server/env';
import { getSiteConfig } from '$lib/server/site';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	event.locals.config = await getSiteConfig();
	event.locals.siteKey = env.SITE_KEY || 'default';

	// Database
	await connectToDB();

	// Authorization
	const url = new URL(event.request.url);
	if (url.pathname.startsWith('/edit')) {
		const auth = event.request.headers.get('Authorization');
		const adminLogin = env.ADMIN_LOGIN;

		if (!adminLogin || auth !== `Basic ${btoa(adminLogin)}`) {
			return new Response('Unauthorized', {
				status: 401,
				headers: {
					'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"',
				},
			});
		}
	}

	return await resolve(event);
}) satisfies Handle;
