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
	const day = `0${date.getDate()}`.slice(-2);

	// Return the formatted string
	// return `${month} ${year}`;
	return `${day} ${month} ${year}`;
}

export async function urlToFile(url: string, filename: string): Promise<File> {
	// Fetch the content from the URL
	const response = await fetch(url, {
		mode: 'no-cors',
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch URL: ${response.statusText}`);
	}

	// Get the data as a Blob
	const blob = await response.blob();

	// Create a File from the Blob
	return new File([blob], filename, { type: blob.type });
}
