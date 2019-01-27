export const getStatus = function(status) {
	switch(status) {
		case 1: return 'New'
		case 2: return 'In Progress'
		case 3: return 'Closed'
		default: return '';
	}
}