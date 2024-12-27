export function getInitials(name: string): string {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

export function formatDateToMonthYear(dateString: string) {
	// Create a new Date object from the input string
	const date = new Date(dateString);

	// Define an array of short month names
	const shortMonths = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	// Extract the month and year
	const month = shortMonths[date.getMonth()];
	const year = date.getFullYear();

	// Return the formatted string
	return `${month} ${year}`;
}
