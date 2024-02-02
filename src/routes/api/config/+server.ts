import { env } from '$lib/server/env';
import { s3 } from '$lib/server/s3';
import type { EditableSiteConfig } from '$lib/site-config.js';
import { error, json } from '@sveltejs/kit';

const getCssVariable = (css: string, variableName: string): string => {
	const match = css.match(new RegExp(`--${variableName}: (.*);`));

	if (!match) {
		return '';
	}

	return match[1];
};

export async function GET() {
	const siteConfigResponse = await fetch(
		`https://pub-1844ca77bffb49e2a458b2ed97135420.r2.dev/${env.SITE_KEY || 'default'}.config.json`,
	);
	const siteConfig = (await siteConfigResponse.json()) as Pick<
		EditableSiteConfig,
		'site' | 'homepage'
	>;

	const siteStylesResponse = await fetch(
		`https://pub-1844ca77bffb49e2a458b2ed97135420.r2.dev/${env.SITE_KEY || 'default'}.css`,
	);
	const siteStylesText = await siteStylesResponse.text();

	const siteStyles = {
		colors: {
			background: getCssVariable(siteStylesText, 'background'),
			onBackground: getCssVariable(siteStylesText, 'on-background'),
			primary: getCssVariable(siteStylesText, 'primary'),
			onPrimary: getCssVariable(siteStylesText, 'on-primary'),
			secondary: getCssVariable(siteStylesText, 'secondary'),
			onSecondary: getCssVariable(siteStylesText, 'on-secondary'),
			topBar: getCssVariable(siteStylesText, 'top-bar-color'),
		},
		fonts: {
			default: getCssVariable(siteStylesText, 'font-default'),
			welcome: getCssVariable(siteStylesText, 'font-welcome'),
			siteName: getCssVariable(siteStylesText, 'font-site-name'),
		},
	};

	const fullSiteConfig: EditableSiteConfig = {
		...siteConfig,
		styles: siteStyles,
	};

	return json(fullSiteConfig);
}

export async function PUT({ request }) {
	const newConfig = (await request.json()) as EditableSiteConfig;

	let cssVariables = '';
	cssVariables += `--background: ${newConfig.styles.colors.background};\n`;
	cssVariables += `--on-background: ${newConfig.styles.colors.onBackground};\n`;
	cssVariables += `--primary: ${newConfig.styles.colors.primary};\n`;
	cssVariables += `--on-primary: ${newConfig.styles.colors.onPrimary};\n`;
	cssVariables += `--secondary: ${newConfig.styles.colors.secondary};\n`;
	cssVariables += `--on-secondary: ${newConfig.styles.colors.onSecondary};\n`;
	cssVariables += `--top-bar-color: ${newConfig.styles.colors.topBar};\n`;
	cssVariables += `--font-default: ${newConfig.styles.fonts.default};\n`;
	cssVariables += `--font-welcome: ${newConfig.styles.fonts.welcome};\n`;
	cssVariables += `--font-site-name: ${newConfig.styles.fonts.siteName};\n`;
	const cssFile = `:root{\n${cssVariables}}`;

	try {
		await s3
			.upload({
				Bucket: 'blog-config',
				ACL: 'public-read',
				Body: JSON.stringify({
					site: {
						...newConfig.site,
					},
					homepage: {
						...newConfig.homepage,
					},
				}),
				Key: `${env.SITE_KEY}.config.json`,
			})
			.promise();
	} catch (e) {
		error(500, {
			message: 'Error uploading config to S3',
		});
	}

	try {
		await s3
			.upload({
				Bucket: 'blog-config',
				ACL: 'public-read',
				Body: cssFile,
				Key: `${env.SITE_KEY}.css`,
				ContentType: 'text/css',
			})
			.promise();
	} catch (e) {
		error(500, {
			message: 'Error uploading CSS to S3',
		});
	}

	return json(newConfig);
}
