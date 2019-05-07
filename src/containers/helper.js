export const getISODateTime = function (dateTime) {
	return new Date(dateTime).toLocaleString();
}

export const getDateTimePickerDateTime = function (date) {
	const now = new Date(date);
	const day = ("0" + now.getDate()).slice(-2);
	const month = ("0" + (now.getMonth() + 1)).slice(-2);

	return now.getFullYear() + "-" + (month) + "-" + (day) + "T" + now.toTimeString().split(" ")[0];
}

export const getDateTimePickerDate = function (date) {
	const now = new Date(date);
	const day = ("0" + now.getDate()).slice(-2);
	const month = ("0" + (now.getMonth() + 1)).slice(-2);

	return now.getFullYear() + "-" + (month) + "-" + (day);
}

export const getDateTimePickerTime = function (date) {
	const now = new Date(date);

	return now.toTimeString().split(" ")[0];
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

export const getFullUserName = function () {
	const user = JSON.parse(localStorage.getItem('user'));
	return user ? user.userName : undefined;
}