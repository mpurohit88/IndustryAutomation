//1. Import React and react-html-email
import React from 'react';
import { Box, Email, Item, Span, renderEmail } from 'react-html-email';
import { getTodaysDate } from '../../utils/dates'
/* component styles */
import { styles } from './styles.scss'

// 2. Create some CSS to be injected in the head as a prop of
// the <Email> component. See step #3 below.
const css = ` h5 {display:flex; justify-content: space-between;} br { line-height: 1}  table { page-break-after:auto; text-align: left; }
  tr    { page-break-inside:avoid; page-break-after:auto }
  td    { page-break-inside:avoid; page-break-after:auto }
  thead { display:table-header-group }
  tfoot { display:table-footer-group }
@media only screen and (max-device-width: 480px) {
  font-size: 20px !important;
}`.trim();


//3. Create your react component using react-html-email components
const ContactMeTemplate = function ({ quoteDetails, productBody, constactPerson, particular, currencyHtmlCode, dispatchSummary, footerBody }) {
    let showImageColumn = false;
    let isShowGST = false;

    let getCurrencySymbole = function (currency) {
        let code;

        currencyHtmlCode.map((htmlCode) => {
            if (htmlCode.id == currency) {
                code = htmlCode.code;
            }
        });

        return code;
    }

    let getRateSybmole = function (currency) {
        switch (currency) {
            case 1:
                return '/-';
            default:
                return ''
        }
    }

    // if (products) {
    //     products.map((product) => {
    //         if (product.imgName && product.imgName !== '') {
    //             showImageColumn = true;
    //         }

    //         if (product.gstn && (product.gstn !== '' && product.gstn !== '0')) {
    //             isShowGST = true;
    //         }
    //     })
    // }

    return <Email title="Dispatch Summary" headCSS={css} className={styles} className="quotation" id="dispatchSummary">
        <Box width="700" style={{ lineHeight: 2 }}>
            {/* <Item width="100%" style={{ textAlign: 'center' }}>
                <center><div style={{ textAlign: 'center', textDecoration: 'underline', fontWeight: 'bold', fontSize: 20 + 'px' }}>Dispatch Summary</div></center>
                <br /> <br />
            </Item> */}
            <Item>
                <table width="100%" style={{ font: 'Times New Roman', textAlign: 'left' }} id='dispatchSummaryBody'>
                    <tr width="100%">
                        <td>
                            Our Ref: <input type='text' id='refId' name='refId' />
                        </td>
                        <td style={{ textAlign: 'right' }}>
                            Date: {getTodaysDate()}
                        </td>
                    </tr>
                    <tr><td style={{ lineHeight: '1' }}><br /></td></tr>
                    <tr>
                        <td style={{ lineHeight: '1.4', maxWidth: '200px', verticalAlign: 'top' }}>
                            <strong>{quoteDetails.companyName}</strong> <br />
                            {quoteDetails.address}
                        </td>
                        <td style={{ textAlign: 'right', lineHeight: '1.4' }}>
                            <strong>Kind Atten: {constactPerson.name}</strong> <br />
                            {constactPerson.designation ? <span>Designation: {constactPerson.designation}<br /></span> : ''}
                            Phone No.: {quoteDetails.mobileNo}<br />
                            Email: {constactPerson.email}<br />
                            {constactPerson.email === quoteDetails.email ? '' : quoteDetails.email}
                        </td>
                    </tr>
                    <tr>
                        <td><br /></td>
                    </tr>
                    <tr>
                        <td>
                            Sub: <strong>Dispatch Details of Material</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' style={{ lineHeight: '1.6' }}><br />Dear Sir, <br /><br />
                            <label>With reference to below mentioned purchase orders, we are pleased to inform you having dispatched the meterial
                    and in this connection please find enclosed herewith our following documents for your necessary action.</label>
                            <br /> <br />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' className='child'>
                            <table width="100%" height="100%" cellPadding="0" cellSpacing="0" border="0" align="left" valign="top">
                                <thead>
                                    <tr style={{ background: '#ededed' }}>
                                        <th colSpan="6" style={{ textAlign: 'center' }}>
                                            <label style={{ fontSize: '17px' }}>
                                                INVOICE CUM DISPATCH DETAILS
                            </label>
                                        </th>
                                    </tr>
                                    <tr style={{ background: '#ededed' }}>
                                        <th style={{ border: '1px solid black', padding: '10px', width: '250px' }}>PURCHASE ORDER NO. AND DATE</th>
                                        <th style={{ border: '1px solid black', padding: '10px', width: '150px' }}>INVOICE NO.</th>
                                        <th style={{ border: '1px solid black', padding: '10px', width: '150px' }}>INVOICE DATE</th>
                                        <th style={{ border: '1px solid black', padding: '10px', width: '150px' }}>TRANSPORTR'S NAME</th>
                                        <th style={{ border: '1px solid black', padding: '10px' }}>BILTY NO.</th>
                                        <th style={{ border: '1px solid black', padding: '10px' }}>UP TO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label>
                                                {dispatchSummary.order_no}
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                                {dispatchSummary.invoice_no}
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                                {dispatchSummary.invoice_date}
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                                {dispatchSummary.transporter_name}
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                                {dispatchSummary.bilty_no}
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                                {dispatchSummary.up_to}
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' className='child'>
                            <table width="100%" height="100%" cellPadding="0" cellSpacing="0" border="0" align="left" valign="top">
                                <thead>
                                    <tr style={{ background: '#ededed' }}>
                                        <th style={{ border: '1px solid black', padding: '10px', width: '250px' }}>DESCRIPTION</th>
                                        <th style={{ border: '1px solid black', padding: '10px', width: '145px' }}>QTY</th>
                                        <th style={{ border: '1px solid black', padding: '10px', width: '100px' }}>UNIT</th>
                                        <th style={{ border: '1px solid black', padding: '10px', width: '145px' }}>AMOUNT</th>
                                        <th style={{ border: '1px solid black', padding: '10px', width: '167px' }}>CUSTOMER'S NAME</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productBody}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' style={{ lineHeight: '1.6', pageBreakBefore: 'always' }}>
                            <label>
                                <div dangerouslySetInnerHTML={{ __html: footerBody }} />
                            </label>
                        </td>
                    </tr>
                </table>
            </Item >
        </Box >
    </Email >;
};

// 4. Feed your component into react-html-email's renderEmail 
// function, which converts it into the needed html, tables and all.
// https://stackoverflow.com/questions/40417527/how-do-i-preserve-line-breaks-when-getting-text-from-a-textarea/40426477
export const GetDisptachEmail = function (productBody, quoteDetails, constactPerson, particular, currencyHtmlCode, dispatchSummary, footerBody) {
    return renderEmail(<ContactMeTemplate productBody={productBody} quoteDetails={quoteDetails} constactPerson={constactPerson} particular={particular} currencyHtmlCode={currencyHtmlCode} dispatchSummary={dispatchSummary} footerBody={footerBody} />);
}