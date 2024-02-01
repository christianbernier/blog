import type { SiteConfig } from '$lib/site-config';
import { env } from './env';

export const getSiteConfig = async (): Promise<SiteConfig> => {
	const response = await fetch(
		`https://pub-1844ca77bffb49e2a458b2ed97135420.r2.dev/${env.SITE_KEY || 'default'}.config.json`,
	);
	const config: SiteConfig = await response.json();
	return {
		...config,
	};
};
