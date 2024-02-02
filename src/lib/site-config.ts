export interface SiteConfig {
	site: {
		title: string;
	};
	homepage: {
		header: string;
		description: string;
		button: string;
	};
}

export interface EditableSiteConfig {
	site: {
		title: string;
	};
	homepage: {
		header: string;
		description: string;
		button: string;
	};
	styles: {
		colors: {
			background: string;
			onBackground: string;
			primary: string;
			onPrimary: string;
			secondary: string;
			onSecondary: string;
			topBar: string;
		};
		fonts: {
			default: string;
			welcome: string;
			siteName: string;
		};
	};
}
