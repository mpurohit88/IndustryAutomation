//1. Import React and react-html-email
import React from 'react';
import { Box, Email, Item, Span, renderEmail } from 'react-html-email';
import { getTodaysDate } from '../../utils/dates'
/* component styles */
import { styles } from './styles.scss'

// 2. Create some CSS to be injected in the head as a prop of
// the <Email> component. See step #3 below.
const css = `br { line-height: 1} 
@media only screen and (max-device-width: 480px) {
  font-size: 20px !important;
}`.trim();


//3. Create your react component using react-html-email components
const ContactMeTemplate = function ({ quoteDetails, products, constactPerson, particular }) {
    let showImageColumn = false;
    let isShowGST = false;

    let getCurrencySymbole = function (currency) {
        switch (currency) {
            case 1:
                return '&#8377;';
            case 2:
                return '&#36;';
            case 3:
                return '&#8364;';
            case 4:
                return '&#165;';
            default:
                return '&#8377;';
        }
    }

    let getRateSybmole = function (currency) {
        switch (currency) {
            case 1:
                return '/-';
            default:
                return ''
        }
    }

    if (products) {
        products.map((product) => {
            if (product.imgName && product.imgName !== '') {
                showImageColumn = true;
            }

            if (product.gstn && (product.gstn !== '' && product.gstn !== '0')) {
                isShowGST = true;
            }
        })
    }

    return <Email title="Quotation" headCSS={css} className={styles} className="quotation">
        <Box width="100%" style={{ lineHeight: 2 }}>
            <Item width="100%" style={{ textAlign: 'center' }}>
                <center><div style={{ textAlign: 'center', textDecoration: 'underline', fontWeight: 'bold', fontSize: 20 + 'px' }}>QUOTATION</div></center>
                <br /> <br />
            </Item>
            <Item>
                <table width="100%">
                    <tr width="100%">
                        <td>
                            Our Ref <input type='text' id='refId' name='refId' />
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
                            <strong>Kind Atten: {constactPerson[0].name}</strong> <br />
                            Designation: {constactPerson[0].designation} <br />
                            Phone No.: {quoteDetails.phoneNo}<br />
                            Email: {constactPerson[0].email}<br />
                            {constactPerson[0].email === quoteDetails.email ? '' : quoteDetails.email}
                        </td>
                    </tr>
                    <tr>
                        <td><br /></td>
                    </tr>
                    <tr>
                        <td colSpan='2'><input size="100" type='text' id='refSubject' name='refSubject' value='Ref. Your Email Enquiry Dated' /></td>
                    </tr>
                    <tr>
                        <td colSpan='2' style={{ lineHeight: '1.6' }}>Dear Sir, <br />
                            We thank you very much for your above enquiry and pleased to quote our lowest offer as under:-
                            <br /> <br />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2'>

                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' className='child'>
                            <table width="100%" height="100%" cellPadding="0" cellSpacing="0" border="0" align="left" valign="top">
                                <tr>
                                    <th style={{ border: '1px solid black', padding: '10px', width: '68px' }}>Sr. No.</th>
                                    <th style={{ border: '1px solid black', padding: '10px', width: '444px' }}>{particular}</th>
                                    {showImageColumn && <th style={{ border: '1px solid black', padding: '10px' }}>Image</th>}
                                    <th style={{ border: '1px solid black', padding: '10px' }}>HSN code</th>
                                    <th style={{ border: '1px solid black', padding: '10px' }}>Qty.</th>
                                    <th style={{ border: '1px solid black', padding: '10px' }}>Rate</th>
                                    {isShowGST && <th style={{ border: '1px solid black', padding: '10px' }}>GST</th>}

                                </tr>
                                {
                                    products.map((product, index) => {
                                        return <tr>
                                            <td style={{ border: '1px solid black', padding: '10px' }}>
                                                {index + 1}
                                            </td>
                                            <td style={{ border: '1px solid black', padding: '10px', lineHeight: '1.3' }}>{product.name} <br /> {product.description}</td>
                                            {showImageColumn && <td style={{ border: '1px solid black', padding: '10px' }}>
                                                <img height="80" id={'img-' + index} src={`/img/product/${product.imgName}`} alt={product.imgName} />
                                            </td>}
                                            <td style={{ border: '1px solid black', padding: '10px' }}>{product.hsnCode}</td>
                                            <td style={{ border: '1px solid black', padding: '10px' }}>{product.quantity} {product.unit}</td>
                                            <td style={{ border: '1px solid black', padding: '10px' }}><span dangerouslySetInnerHTML={{ __html: getCurrencySymbole(product.currency_type) }} /> {product.rate}{getRateSybmole(product.currency_type)} Per {product.unit}</td>
                                            {isShowGST && <td style={{ border: '1px solid black', padding: '10px' }}>{product.gstn}%</td>}
                                        </tr>
                                    })
                                }
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 + 'px' }}>
                            <input size='70' type='text' id='about-product' name='about-product' value='NOTE' />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                            Terms & Conditions: <br />
                            <textarea cols="108" rows="20" id='terms' name='terms' />
                            <p id="term-data" style={{ lineHeight: '1.6' }}></p>
                        </td>
                    </tr>
                    {/* <tr>
                        <td colSpan='2' style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                            <br />
                            Thanks & Regards, <br />
                            <textarea cols="40" rows="3" id='thanks' name='thanks' />
                        </td>
                    </tr> */}
                </table>
            </Item>
        </Box>
    </Email>;
};

// 4. Feed your component into react-html-email's renderEmail 
// function, which converts it into the needed html, tables and all.
// https://stackoverflow.com/questions/40417527/how-do-i-preserve-line-breaks-when-getting-text-from-a-textarea/40426477
export const GetContactEmail = function (products, quoteDetails, constactPerson, particular) {
    return renderEmail(<ContactMeTemplate products={products} quoteDetails={quoteDetails} constactPerson={constactPerson} particular={particular} />);
}