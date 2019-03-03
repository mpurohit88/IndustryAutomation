import React, { Component } from 'React';
import { Row, Col } from 'react-bootstrap'

import { EditorState, convertToRaw, ContentState, convertFromHTML, DefaultDraftBlockRenderMap } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { styles } from './styles.scss'
import Immutable from 'immutable';
import { getTodaysDate } from '../../utils/dates'
import { StandardModal } from '../../components/Modals'
import Input from '../../components/Input'

const Hello = (props, { blockProps, products }) => {
	return <div data-offset-key={props["offsetKey"]}>
		<table width="100%">
			<tbody>
				<tr>
					<td colSpan='2' className='child'>
						<table width='100%'>
							<tbody>
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
									(props.blockProps.data.products || []).map((product, index) => {
										return <tr>
											<td>
												{index + 1}
											</td>
											<td>{product.name}</td>
											<td><img height="80px" src={`/dist/img/product/${product.imgName}`} alt={product.imgName} /></td>
											<td>{product.hsnCode}</td>
											<td>{product.quantity}</td>
											<td>{product.rate}</td>
											<td>{product.gstn}%</td>
										</tr>
									})
								}
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
					<td colSpan='2' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 + 'px' }}>
						OTR Tubes & Flaps and "O" Rings available in all size &nbsp;
										</td>
				</tr>
			</tbody>
		</table>
	</div>
}

class CodeBlock extends React.Component {
	render() {
		return (
			<div
				className="justified-row"
				data-offset-key={this.props["data-offset-key"]}
				width='100%'
			>
				{this.props.children}
			</div>
		);
	}
}
// keep support for other draft default block types and add our myCustomBlock type
// const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export default class EmailEditor extends Component {
	constructor(props) {
		super(props);

		const html = '<p><blockquote><strong><u>QUOTATION</u></strong></blockquote></p>' +
			'<p>Our Ref: xxx/xxx/x/xxx/xx-xx/xxx &nbsp;&nbsp;&nbsp;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;Date: ' + getTodaysDate() + '</p>' +
			// '<table><tbody>' +
			'<p><h5>Kindly Atten: Mr. Daya Pvt. Ltd. <br />Ultratech Cement Limited <br />Nathdwara (Rajasthan) </h5>' +
			'<h5> Phone No. 02971-235005-12 <br />Email: mapurohit88@gmail.com <br />kishore.kabl@adityabirla.com</h5></p>' +
			// '</tbody></table>' +
			'<p>Ref. Your Email Enquiry Dated 27.12.2018 for OTR Tyre Accessories.</p>' +
			'<p>Dear Sir,</p>' +
			'<p>We thank you very much for your above enquiry and pleased to quote our lowest offer as under:-</p>' +
			'<p>&nbsp;</p></br>' +
			'<p><h6>Our Ref: XXXXXXXXXXX </h6></p> </br>' +
			'<h5>&nbsp;</h5></br></br>' +
			'<p>Thanks & Regards,</p>';
		const contentBlock = convertFromHTML(html);
		if (contentBlock) {
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			const editorState = EditorState.createWithContent(contentState);
			this.state = {
				editorState,
				companyEmailId: this.props.companyEmailId,
				to: this.props.to,
				subject: this.props.subject,
			};
		}

		this.myBlockRenderer = this.myBlockRenderer.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState({ [name]: value })
	}

	myBlockRenderer(contentBlock) {
		const type = contentBlock.getType();
		if (type === 'header-six') {
			const quoteDetails = this.props.quoteDetails;
			const products = this.props.products;
			return {
				component: Hello,
				editable: true,
				props: {
					data: { quoteDetails, products },
				},
			};
		}
	}

	myBlockStyleFn = (contentBlock) => {
		const type = contentBlock.getType();
		if (type === 'blockquote') {
			return 'rdw-center-aligned-block';
		} else if (type === 'section') {
			return 'rdw-option-wrapper';
		}
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
	};

	render() {
		const { editorState } = this.state;
		const { quoteDetails, products } = this.props;

		const blockRenderMap = DefaultDraftBlockRenderMap.merge(
			Immutable.Map({
				// 'header-six': {
				// 	wrapper: <Hello quoteDetails={quoteDetails} products={products} />
				// },
				'header-five': {
					element: 'div',
					wrapper: <CodeBlock />
				}
			})
		);

		return (
			<div className={styles}>
				<StandardModal btnText='Send Email' heading='Qutation' isLoading={this.props.isLoading} handleSubmit={this.props.handleSubmit} show={this.state.showEditor} lgClose={this.lgClose} handleModelClick={this.lgClose}>
					<Row className="show-grid">
						<Col xs={4} md={6}>
							<Input label='From:' onChange={this.handleInput} value={this.state.companyEmailId} name='from' id='from' type='input' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='To:' onChange={this.handleInput} value={this.state.to} name='to' id='to' type='input' />
						</Col>
						<Col xs={12} md={12}>
							<Input label='Suject:' onChange={this.handleInput} value={this.state.subject} name='subject' id='subject' type='input' />
						</Col>
					</Row>

					<Editor
						editorState={editorState}
						toolbarClassName="toolbarClassName"
						wrapperClassName="c-react-draft"
						editorClassName="demo-editor"
						onEditorStateChange={this.onEditorStateChange}
						blockStyleFn={this.myBlockStyleFn}
						blockRenderMap={blockRenderMap}
						blockRendererFn={this.myBlockRenderer}
					/>
				</StandardModal>
			</div>
		)
	}
} 
