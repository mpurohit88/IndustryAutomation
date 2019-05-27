import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromHTML, DefaultDraftBlockRenderMap } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Immutable from 'immutable';
import { stateToHTML } from 'draft-js-export-html';

import Create from '../Create/index';

import { Badge } from '../../../components/Badge'
import { getStatus, getVariant } from '../helper'
import { appConfig } from 'configs/config-main'
import AppBar from 'components/AppBar'
import { getAdmin, getUserName, getCompanyName, getCompanyLogo, getFullUserName } from '../../../configs/user'
import { getISODateTime } from '../../helper'
import Button from '../../../components/Button'
import getTemplate from '../../../components/Email'
import { StandardModal } from '../../../components/Modals'
import Scheduler from '../Scheduler'
import CloseQuote from './closeQuote'
import DispatchSummary from './dispatchSummary'
import Input from '../../../components/Input'
import MyEditor from '../../../components/Editor/MyEditor'

import { itemsFetchQuoteDetails, quoteStart } from '../../../core/api/quote'
import { sendEmail } from '../../../core/api/email'
import { getTermCondition } from '../../../core/api/company'
import { quoteContactDetail } from '../../../core/api/customerContact'
import { taskDone } from '../../../core/api/schedule'
import { getEmailBody } from '../../../core/api/taskkEmail'
// import Toaster from '../../../components/Toaster';

import { getCurrencyType } from '../../../core/api/currencyType'

/* component styles */
import { styles } from './styles.scss'

// Home Of Quote Component
class Home extends Component {
	constructor(props) {
		super(props);

		// const contentBlock = convertFromHTML('<p></p>');

		// let editorState = '';
		// if (contentBlock) {
		// const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		// editorState = EditorState.createWithContent(contentState);
		this.state = {
			isLoading: false,
			showEditor: false,
			showScheduler: false,
			html: '',
			companyEmailId: '',
			to: '',
			cc: '',
			bcc: '',
			subject: 'Provide Subject',
			scheduleId: '',
			showCloseCase: false,
			showDispatchSummary: false,
			isDiscard: false,
			showEmail: false,
			CreateQuoteShow: false,
			selectedFile: [],
			currencyHtmlCode: [],
			editorState: '' // Editor
			// }
		}



		this.showEmail = this.showEmail.bind(this);
		this.lgClose = this.lgClose.bind(this);
		this.sendEmailToCustomer = this.sendEmailToCustomer.bind(this);
		this.handleSchedulerClick = this.handleSchedulerClick.bind(this);
		this.schedulerClose = this.schedulerClose.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.doneTask = this.doneTask.bind(this);
		this.showDispatchSummary = this.showDispatchSummary.bind(this);
		this.showEmailBody = this.showEmailBody.bind(this);
		this.handleQuoteEditClick = this.handleQuoteEditClick.bind(this);
		this.updateContent = this.updateContent.bind(this);

		// Editor
		this.focus = () => this.refs.editor.focus();
		this.onChange = (editorState) => this.setState({ editorState });

		this.handleKeyCommand = (command) => this._handleKeyCommand(command);
		this.onTab = (e) => this._onTab(e);
		this.toggleBlockType = (type) => this._toggleBlockType(type);
		this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
		//
	}

	componentDidMount() {
		const self = this;
		const { quoteId } = self.props.match.params;

		self.props.fetchQuoteDetails(quoteId, (data) => {
			let type = data.quoteDetails.userEmail.indexOf('export') > -1 ? 2 : 1;

			getTermCondition(type).then((termCondition) => {
				//let terms = html;
				let terms = termCondition ? termCondition.TermCondition ? (termCondition.TermCondition.text && termCondition.TermCondition.text !== '') ? termCondition.TermCondition.text : 'Template is missing' : 'Template is missing' : 'Template is missing';

				const contentBlock = convertFromHTML(terms);

				if (contentBlock) {
					const editorState = EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks));

					self.setState({ companyEmailId: data.quoteDetails.userEmail, to: data.quoteDetails.email, editorState: editorState });
				}
			});
		});

		getCurrencyType().then((listOfCurrency) => {
			let currencyHtmlCode = [];

			listOfCurrency.map(currency => {
				currencyHtmlCode.push({ id: currency.id, code: currency.html_code })
			});

			this.setState({ currencyHtmlCode: currencyHtmlCode });
		});
	}

	updateContent(newContent) {
		this.setState({
			editorState: newContent
		})
	}

	// Editor

	_handleKeyCommand(command) {
		const { editorState } = this.state;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	_onTab(e) {
		const maxDepth = 4;
		this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
	}

	_toggleBlockType(blockType) {
		this.onChange(
			RichUtils.toggleBlockType(
				this.state.editorState,
				blockType
			)
		);
	}

	_toggleInlineStyle(inlineStyle) {
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		);
	}

	// End

	handleQuoteEditClick = (flag, isNonEditable) => this.setState({ CreateQuoteShow: flag, isNonEditable: isNonEditable });

	doneTask(taskId, nextTaskid, userActivityId, scheduleId, quoteId, status) {
		this.props.taskDone(taskId, nextTaskid, userActivityId, scheduleId, quoteId, status);
	}

	onChangeHandler = event => {
		this.setState({
			selectedFile: event.target.files,
		})
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		if (name === 'subject') {
			document.getElementById('subjectLabel').innerHTML = value;
		}

		this.setState({ [name]: value })
	}

	lgClose() {
		this.setState({ showEditor: false, showEmail: false, showCloseCase: false, showDispatchSummary: false })
	}

	schedulerClose() {
		this.setState({ showScheduler: false, showCloseCase: false, showDispatchSummary: false })
	}

	showDispatchSummary(acivityTaskId) {
		this.setState({ showDispatchSummary: true, acivityTaskId: acivityTaskId })
	}

	handleSchedulerClick(id, nextId, userActivityId, scheduleId) {
		this.setState({ showScheduler: true, acivityTaskId: id, nextActivityTaskId: nextId, userActivityId: userActivityId, scheduleId: scheduleId })
	}

	showEmail(id, nextId, userActivityId) {

		quoteContactDetail(this.props.details.quoteDetails.contact_person_id).then((result) => {
			this.setState({ emailBody: null, constactPerson: result, showEditor: true, acivityTaskId: id, nextActivityTaskId: nextId, userActivityId: userActivityId });
		})
	}

	showEmailBody(task_id, nextId, userActivityId) {
		getEmailBody(task_id).then((data) => {
			this.setState({ emailBody: data.body.body, to: data.body.to_address, cc: data.body.cc_address, companyEmailId: data.body.from_address, bcc: data.body.bcc_address, subject: data.body.subject, showEditor: true, acivityTaskId: task_id, nextActivityTaskId: nextId, userActivityId: userActivityId },
				() => {
					document.getElementById("doPrint").addEventListener("click", function () {
						var divContents = document.getElementById("printEmail").innerHTML;
						var printWindow = window.open('', '', 'height=800,width=1000');
						printWindow.document.write('<html><meta charset="utf-8"><head><title>' + getCompanyName() + '</title>');
						printWindow.document.write('</head><body>');
						printWindow.document.write(divContents);
						printWindow.document.write('</body></html>');
						printWindow.document.close();
						printWindow.print();
					});
				})
		});
	}

	closeCase() {
		this.setState({ showCloseCase: true, isDiscard: false })
	}

	discardCase() {
		this.setState({ showCloseCase: true, isDiscard: true })
	}

	sendEmailToCustomer(id, nextId, userActivityId) {
		if (this.state.subject.trim() !== "") {
			const self = this;
			let body = getTemplate(this.props.details.quoteDetails.companyId, this.props.details.products, this.props.details.quoteDetails, this.state.constactPerson, this.props.details.quoteDetails.companyId === 1 ? <div dangerouslySetInnerHTML={{ __html: 'Belt Size and Specification.<br/>As per IS 1891(1994 Latest)<br/>MAKE – SOMIFLEX' }} /> : 'Particular', this.state.currencyHtmlCode);

			body = body.replace('<input type="text" id="refId" name="refId"/>', document.getElementById('refId').value)
			body = body.replace('<input type="text" size="104" id="refSubject" name="refSubject" value="Ref. Your Email Enquiry Dated"/>', document.getElementById('refSubject').value)
			body = body.replace('<textarea cols="60" rows="2" id="about-product" name="about-product"></textarea>', document.getElementById('about-product').value)
			body = body.replace('<textarea cols="107" rows="2" id="refMsg" name="refMsg">We thank you very much for your above enquiry and pleased to quote our lowest offer as under:-</textarea>', document.getElementById('refMsg').value)
			body = body.replace('<label id="subjectLabel"></label>', document.getElementById('subjectLabel').innerHTML)

			// body = body.replace('<input type="text" size="70" id="about-product" name="about-product" value="NOTE"/>', document.getElementById('about-product').value)
			// body = body.replace('<textarea cols="40" rows="3" id="thanks" name="thanks"></textarea>', document.getElementById('thanks').value);

			// const termsAndCondition = draftToHtml(
			// 	convertToRaw(
			// 		this.state.editorState.getCurrentContent()
			// 	)
			// )

			let html = stateToHTML(this.state.editorState.getCurrentContent())

			body = body.replace('<div id="terms" name="terms"></div>', html);

			this.props.details.products.map((e, index) => {
				if (e.imgName === '') {
					body = body.replace('src="/img/blankImg.png"', 'src="cid:EmbeddedContent_' + index + '"');
				} else {
					body = body.replace('src="/img/product/' + e.imgName + '"', 'src="cid:EmbeddedContent_' + index + '"');
				}
			});

			self.setState({ isLoading: true });

			let data = { body: body, from: this.state.companyEmailId, to: this.state.to || this.props.details.quoteDetails.email, cc: this.state.cc || '', bcc: this.state.bcc || '', subject: this.state.subject, taskId: id, nextTaskId: nextId, userActivityId: userActivityId, quoteId: this.props.details.quoteDetails.id };
			const formData = new FormData();
			formData.append('data', JSON.stringify(data));

			for (var x = 0; x < this.state.selectedFile.length; x++) {
				formData.append('avatar', this.state.selectedFile[x])
			}

			// formData.append('avatar', document.getElementById('attachments').files)

			this.props.sendEmailAction({
				formData: formData, cb: () => {
					self.lgClose();
					self.setState({ isLoading: false });
				}
			});
		} else {
			alert('Subject is required');
		}
	}

	isDisabled(status, startDate, endDate) {
		if (startDate !== null && endDate === null) {
			return false;
		}

		return true;
	}

	isStepActive(status, startDate, endDate) {
		if (Number(status) > 99) {
			return false;
		} else {
			if (startDate !== null && endDate === null) {
				return true;
			}

			return false;
		}
	}

	isActiveCloseBtn(tasks) {
		let isActive = true;

		tasks.map((task) => {
			if (task.startDate === null || task.endDate === null) {
				isActive = false;
			}
		});

		return isActive;
	}

	showStepCircle(startDate, endDate) {
		if (startDate === null && endDate === null) {
			return 'disabled-circle';
		} else if (startDate !== null && endDate === null) {
			return 'circle1'
		} else if (startDate !== null && endDate !== null) {
			return 'circle'
		}

		return '';
	}

	render() {
		const isAdmin = getAdmin(), userName = getUserName(), cname = getCompanyName(), clogo = getCompanyLogo(), fullUserName = getFullUserName();
		const { quoteDetails, tasks, products } = this.props.details;
		let files = [];

		// Editor

		const { editorState } = this.state;

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

		// If the user changes block type before entering any text, we can
		// either style the placeholder or hide it. Let's just hide it now.
		let className = 'RichEditor-editor';

		const contentState = editorState && editorState.getCurrentContent();
		if (contentState && !contentState.hasText()) {
			if (contentState.getBlockMap().first().getType() !== 'unstyled') {
				className += ' RichEditor-hidePlaceholder';
			}
		}

		// End

		for (var x = 0; x < this.state.selectedFile.length; x++) {
			files.push(this.state.selectedFile[x].name);
		}

		if (!quoteDetails) {
			return (<div>data is loading...</div>)
		}

		return (
			<Fragment>
				{/* <Toaster /> */}
				<AppBar isAdmin={isAdmin} name={userName} cname={cname} clogo={clogo} userName={fullUserName}>{appConfig.name}</AppBar>
				<div className={styles}>
					<div className='flex-center head'>
						<div className='imgEdit'>
							<img height='17' src='/img/userEdit.png' />
							<a style={{ color: 'white', cursor: 'pointer' }} onClick={() => this.handleQuoteEditClick(true, quoteDetails.status > 3)}><strong>Quote No.: </strong>{quoteDetails.id}</a>
						</div>

						<div>
							<Badge variant={getVariant(quoteDetails.status)}>{getStatus(quoteDetails.status)}</Badge>

							{quoteDetails.status === 1 ? <Button variant="primary" type="button" isDisabled={quoteDetails.status === 1 ? false : true}
								onClick={(e) => this.props.quoteStartAction(tasks[0].id, quoteDetails.id)}
							>
								Start Quote
							</Button> : null}
						</div>
					</div>
					<div style={{ display: 'flex', padding: '15px', borderBottom: '2px solid #3c9aae', justifyContent: 'space-between' }}>
						<div><strong>Firm Name:</strong> &nbsp;{quoteDetails.companyName}</div>
						<div><strong>Created By:</strong> &nbsp;<span style={{ textTransform: 'capitalize' }}>{quoteDetails.userName}</span></div>
						<div><strong>Created Date:</strong> &nbsp;{getISODateTime(quoteDetails.dateTimeCreated)}</div>
					</div>
					<div style={{ marginTop: 15 + 'px' }} id='steps'>
						{
							tasks.map((task, index) => {
								return <div className={`flex-center step checkmark${this.isStepActive(quoteDetails.status, task.startDate, task.endDate) ? ' active-step' : ' disabled'}`}>

									{index + 1 < tasks.length && <div className="vertical-line"></div>}

									<div className={`${this.showStepCircle(task.startDate, task.endDate)}`}>
										<label className='text'>{task.text}</label>
									</div>
									<div>
										{
											task.taskId === 1 && <Button variant="outline-primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
												onClick={(e) => this.showEmail(task.id, tasks[index + 1].id, task.userActivityId)}
											>
												{task.scheduleId ? 'Resend Email' : 'Send Email'}
											</Button>
										}

										{
											task.taskId === 1 && <Button variant="outline-primary" type="button"
												onClick={(e) => this.showEmailBody(task.id, tasks[index + 1].id, task.userActivityId)}
											>
												View Email
											</Button>
										}
										{
											task.taskId === 1 && <Button variant="outline-primary" type="button" isDisabled={task.scheduleId === null ? true : this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
												onClick={(e) => { this.doneTask(task.id, tasks[index + 1].id, task.userActivityId, task.scheduleId, quoteDetails.id, 8) }}
											>
												Finalize Quote
										</Button>
										}

									</div>
									{
										task.taskId === 2 && <div>
											{
												task.scheduleId ?
													<Button variant="outline-primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
														onClick={(e) => { this.handleSchedulerClick(task.id, tasks[index + 1].id, task.userActivityId, task.scheduleId) }}
													>
														View Reminder
												</Button>
													:
													<Button variant="outline-primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
														onClick={(e) => { this.handleSchedulerClick(task.id, tasks[index + 1].id, task.userActivityId, task.scheduleId) }}
													>
														Set Reminder
												</Button>
											}
											<Button variant="outline-primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
												onClick={(e) => { this.doneTask(task.id, tasks[index + 1].id, task.userActivityId, task.scheduleId, quoteDetails.id, 5) }}
											>
												Stop Reminder
											</Button>
										</div>
									}

									{
										task.taskId === 3 && <div>
											<Button variant="outline-primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
												onClick={(e) => { this.doneTask(task.id, tasks[index + 1].id, task.userActivityId, task.scheduleId, quoteDetails.id, 6) }}
											>
												If Yes, Upload
											</Button>
											<Button variant="outline-primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
												onClick={(e) => { }}
											>
												No
											</Button>
										</div>
									}

									{
										task.taskId === 4 && <div>
											<Button variant="outline-primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
												onClick={(e) => { this.showDispatchSummary(task.id) }}
											>
												Upload
											</Button>
											<Button variant="outline-primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
												onClick={(e) => { this.doneTask(task.id, undefined, task.userActivityId, task.scheduleId, quoteDetails.id, 8) }}
											>
												Done
											</Button>
										</div>
									}
								</div>
							})
						}
					</div>
					<div>
						<br />
						{
							this.isActiveCloseBtn(tasks) ? <Button variant="primary" type="button"
								onClick={quoteDetails.status > 99 ? () => { } : (e) => this.closeCase(e)}
							>
								{quoteDetails.status > 99 ? 'Quote Closed' : 'Close'}
							</Button>
								:
								<Button variant="secondary" type="button">
									Close
								</Button>
						}

						<Button onClick={quoteDetails.status > 99 ? () => { } : (e) => this.discardCase(e)}>
							{quoteDetails.status > 99 ? 'Quote Discarded' : 'Discard'}
						</Button>

					</div>

				</div>

				{this.state.showEditor ?
					<StandardModal btnText='Send Email' heading='Create Quotation' isLoading={this.state.isLoading} handleSubmit={() => this.sendEmailToCustomer(this.state.acivityTaskId, this.state.nextActivityTaskId, this.state.userActivityId)} show={this.state.showEditor} lgClose={this.lgClose} handleModelClick={this.lgClose}>
						<Row className="show-grid">
							<Col xs={4} md={6}>
								<Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='From:' onChange={this.handleInput} value={this.state.companyEmailId} name='companyEmailId' id='companyEmailId' type='email' />
							</Col>
							<Col xs={4} md={6}>
								<Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='To:' onChange={this.handleInput} value={this.state.to} name='to' id='to' type='email' />
							</Col>
							<Col xs={4} md={6}>
								<Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='CC:' onChange={this.handleInput} value={this.state.cc} name='cc' id='cc' type='email' />
							</Col>
							<Col xs={4} md={6}>
								<Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='BCC:' onChange={this.handleInput} value={this.state.bcc} name='bcc' id='bcc' type='email' />
							</Col>
							<Col xs={12} md={12}>
								<Input label='Subject:' onChange={this.handleInput} value={this.state.subject} name='subject' id='subject' type='input' />
							</Col>
							<Col xs={12} md={12}>
								Attachments: <input type="file" id="attachments" className="form-control" multiple onChange={this.onChangeHandler} />
								{/* <Input type='file' label='Browse Image:' accept="image/*" onChange={this.handleInput} value={this.state.attachments} name='attachments' id='attachments' /> */}

								{
									files.map((file) => {
										return <strong>&nbsp;&nbsp;{file}</strong>
									})
								}
							</Col>
							{this.state.emailBody ?
								<Col xs={12} md={12}>
									<Button variant={"primary"} type="button" id="doPrint" className="float-right"
									>
										Print Quote
								</Button>
								</Col> : null}
						</Row>
						<hr />

						{/* <Main lgClose={this.lgClose} show={this.state.showEditor} handleSubmit={(body) => this.sendEmailToCustomer(this.state.acivityTaskId, this.state.nextActivityTaskId, this.state.userActivityId, body)} subject={this.state.subject} to={this.state.to} companyEmailId={this.state.companyEmailId} isLoading={this.state.isLoading} text={getTemplate(1, products, quoteDetails)} quoteDetails={quoteDetails} products={products} /> */}
						{this.state.emailBody ?
							<div id="printEmail" dangerouslySetInnerHTML={{ __html: this.state.emailBody }} />
							:
							<div dangerouslySetInnerHTML={{ __html: getTemplate(quoteDetails.companyId, products, quoteDetails, this.state.constactPerson, quoteDetails.companyId === 1 ? <div dangerouslySetInnerHTML={{ __html: 'Belt Size and Specification.<br/>As per IS 1891(1994 Latest)<br/>MAKE – SOMIFLEX' }} /> : 'Particular', this.state.currencyHtmlCode) }} />
						}

						{/* Editor */}

						{this.state.emailBody && this.state.editorState != '' ? '' : <div className={styles + " RichEditor-root"}>
							<BlockStyleControls
								editorState={editorState}
								onToggle={this.toggleBlockType}
							/>
							<InlineStyleControls
								editorState={editorState}
								onToggle={this.toggleInlineStyle}
							/>
							<div className={className} onClick={this.focus}>
								<Editor
									blockStyleFn={getBlockStyle}
									blockRenderMap={blockRenderMap}
									customStyleMap={styleMap}
									editorState={editorState}
									handleKeyCommand={this.handleKeyCommand}
									onChange={this.onChange}
									onTab={this.onTab}
									ref="editor"
									spellCheck={true}
								/>
							</div>
						</div>
						}

						{/* End */}

					</StandardModal>
					: null
				}
				{
					this.state.showScheduler ?
						<Scheduler scheduleId={this.state.scheduleId} lgClose={this.schedulerClose} acivityTaskId={this.state.acivityTaskId} nextActivityTaskId={this.state.nextActivityTaskId} userActivityId={this.state.userActivityId} show={this.state.showScheduler} quoteDetails={quoteDetails} /> : null
				}
				{
					this.state.showCloseCase ? <CloseQuote isDiscard={this.state.isDiscard} scheduleId={this.state.scheduleId} lgClose={this.schedulerClose} acivityTaskId={this.state.acivityTaskId} nextActivityTaskId={this.state.nextActivityTaskId} userActivityId={this.state.userActivityId} show={this.state.showCloseCase} quoteDetails={quoteDetails} /> : null
				}
				{
					this.state.showDispatchSummary ? <DispatchSummary scheduleId={this.state.scheduleId} lgClose={this.schedulerClose} acivityTaskId={this.state.acivityTaskId} nextActivityTaskId={this.state.nextActivityTaskId} userActivityId={this.state.userActivityId} show={this.state.showDispatchSummary} quoteDetails={quoteDetails} products={products} /> : null
				}
				{
					this.state.CreateQuoteShow ? <Create heading='Quote Edit' show={this.state.CreateQuoteShow} isNonEditable={this.state.isNonEditable} newQuote={quoteDetails} products={products} lgClose={() => this.handleQuoteEditClick(false)} handleModelClick={this.handleQuoteEditClick} />
						:
						null
				}
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		details: state.quote.details
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		taskDone: (taskHistId, nextTaskHistId, userActivityId, scheduleId, quoteId, status) => dispatch(taskDone(taskHistId, nextTaskHistId, userActivityId, scheduleId, quoteId, status)),
		fetchQuoteDetails: (quoteId, cb) => dispatch(itemsFetchQuoteDetails(quoteId, cb)),
		quoteStartAction: (taskHistId, quoteId) => dispatch(quoteStart(taskHistId, quoteId)),
		sendEmailAction: (data) => dispatch(sendEmail(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// Editor
// Custom overrides for "code" style.
const styleMap = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2
	},
};

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

function getBlockStyle(block) {
	switch (block.getType()) {
		case 'blockquote': return 'RichEditor-blockquote';
		default: return null;
	}
}

class StyleButton extends React.Component {
	constructor() {
		super();
		this.onToggle = (e) => {
			e.preventDefault();
			this.props.onToggle(this.props.style);
		};
	}

	render() {
		let className = 'RichEditor-styleButton';
		if (this.props.active) {
			className += ' RichEditor-activeButton';
		}

		return (
			<span className={className} onMouseDown={this.onToggle}>
				{this.props.label}
			</span>
		);
	}
}

const BLOCK_TYPES = [
	{ label: 'H1', style: 'header-one' },
	{ label: 'H2', style: 'header-two' },
	{ label: 'H3', style: 'header-three' },
	{ label: 'H4', style: 'header-four' },
	{ label: 'H5', style: 'header-five' },
	{ label: 'H6', style: 'header-six' },
	{ label: 'Blockquote', style: 'blockquote' },
	{ label: 'UL', style: 'unordered-list-item' },
	{ label: 'OL', style: 'ordered-list-item' },
	{ label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
	const { editorState } = props;
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className="RichEditor-controls">
			{BLOCK_TYPES.map((type) =>
				<StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			)}
		</div>
	);
};

var INLINE_STYLES = [
	{ label: 'Bold', style: 'BOLD' },
	{ label: 'Italic', style: 'ITALIC' },
	{ label: 'Underline', style: 'UNDERLINE' },
	{ label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
	var currentStyle = props.editorState.getCurrentInlineStyle();
	return (
		<div className="RichEditor-controls">
			{INLINE_STYLES.map(type =>
				<StyleButton
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			)}
		</div>
	);
};