export const getPrettyDateString = (yearMonthDay: string): string => {
	const date = new Date(yearMonthDay);
	return date.toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};
