export const getPrettyDateString = (yearMonthDay: string): string => {
	const date = new Date(yearMonthDay);
	const timeDiff = date.getTimezoneOffset() * 60000;
	const utc = new Date(date.valueOf() + timeDiff);
	return utc.toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};
