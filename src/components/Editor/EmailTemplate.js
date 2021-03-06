import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-bootstrap'
import { EditorState, convertToRaw, ContentState, convertFromHTML, DefaultDraftBlockRenderMap } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import Immutable from 'immutable';

import { getTodaysDate } from '../../utils/dates'

import { StandardModal } from '../../components/Modals'
import Input from '../../components/Input'

import { styles } from './styles.scss'

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
											<td>
												<img height="80" src={`/img/product/${product.imgName}`} alt={product.imgName} /></td>
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
				{/* <tr>
					<td colSpan='2' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 + 'px' }}>
						OTR Tubes & Flaps and "O" Rings available in all size &nbsp;
										</td>
				</tr> */}
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
class Main extends Component {
	constructor(props) {
		super(props);

		const html = '<p>Term & Condition</p>';

		const contentBlock = convertFromHTML(html);

		if (contentBlock) {
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			const editorState = EditorState.createWithContent(contentState);

			this.state = {
				editorState,
			}
		}

		this.myBlockRenderer = this.myBlockRenderer.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {

		const body = draftToHtml(
			convertToRaw(
				this.state.editorState.getCurrentContent()
			)
		)

		this.props.handleSubmit(body);
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState({ [name]: value })
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
		const { onChange, value } = this.props;

		const newValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));

		// if (value !== newValue) {
		// 	onChange(newValue);
		// }

		this.setState({
			editorState,
		});
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

	render() {
		const { editorState } = this.state;
		const { quoteDetails, products } = this.props;

		// const blockRenderMap = DefaultDraftBlockRenderMap.merge(
		// 	Immutable.Map({
		// 		// 'header-six': {
		// 		// 	wrapper: <Hello quoteDetails={quoteDetails} products={products} />
		// 		// },
		// 		'header-five': {
		// 			element: 'div',
		// 			wrapper: <CodeBlock />
		// 		}
		// 	})
		// );

		return (
			<div className={styles}>
				<Editor
					editorState={editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="c-react-draft"
					editorClassName="demo-editor"
					onEditorStateChange={this.onEditorStateChange}
				// blockStyleFn={this.myBlockStyleFn}
				// blockRenderMap={blockRenderMap}
				// blockRendererFn={this.myBlockRenderer}
				/>
			</div>
		);
	}
}

// Decorate the form component
Main = reduxForm({
	form: 'emailEditor' // a unique name for this form
})(Main);

export default Main;