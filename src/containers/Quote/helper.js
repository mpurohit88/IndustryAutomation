export const getStatus = function(status) {
	switch(status) {
		case 1: return 'New'
		case 2: return 'Scheduled'
		case 3: return 'Closed'
		default: return '';
	}
}

export const getVariant = function(status) {
	switch(status) {
		case 1: return 'primary'
		case 2: return 'success'
		default: return ''
	}
}