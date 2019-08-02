//1. Import React and react-html-email
import React from 'react';
import { Box, Email, Item, Span, renderEmail } from 'react-html-email';

// 2. Create some CSS to be injected in the head as a prop of
// the <Email> component. See step #3 below.
const css = `@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120% } h2 { font-size:26px!important; text-align:center; line-height:120% } h3 { font-size:20px!important; text-align:center; line-height:120% } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button { font-size:20px!important; display:block!important; border-width:10px 0px 10px 0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
#outlook a {
	padding:0;
}
.ExternalClass {
	width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
	line-height:100%;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}`.trim();


//3. Create your react component using react-html-email components
const ContactMeTemplate = function () {

  return <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
    <div class="es-wrapper-color" style="background-color:#F6F6F6;">
      {/* <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]-->  */}
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:60%; margin:0 auto;height:100%;background-repeat:repeat;background-position:center top;">
        <tr style="border-collapse:collapse;">
          <td valign="top" style="padding:0;Margin:0;">
            <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#F9F5E6;background-repeat:repeat;background-position:center top;">
              <tr style="border-collapse:collapse;">
                <td align="center" style="padding:0;Margin:0;">
                  <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;">
                    <tr style="border-collapse:collapse;">
                      <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;background-color:#FFFFFF;background-position:left top;">
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                          <tr style="border-collapse:collapse;">
                            <td width="600" align="center" valign="top" style="padding:0;Margin:0;">
                              <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f9f5e6" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#F9F5E6;">
                                <tr style="border-collapse:collapse;">
                                  <td align="center" style="padding:0;Margin:0;"> <img class="adapt-img" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/BeeFree/beefree-bc4tbfyh1n3/supplier-belt.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" width="600" /></td>
                                </tr>
                              </table> </td>
                          </tr>
                        </table> </td>
                    </tr>
                  </table> </td>
              </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
              <tr style="border-collapse:collapse;">
                <td align="center" bgcolor="#f9f5e6" style="padding:0;Margin:0;background-color:#F9F5E6;">
                  <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                    <tr style="border-collapse:collapse;">
                      <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-position:left top;">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                          <tr style="border-collapse:collapse;">
                            <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                              <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                <tr style="border-collapse:collapse;">
                                  <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#555555;"><strong>Dear Sir/Madam,</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#555555;"><br /></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#555555;">Greetings from Oliver Rubber Industries !!!</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#555555;">World’s Leading Company in the field of Conveyor Belts Vulcanizing &amp; Maintenance Products. It is our pleasure to serve our products and services. We are one of the pioneer in rubber manufacturing viz conveyor belts vulcanizing and jointing solution OM2000 Cement, OM2010 Cement, and GB3150 Cement for conveyor belt repairing solutions, rubber sheets and many more industrial products for all industry. We have more than 500 prime industrial clients all over the world and exporting our products to more than 60 countries. Our product’s key features are it is Non flammable, Non Expiry and High strength Jointing Solutions.</p> </td>
                                </tr>
                              </table> </td>
                          </tr>
                        </table> </td>
                    </tr>
                    <tr style="border-collapse:collapse;">
                      <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-position:left top;">
                        {/* <!--[if mso]> */}
                        <table width="560" cellpadding="0" cellspacing="0"><tr><td width="194" valign="top">
                          {/* <![endif]--> */}
                          <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;">
                            <tr style="border-collapse:collapse;">
                              <td width="174" class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;">
                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                  <tr style="border-collapse:collapse;">
                                    <td align="center" style="padding:0;Margin:0;"> <a target="_blank" href="http://oliverrubber.in/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543;"> <img class="adapt-img" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/BeeFree/beefree-bc4tbfyh1n3/om-2000-300x300.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" width="174" /> </a> </td>
                                  </tr>
                                </table> </td>
                              <td class="es-hidden" width="20" style="padding:0;Margin:0;"></td>
                            </tr>
                          </table>
                          {/* <!--[if mso]> */}
                        </td><td width="173" valign="top">
                            {/* <![endif]--> */}
                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;">
                              <tr style="border-collapse:collapse;">
                                <td width="173" class="es-m-p20b" align="center" style="padding:0;Margin:0;">
                                  <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                    <tr style="border-collapse:collapse;">
                                      <td align="center" style="padding:0;Margin:0;"> <a target="_blank" href="http://oliverrubber.in/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543;"> <img class="adapt-img" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/BeeFree/beefree-bc4tbfyh1n3/om-2010-300x300.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" width="173" /> </a> </td>
                                    </tr>
                                  </table> </td>
                              </tr>
                            </table>
                            {/* <!--[if mso]> */}
                          </td><td width="20"></td><td width="173" valign="top">
                            {/* <![endif]--> */}
                            <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;">
                              <tr style="border-collapse:collapse;">
                                <td width="173" align="center" style="padding:0;Margin:0;">
                                  <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                    <tr style="border-collapse:collapse;">
                                      <td align="center" style="padding:0;Margin:0;"> <a target="_blank" href="http://oliverrubber.in/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543;"> <img class="adapt-img" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/BeeFree/beefree-bc4tbfyh1n3/gb-3150-300x300.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" width="173" /> </a> </td>
                                    </tr>
                                  </table> </td>
                              </tr>
                            </table>
                            {/* <!--[if mso]> */}
                          </td></tr></table>
                        {/* <![endif]-->  */}
                      </td>
                    </tr>
                    <tr style="border-collapse:collapse;">
                      <td align="left" bgcolor="#f9f5e6" style="Margin:0;padding-left:15px;padding-top:20px;padding-bottom:20px;padding-right:20px;background-color:#F9F5E6;background-position:left top;">
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                          <tr style="border-collapse:collapse;">
                            <td width="565" align="center" valign="top" style="padding:0;Margin:0;">
                              <table cellpadding="0" cellspacing="0" width="100%" bgcolor="transparent" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;">
                                <tr style="border-collapse:collapse;">
                                  <td align="center" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;"> <span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#595CD2;border-width:0px;display:inline-block;border-radius:5px;width:auto;"> <a href="http://oliverrubber.in/contact/" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:18px;color:#FFFFFF;border-style:solid;border-color:#595CD2;border-width:10px 20px 10px 20px;display:inline-block;background:#595CD2;border-radius:5px;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;">Order Now</a> </span> </td>
                                </tr>
                              </table> </td>
                          </tr>
                        </table> </td>
                    </tr>
                  </table> </td>
              </tr>
            </table>
            <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;">
              <tr style="border-collapse:collapse;">
                <td align="center" bgcolor="#f9f5e6" style="padding:0;Margin:0;background-color:#F9F5E6;">
                  <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;">
                    <tr style="border-collapse:collapse;">
                      <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-position:left top;">
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                          <tr style="border-collapse:collapse;">
                            <td width="560" align="center" valign="top" style="padding:0;Margin:0;">
                              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                <tr style="border-collapse:collapse;">
                                  <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#555555;">We assure our product's quality at its best among in the market leaders, its bonding strength is much better and long lasting till the life of conveyor belt than any other solutions in the market.&nbsp;For Free sample, kindly reach out to us at <strong>+91-9549650303</strong> or request mail to us at <strong>export@oliverrubber.in</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#555555;">We look forward to hearing your prompt response.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#555555;"><br /></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#555555;">Warm Regards,</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:13px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:20px;color:#555555;"><em><strong>Team Oliver Rubber Industries</strong></em></p> </td>
                                </tr>
                              </table> </td>
                          </tr>
                        </table> </td>
                    </tr>
                    <tr style="border-collapse:collapse;">
                      <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-position:left top;background-color:#111862;" bgcolor="#111862">
                        {/* <!--[if mso]> */}
                        <table width="560" cellpadding="0"
                          cellspacing="0"><tr><td width="270" valign="top">
                            {/* <![endif]--> */}
                            <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;">
                              <tr style="border-collapse:collapse;">
                                <td class="es-m-p20b" width="270" align="left" style="padding:0;Margin:0;">
                                  <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                    <tr style="border-collapse:collapse;">
                                      <td align="center" style="padding:0;Margin:0;"> <img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/17/icon_phone_white.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" width="20" /></td>
                                    </tr>
                                    <tr style="border-collapse:collapse;">
                                      <td align="center" style="padding:0;Margin:0;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF;"><strong>+91-9549650303 / +91- 9414129472</strong><strong></strong></p> </td>
                                    </tr>
                                  </table> </td>
                              </tr>
                            </table>
                            {/* <!--[if mso]> */}
                          </td><td width="20"></td><td width="270" valign="top">
                              {/* <![endif]--> */}
                              <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;">
                                <tr style="border-collapse:collapse;">
                                  <td width="270" align="left" style="padding:0;Margin:0;">
                                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                      <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;Margin:0;"> <img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/17/icon_mail_white.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" width="20" /></td>
                                      </tr>
                                      <tr style="border-collapse:collapse;">
                                        <td align="center" style="padding:0;Margin:0;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF;"><strong>export@oliverrubber.in</strong></p> </td>
                                      </tr>
                                    </table> </td>
                                </tr>
                              </table>
                              {/* <!--[if mso]> */}
                            </td></tr></table>
                        {/* <![endif]-->  */}
                      </td>
                    </tr>
                  </table> </td>
              </tr>
            </table> </td>
        </tr>
      </table>
    </div>
  </body>;
};

// 4. Feed your component into react-html-email's renderEmail
// function, which converts it into the needed html, tables and all.
// https://stackoverflow.com/questions/40417527/how-do-i-preserve-line-breaks-when-getting-text-from-a-textarea/40426477
export const GetContactEmail = function (products, quoteDetails, constactPerson, particular, currencyHtmlCode) {
  return renderEmail(<ContactMeTemplate />);
}