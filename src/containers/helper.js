export const getISODateTime = function(dateTime) {
	return new Date(dateTime).toLocaleString();
}

export const getAdmin = function() {
	return JSON.parse(localStorage.getItem('user')).role == 'admin';
}

export const getUserName = function() {
	return JSON.parse(localStorage.getItem('user')).result;
}

export const getCompanyName = function() {
	return JSON.parse(localStorage.getItem('user')).cname;
}