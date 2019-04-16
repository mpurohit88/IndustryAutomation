export const getStatus = function (status) {
	switch (status) {
		case 1: return 'New'
		case 2: return 'Started'
		case 3: return 'Quote Sent'
		case 4: return 'Reminder Scheduled'
		case 5: return 'Waiting For Order Confirmation'
		case 6: return 'Order Confirmed'
		case 8: return 'Order Dispatched'
		case 100: return 'Quote Closed'
		case 101: return 'Quote Closed'
		case 102: return 'Quote Discarded'

		default: return '';
	}
}

export const getVariant = function (status) {
	switch (status) {
		case 1: return 'primary'
		case 2: return 'success'
		case 101: return 'danger'
		case 102: return 'danger'

		default: return 'success'
	}
}