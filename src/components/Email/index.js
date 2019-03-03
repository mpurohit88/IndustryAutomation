import { GetContactEmail } from './template'

export default function getTemplate(companyId, products, quoteDetails) {
	switch (companyId) {
		case 1:
			return GetContactEmail(products, quoteDetails);
		case 2:
			return GetContactEmail(products, quoteDetails);
		default:
			return '';
	}
}