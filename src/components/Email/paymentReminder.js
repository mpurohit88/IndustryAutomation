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
const ContactMeTemplate = function ({ dispatchSummary, footerBody }) {
  console.log("dispatch summary", dispatchSummary);

  return <Email title="Payment" headCSS={css} className={styles} className="quotation" id="paymentReminder">
    <Box width="700" style={{ lineHeight: 2 }}>
      <Item>
        <table width="100%" style={{ font: 'Times New Roman', textAlign: 'left' }} id='paymentReminderBody'>
          <tr><td style={{ lineHeight: '1' }}><br /></td></tr>
          <tr>
            <td colSpan='2' style={{ lineHeight: '1.6' }}><br />Dear Sir, <br /><br />
              <label>It is to submit for your kind information that payment against our following supplies are still outstadning:-</label>
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
                    <th style={{ border: '1px solid black', padding: '10px' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dispatchSummary.map(data => {
                      return <tr>
                        <td>
                          <label>
                            {data.order_no}
                          </label>
                        </td>
                        <td>
                          <label>
                            {data.invoice_no}
                          </label>
                        </td>
                        <td>
                          <label>
                            {data.invoice_date}
                          </label>
                        </td>
                        <td>
                          <label>
                            {data.transporter_name}
                          </label>
                        </td>
                        <td>
                          <label>
                            {data.bilty_no}
                          </label>
                        </td>
                        <td>
                          <label>
                            {data.amount}
                          </label>
                        </td>
                      </tr>
                    })
                  }

                </tbody>
              </table>
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
export const GetPaymentEmail = function (dispatchSummary, footerBody) {
  return renderEmail(<ContactMeTemplate dispatchSummary={dispatchSummary} footerBody={footerBody} />);
}