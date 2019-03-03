import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { Badge } from '../../../components/Badge'
import { getStatus, getVariant } from '../helper'
import { appConfig } from 'configs/config-main'
import AppBar from 'components/AppBar'
import { getAdmin, getUserName, getCompanyName } from '../../../configs/user'
import { getISODateTime } from '../../helper'
import Button from '../../../components/Button'
import Main from '../../../components/Editor'
import getTemplate from '../../../components/Email'
import { StandardModal } from '../../../components/Modals'
import Scheduler from '../Scheduler'
import Input from '../../../components/Input'

import { itemsFetchQuoteDetails, quoteStart } from '../../../core/api/quote'
import { sendEmail } from '../../../core/api/email'
import { getById } from '../../../core/api/company'

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
			subject: 'Provide Subject',
			scheduleId: ''
		}

		this.showEmail = this.showEmail.bind(this);
		this.lgClose = this.lgClose.bind(this);
		this.sendEmailToCustomer = this.sendEmailToCustomer.bind(this);
		this.handleSchedulerClick = this.handleSchedulerClick.bind(this);
		this.schedulerClose = this.schedulerClose.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	componentDidMount() {
		const self = this;
		const { quoteId } = self.props.match.params;

		self.props.fetchQuoteDetails(quoteId, (data) => {
			getById().then((data) => {
				self.setState({ companyEmailId: data, to: data });
			});
		});
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState({ [name]: value })
	}

	lgClose() {
		this.setState({ showEditor: false })
	}

	schedulerClose() {
		this.setState({ showScheduler: false })
	}

	handleSchedulerClick(id, nextId, userActivityId, scheduleId) {
		this.setState({ showScheduler: true, acivityTaskId: id, nextActivityTaskId: nextId, userActivityId: userActivityId, scheduleId: scheduleId })
	}

	showEmail(id, nextId, userActivityId) {
		this.setState({ showEditor: true, acivityTaskId: id, nextActivityTaskId: nextId, userActivityId: userActivityId })
	}

	sendEmailToCustomer(id, nextId, userActivityId) {
		const self = this;

		this.props.sendEmailAction(getTemplate(this.props.details.products, this.props.details.quoteDetails), this.state.companyEmailId, this.state.to || this.props.details.quoteDetails.email, this.state.subject, id, nextId, userActivityId, () => {
			self.lgClose();
		});

		console.log(getTemplate(this.props.details.products, this.props.details.quoteDetails));
	}

	isDisabled(status, startDate, endDate) {
		if (status === 2 && startDate !== null && endDate === null) {
			return false;
		}

		return true;
	}

	isStepActive(status, startDate, endDate) {
		if (status === 2 && startDate !== null && endDate === null) {
			return true;
		}

		return false;
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
		const isAdmin = getAdmin(), userName = getUserName(), cname = getCompanyName();
		const { quoteDetails, tasks, products } = this.props.details;

		if (!quoteDetails) {
			return (<div>data is loading...</div>)
		}

		return (
			<Fragment>
				<AppBar isAdmin={isAdmin} name={userName} cname={cname}>{appConfig.name}</AppBar>
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
												onClick={(e) => { }}
											>
												Done
											</Button>
										</div>
									}

									{
										task.taskId === 3 && <div>
											<Button variant="outline-primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
												onClick={(e) => { }}
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
										task.taskId === 4 && <Fragment>
											<Button variant="outline-primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
												onClick={(e) => { }}
											>
												Upload
											</Button>
										</Fragment>
									}

								</div>
							})
						}
					</div>
					<div>
						<br />
						<Button variant="primary" type="button"
							onClick={(e) => this.showEmail(e)}
						>
							Close
						</Button>
					</div>

				</div>

				{this.state.showEditor ?
					<Main handleSubmit={() => this.sendEmailToCustomer(this.state.acivityTaskId, this.state.nextActivityTaskId, this.state.userActivityId)} subject={this.state.subject} to={this.state.to} companyEmailId={this.state.companyEmailId} isLoading={this.state.isLoading} text={getTemplate(1, products, quoteDetails)} quoteDetails={quoteDetails} products={products} />
					: null
				}
				{
					this.state.showScheduler ?
						<Scheduler scheduleId={this.state.scheduleId} lgClose={this.schedulerClose} acivityTaskId={this.state.acivityTaskId} nextActivityTaskId={this.state.nextActivityTaskId} userActivityId={this.state.userActivityId} show={this.state.showScheduler} quoteDetails={quoteDetails} /> : null
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
		fetchQuoteDetails: (quoteId, cb) => dispatch(itemsFetchQuoteDetails(quoteId, cb)),
		quoteStartAction: (taskHistId, quoteId) => dispatch(quoteStart(taskHistId, quoteId)),
		sendEmailAction: (body, from, to, subject, taskHistId, nextTaskHistId, userActivityId, cb) => dispatch(sendEmail(body, from, to, subject, taskHistId, nextTaskHistId, userActivityId, cb))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

