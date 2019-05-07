import { GetContactEmail } from './template'

export default function getTemplate(companyId, products, quoteDetails, constactPerson, particular) {
	switch (companyId) {
		case 1: return GetContactEmail(products, quoteDetails, constactPerson, particular);
		case 2: return GetContactEmail(products, quoteDetails, constactPerson, particular);
		case 3: return GetContactEmail(products, quoteDetails, constactPerson, particular);

		default: return GetContactEmail(products, quoteDetails, constactPerson, particular);;
	}
}