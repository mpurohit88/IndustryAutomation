//1. Import React and react-html-email
import React from 'react';
import { Box, Email, Item, Span, renderEmail } from 'react-html-email';

/* component styles */
import { styles } from './styles.scss'

// 2. Create some CSS to be injected in the head as a prop of
// the <Email> component. See step #3 below.
const css = `
@media only screen and (max-device-width: 480px) {
  font-size: 20px !important;
}`.trim();


//3. Create your react component using react-html-email components
const ContactMeTemplate = function({quoteDetails, products}) {
  return <Email title="Quotation" headCSS={css} className={styles} className="quotation">
            <Box width="100%" style={{lineHeight: 2}}>
              <Item width="100%" style={{textAlign: 'center'}}>
                <Span style={{textDecoration: 'underline', fontWeight: 'bold', fontSize: 20 + 'px'}}>QUOTATION</Span>
								<br /> <br />
              </Item>
              <Item>
                <table width="100%">
									<tr width="100%">
										<td>
											Our Ref <input type='text' id='refId' name='refId'/> 
										</td>
										<td style={{textAlign: 'right'}}>
											Date: 28/12/2018
										</td>
									</tr>
									<tr><td></td></tr><tr><td><br /></td></tr>
									<tr>
										<td>
											Kindly Atten: Mr. {quoteDetails.companyName} <br />
											Ultratech Cement Limited <br />
											Nathdwara (Rajasthan)
										</td>
										<td style={{textAlign: 'right'}}>
											Phone No. 02971-235005-12<br/>
											email: mapurohit88@gmail.com <br />
											kishore.kabl@adityabirla.com
										</td>
									</tr>
									<tr>
										<td><br /></td>
									</tr>
									<tr>
										<td colSpan='2'>Ref. Your Email Enquiry Dated 27.12.2018 for OTR Tyre Accessories.</td>
									</tr>
									<tr>
										<td>Dear Sir,</td>
									</tr>
									<tr>
										<td colSpan='2'>
											We thank you very much for your above enquiry and pleased to quote our lowest offer as under:-
										</td>
									</tr>
									<tr>
										<td colSpan='2' className='child'>
											<table width='100%'>
												<tr>
													<th>Sr. No.</th>
													<th>Particular</th>
													<th>Image</th>
													<th>HSN code</th>
													<th>Qty.</th>
													<th>Rate</th>
													<th>GST</th>
												</tr>
													{
														products.map((product, index) => {
															return <tr>
																			<td>
																				{index + 1}
																			</td>
																			<td>{product.name}</td>
																			<td>Image</td>
																			<td>{product.hsnCode}</td>
																			<td>{product.quantity}</td>
																			<td>{product.rate}</td>
																			<td>{product.gstn}%</td>
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
										<td colSpan='2' style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20 + 'px'}}>
											OTR Tubes & Flaps and "O" Rings available in all size
										</td>
									</tr>
                </table>
              </Item>
            </Box>
        </Email>;
};

// 4. Feed your component into react-html-email's renderEmail 
// function, which converts it into the needed html, tables and all.
export const GetContactEmail = function(products, quoteDetails){
	console.log("************product*********", products);
	console.log("************quoteDetails*********", quoteDetails);

	return renderEmail(<ContactMeTemplate products={products} quoteDetails={quoteDetails}/>);
}