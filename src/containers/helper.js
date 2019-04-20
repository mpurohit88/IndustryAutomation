export const getISODateTime = function (dateTime) {
	return new Date(dateTime).toLocaleString();
}

export const getDateTimePickerDate = function (date) {
	const now = new Date(date);
	const day = ("0" + now.getDate()).slice(-2);
	const month = ("0" + (now.getMonth() + 1)).slice(-2);

	return now.getFullYear() + "-" + (month) + "-" + (day);
}

export const getAdmin = function () {
	const user = JSON.parse(localStorage.getItem('user'));
	return user ? user.role == 'admin' : false;
}

export const getUserName = function () {
	const user = JSON.parse(localStorage.getItem('user'));
	return user ? user.result : undefined;
}

export const getCompanyName = function () {
	const user = JSON.parse(localStorage.getItem('user'));
	return user ? user.cname : undefined;
}

export const getCompanyLogo = function () {
	const user = JSON.parse(localStorage.getItem('user'));
	return user ? user.logo : undefined;
}