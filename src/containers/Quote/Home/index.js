import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { Badge } from '../../../components/Badge'
import { getStatus, getVariant } from '../helper'
import { appConfig } from 'configs/config-main'
import AppBar from 'components/AppBar'
import { getAdmin, getUserName, getCompanyName, getCompanyLogo } from '../../../configs/user'
import { getISODateTime } from '../../helper'
import Button from '../../../components/Button'
import getTemplate from '../../../components/Email'
import { StandardModal } from '../../../components/Modals'
import Scheduler from '../Scheduler'
import CloseQuote from './closeQuote'
import DispatchSummary from './dispatchSummary'
import Input from '../../../components/Input'

import { itemsFetchQuoteDetails, quoteStart } from '../../../core/api/quote'
import { sendEmail } from '../../../core/api/email'
import { getById } from '../../../core/api/company'
import { quoteContactDetail } from '../../../core/api/customerContact'
import { taskDone } from '../../../core/api/schedule'

/* component styles */
import { styles } from './styles.scss'

// Home Of Quote Component
class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			showEditor: false,
			showScheduler: false,
			companyEmailId: '',
			to: '',
			cc: '',
			bcc: '',
			subject: 'Provide Subject',
			scheduleId: '',
			showCloseCase: false,
			showDispatchSummary: false,
			isDiscard: false
		}

		this.showEmail = this.showEmail.bind(this);
		this.lgClose = this.lgClose.bind(this);
		this.sendEmailToCustomer = this.sendEmailToCustomer.bind(this);
		this.handleSchedulerClick = this.handleSchedulerClick.bind(this);
		this.schedulerClose = this.schedulerClose.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.doneTask = this.doneTask.bind(this);
		this.showDispatchSummary = this.showDispatchSummary.bind(this);
	}

	componentDidMount() {
		const self = this;
		const { quoteId } = self.props.match.params;

		self.props.fetchQuoteDetails(quoteId, (data) => {
			getById().then((emailId) => {
				self.setState({ companyEmailId: emailId, to: data.quoteDetails.email });
			});
		});
	}

	doneTask(taskId, nextTaskid, userActivityId, scheduleId, quoteId, status) {
		this.props.taskDone(taskId, nextTaskid, userActivityId, scheduleId, quoteId, status);
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState({ [name]: value })
	}

	lgClose() {
		this.setState({ showEditor: false, showCloseCase: false, showDispatchSummary: false })
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
			this.setState({ constactPerson: result, showEditor: true, acivityTaskId: id, nextActivityTaskId: nextId, userActivityId: userActivityId })
		})
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
			let body = getTemplate(this.props.details.quoteDetails.companyId, this.props.details.products, this.props.details.quoteDetails, this.state.constactPerson);

			body = body.replace('<input type="text" id="refId" name="refId"/>', document.getElementById('refId').value)
			body = body.replace('<input type="text" size="100" id="refSubject" name="refSubject" value="Ref. Your Email Enquiry Dated 27.12.2018 for OTR Tyre Accessories."/>', document.getElementById('refSubject').value)
			body = body.replace('<input type="text" size="70" id="about-product" name="about-product" value="OTR Tubes %26 Flaps and &quot;O&quot; Rings available in all size"/>', document.getElementById('about-product').value)
			// body = body.replace('<textarea cols="40" rows="3" id="thanks" name="thanks"></textarea>', document.getElementById('thanks').value);

			const post = document.createElement('p');
			post.style.cssText = 'line-height: 1; color:black;';
			const postText = document.getElementById('terms').value;
			post.textContent = postText;
			post.innerHTML = post.innerHTML.replace(/\n/g, '<br style="line-height:">\n');  // <-- THIS FIXES THE LINE BREAKS
			const card = document.createElement('div');
			card.appendChild(post);
			const cardStack = document.getElementById('term-data');
			cardStack.insertBefore(card, cardStack.firstChild);

			body = body.replace('<textarea cols="100" rows="7" id="terms" name="terms"></textarea>', card.innerHTML);

			this.props.details.products.map((e, index) => {
				body = body.replace('src="/img/product/' + e.imgName + '"', 'src="cid:EmbeddedContent_' + index + '"');
			});

			self.setState({ isLoading: true });
			this.props.sendEmailAction(body, this.state.companyEmailId, this.state.to || this.props.details.quoteDetails.email, this.state.cc || '', this.state.bcc || '', this.state.subject, id, nextId, userActivityId, () => {
				self.lgClose();
				self.setState({ isLoading: false });
			}, this.props.details.quoteDetails.id);
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
		if (startDate !== null && endDate === null) {
			return true;
		}

		return false;
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
		const isAdmin = getAdmin(), userName = getUserName(), cname = getCompanyName(), clogo = getCompanyLogo();
		const { quoteDetails, tasks, products } = this.props.details;

		if (!quoteDetails) {
			return (<div>data is loading...</div>)
		}

		return (
			<Fragment>
				<AppBar isAdmin={isAdmin} name={userName} cname={cname} clogo={clogo}>{appConfig.name}</AppBar>
				<div className={styles}>
					<div className='flex-center head'>
						<div>
							<strong>Quote No.: </strong>{quoteDetails.id} | <strong>Firm Name:</strong> {quoteDetails.companyName} | <strong>Created By:</strong> {quoteDetails.userName} | <strong>Created Date:</strong> {getISODateTime(quoteDetails.dateTimeCreated)}
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

					<div style={{ marginTop: 15 + 'px' }}>
						{
							tasks.map((task, index) => {
								return <div className={`flex-center step checkmark${this.isStepActive(quoteDetails.status, task.startDate, task.endDate) ? ' active-step' : ''}`}>

									{index + 1 < tasks.length && <div className="vertical-line"></div>}

									<div className={`${this.showStepCircle(task.startDate, task.endDate)}`}>
										<label className='text'>{task.text}</label>
									</div>

									{
										task.taskId === 1 && <Button variant="outline-primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
											onClick={(e) => this.showEmail(task.id, tasks[index + 1].id, task.userActivityId)}
										>
											Send Email
																</Button>
									}

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
												Done
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
					<StandardModal btnText='Send Email' heading='Qutation' isLoading={this.state.isLoading} handleSubmit={() => this.sendEmailToCustomer(this.state.acivityTaskId, this.state.nextActivityTaskId, this.state.userActivityId)} show={this.state.showEditor} lgClose={this.lgClose} handleModelClick={this.lgClose}>
						<Row className="show-grid">
							<Col xs={4} md={6}>
								<Input label='From:' onChange={this.handleInput} value={this.state.companyEmailId} name='companyEmailId' id='companyEmailId' type='input' />
							</Col>
							<Col xs={4} md={6}>
								<Input label='To:' onChange={this.handleInput} value={this.state.to} name='to' id='to' type='input' />
							</Col>
							<Col xs={4} md={6}>
								<Input label='CC:' onChange={this.handleInput} value={this.state.cc} name='cc' id='cc' type='input' />
							</Col>
							<Col xs={4} md={6}>
								<Input label='BCC:' onChange={this.handleInput} value={this.state.bcc} name='bcc' id='bcc' type='input' />
							</Col>
							<Col xs={12} md={12}>
								<Input label='Suject:' onChange={this.handleInput} value={this.state.subject} name='subject' id='subject' type='input' />
							</Col>
						</Row>
						<hr />

						{/* <Main lgClose={this.lgClose} show={this.state.showEditor} handleSubmit={(body) => this.sendEmailToCustomer(this.state.acivityTaskId, this.state.nextActivityTaskId, this.state.userActivityId, body)} subject={this.state.subject} to={this.state.to} companyEmailId={this.state.companyEmailId} isLoading={this.state.isLoading} text={getTemplate(1, products, quoteDetails)} quoteDetails={quoteDetails} products={products} /> */}
						<div dangerouslySetInnerHTML={{ __html: getTemplate(quoteDetails.companyId, products, quoteDetails, this.state.constactPerson) }} />
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
		sendEmailAction: (body, from, to, cc, bcc, subject, taskHistId, nextTaskHistId, userActivityId, cb, quoteId) => dispatch(sendEmail(body, from, to, cc, bcc, subject, taskHistId, nextTaskHistId, userActivityId, cb, quoteId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

