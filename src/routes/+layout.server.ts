export async function load({ locals }) {
	return {
		config: locals.config,
		siteKey: locals.siteKey,
	};
}
