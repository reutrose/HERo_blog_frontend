import { format, formatDistanceToNow } from "date-fns";

export const formatBirthDate = (date) => {
	return format(new Date(date), "yyyy-MM-dd");
};

export const formatDateOnly = (data) => {
	return format(new Date(data), "dd/MMM/yyyy");
};

export const formatTimeOnly = (data) => {
	return format(new Date(data), "hh:mm");
};
export const formatDateAndTime = (data) => {
	return format(new Date(data), "MMMM do, yyyy - hh:mm aa");
};

export const formatTimeUntilNow = (data) => {
	let year = format(new Date(data), "yyyy");
	let day = format(new Date(data), "d");
	let month = +format(new Date(data), "M") - 1;
	let hour = format(new Date(data), "H");
	let minutes = format(new Date(data), "m");
	let seconds = format(new Date(data), "s");
	return formatDistanceToNow(
		new Date(year, month, day, hour, minutes, seconds)
	);
};
