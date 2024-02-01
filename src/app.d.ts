declare global {
	namespace App {
		interface Locals {
			config: import('./lib/site-config').SiteConfig;
			siteKey: string;
		}
	}
}

declare module '@fortawesome/free-solid-svg-icons/index.es' {
	export * from '@fortawesome/free-solid-svg-icons';
}

export {};
