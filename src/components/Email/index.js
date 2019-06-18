import { GetContactEmail } from './template'
import { GetDisptachEmail } from './dispatchTemplate'
import { GetPaymentEmail } from './paymentReminder'

export const getTemplate = function getTemplate(companyId, products, quoteDetails, constactPerson, particular, currencyHtmlCode) {
	switch (companyId) {
		case 1: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode);
		case 2: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode);
		case 3: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode);

		default: return GetContactEmail(products, quoteDetails, constactPerson, particular, currencyHtmlCode);;
	}
}

export const getDispatchTemplate = function getDispatchTemplate(companyId, productBody, quoteDetails, constactPerson, particular, currencyHtmlCode, dispatchSummary, footerBody) {
	switch (companyId) {
		case 1: return GetDisptachEmail(productBody, quoteDetails, constactPerson, particular, currencyHtmlCode, dispatchSummary, footerBody);
		case 2: return GetDisptachEmail(productBody, quoteDetails, constactPerson, particular, currencyHtmlCode, dispatchSummary, footerBody);
		case 3: return GetDisptachEmail(productBody, quoteDetails, constactPerson, particular, currencyHtmlCode, dispatchSummary, footerBody);

		default: return GetDisptachEmail(productBody, quoteDetails, constactPerson, particular, currencyHtmlCode, dispatchSummary, footerBody);;
	}
}

export const getPaymentTemplate = function getPaymentTemplate(companyId, dispatchSummary, footerBody) {
	switch (companyId) {
		case 1: return GetPaymentEmail(dispatchSummary, footerBody);
		case 2: return GetPaymentEmail(dispatchSummary, footerBody);
		case 3: return GetPaymentEmail(dispatchSummary, footerBody);

		default: return GetPaymentEmail(dispatchSummary, footerBody);;
	}
}