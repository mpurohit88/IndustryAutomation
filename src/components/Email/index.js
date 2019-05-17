import { GetContactEmail } from './template'

export default function getTemplate(companyId, products, quoteDetails, constactPerson, particular, currencyHtmlCode, subject) {
	switch (companyId) {
		case 1: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode, subject);
		case 2: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode, subject);
		case 3: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode, subject);

		default: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode, subject);;
	}
}