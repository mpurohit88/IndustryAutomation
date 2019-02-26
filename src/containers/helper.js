export const getISODateTime = function (dateTime) {
	return new Date(dateTime).toLocaleString();
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