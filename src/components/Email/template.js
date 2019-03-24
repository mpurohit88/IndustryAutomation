//1. Import React and react-html-email
import React from 'react';
import { Box, Email, Item, Span, renderEmail } from 'react-html-email';
import { getTodaysDate } from '../../utils/dates'
/* component styles */
import { styles } from './styles.scss'

// 2. Create some CSS to be injected in the head as a prop of
// the <Email> component. See step #3 below.
const css = `
@media only screen and (max-device-width: 480px) {
  font-size: 20px !important;
}`.trim();


//3. Create your react component using react-html-email components
const ContactMeTemplate = function ({ quoteDetails, products, constactPerson }) {
    return <Email title="Quotation" headCSS={css} className={styles} className="quotation">
        <Box width="100%" style={{ lineHeight: 2 }}>
            <Item width="100%" style={{ textAlign: 'center' }}>
                <Span style={{ textDecoration: 'underline', fontWeight: 'bold', fontSize: 20 + 'px' }}>QUOTATION</Span>
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
                        <td style={{ lineHeight: '1.4', maxWidth: '200px' }}>
                            Kindly Atten: Mr. {constactPerson[0].name} <br />
                            {quoteDetails.address}
                        </td>
                        <td style={{ textAlign: 'right', lineHeight: '1.4' }}>
                            Phone No. {quoteDetails.phoneNo}<br />
                            Email: {constactPerson[0].email}<br />
                            {quoteDetails.email}
                        </td>
                    </tr>
                    <tr>
                        <td><br /></td>
                    </tr>
                    <tr>
                        <td colSpan='2'><input size="100" type='text' id='refSubject' name='refSubject' value='Ref. Your Email Enquiry Dated 27.12.2018 for OTR Tyre Accessories.' /></td>
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
                                    <th style={{ border: '1px solid black', padding: '10px' }}>Sr. No.</th>
                                    <th style={{ border: '1px solid black', padding: '10px' }}>Particular</th>
                                    <th style={{ border: '1px solid black', padding: '10px' }}>Image</th>
                                    <th style={{ border: '1px solid black', padding: '10px' }}>HSN code</th>
                                    <th style={{ border: '1px solid black', padding: '10px' }}>Qty.</th>
                                    <th style={{ border: '1px solid black', padding: '10px' }}>Rate</th>
                                    <th style={{ border: '1px solid black', padding: '10px' }}>GST</th>
                                </tr>
                                {
                                    products.map((product, index) => {
                                        return <tr>
                                            <td style={{ border: '1px solid black', padding: '10px' }}>
                                                {index + 1}
                                            </td>
                                            <td style={{ border: '1px solid black', padding: '10px' }}>{product.name}</td>
                                            <td style={{ border: '1px solid black', padding: '10px' }}>
                                                <img height="80" id={'img-' + index} src={`/img/product/${product.imgName}`} alt={product.imgName} /></td>
                                            <td style={{ border: '1px solid black', padding: '10px' }}>{product.hsnCode}</td>
                                            <td style={{ border: '1px solid black', padding: '10px' }}>{product.quantity}</td>
                                            <td style={{ border: '1px solid black', padding: '10px' }}>Rs. {product.rate}/-each</td>
                                            <td style={{ border: '1px solid black', padding: '10px' }}>{product.gstn}%</td>
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
                            <input size='70' type='text' id='about-product' name='about-product' value='OTR Tubes %26 Flaps and "O" Rings available in all size' />
                        </td>
                    </tr>
                </table>
            </Item>
        </Box>
    </Email>;
};

// 4. Feed your component into react-html-email's renderEmail 
// function, which converts it into the needed html, tables and all.
export const GetContactEmail = function (products, quoteDetails, constactPerson) {
    return renderEmail(<ContactMeTemplate products={products} quoteDetails={quoteDetails} constactPerson={constactPerson} />);
}