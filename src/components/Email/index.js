import { GetContactEmail } from './template'

export default function getTemplate(companyId, products, quoteDetails, constactPerson, particular, currencyHtmlCode) {
	switch (companyId) {
		case 1: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode);
		case 2: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode);
		case 3: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode);

		default: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode);;
	}
}