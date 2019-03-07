import { GetContactEmail } from './template'

export default function getTemplate(companyId, products, quoteDetails, constactPerson) {
	switch (companyId) {
		case 1: return GetContactEmail(products, quoteDetails, constactPerson);
		case 2: return GetContactEmail(products, quoteDetails, constactPerson);
		default: return '';
	}
}