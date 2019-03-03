import React, { Component } from 'React';

import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { styles } from './styles.scss'

export default class EmailEditor extends Component {
	constructor(props) {
		super(props);

		const html = '<p><strong><u>QUOTATION</u></strong></p><br />' +
			'<p><p>Our Ref: XXXXXXXXXXXX</p> &nbsp; <p className="rdw-right-aligned-block">Dt: 01/01/2018</p></p>';
		// const contentBlock = htmlToDraft(html);
		// const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		// const editorState = EditorState.createWithContent(contentState);
		this.state = {
			editorState: EditorState.createWithContent(
				ContentState.createFromBlockArray(
					convertFromHTML(
						html
					)
				)
			)
		}
	}

	myBlockStyleFn = (contentBlock) => {
		const type = contentBlock.getType();
		if (type === 'blockquote') {
			return 'superFancyBlockquote';
		}
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
	};

	render() {
		const { editorState } = this.state;

		return (
			<div className={styles}>
				<Editor
					editorState={editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="c-react-draft"
					editorClassName="demo-editor"
					onEditorStateChange={this.onEditorStateChange}
					textAlignment={'left'}
					wrapperId="id"
				// defaultEditorState={sampleEditorContent}
				/>

				{/* <center className="wrapper">
									<table width="100%" cellpadding="0" cellspacing="0" border="0" style={{backgroundColor:'#fff'}} bgcolor="#fff;">
										<tr>
											<td width="100%" style={{width:100 + '%', tableLayout:'fixed', '-webkit-text-size-adjust':100 +'%', '-msTextSizeAdjust':100 +'%', backgroundColor:'#fff'}}>
												<div className="webkit" >
													<p className='quote header'>QUOTATION</p>
												</div>
											</td>
										</tr>
									</table>
								</center> */}
			</div>
		)
	}
} 
