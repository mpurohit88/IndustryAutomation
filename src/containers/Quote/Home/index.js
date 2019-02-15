import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Badge } from '../../../components/Badge'
import { getStatus, getVariant } from '../helper'
import { appConfig }          from 'configs/config-main'
import AppBar from 'components/AppBar'
import { getAdmin, getUserName, getCompanyName }                from '../../../configs/user'
import { getISODateTime } from '../../helper'
import Button from '../../../components/Button'
import EmailEditor from '../../../components/Editor'
import { GetContactEmail } from '../../../components/Email'
import { StandardModal } from '../../../components/Modals'

import { itemsFetchQuoteDetails, quoteStart } from '../../../core/api/quote'
import { sendEmail } from '../../../core/api/email'

/* component styles */
import { styles } from './styles.scss'

// Home Of Quote Component
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			showEditor: false
		}
		
		this.showEmail = this.showEmail.bind(this);
		this.lgClose = this.lgClose.bind(this);
		this.sendEmailToCustomer = this.sendEmailToCustomer.bind(this);
	}
	componentDidMount() {
		const { quoteId } = this.props.match.params;

		this.props.fetchQuoteDetails(quoteId);
	}

	lgClose() {
		this.setState({showEditor: false})
	}

	showEmail(id) {
		this.setState({showEditor: true, acivityTaskId: id})
	}

	sendEmailToCustomer(id) {
		sendEmail(id, GetContactEmail(this.props.details.products, this.props.details.quoteDetails)).then((response) => {
			console.log("***********", response);
		});

		console.log(GetContactEmail(this.props.details.products, this.props.details.quoteDetails));
	}

	isDisabled(status, startDate, endDate) {
		if(status === 2 && startDate !== null && endDate === null) {
			return false;
		}

		return true;
	} 

	isStepActive(status, startDate, endDate) {
		if(status === 2 && startDate !== null && endDate === null) {
			return true;
		}

		return false;
	}

  render() {
		const isAdmin = getAdmin(), userName = getUserName(), cname = getCompanyName();
		const { quoteDetails, tasks, products } = this.props.details;
		
		if(!quoteDetails) {
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
							
							<Button variant="primary" type="button" isDisabled={quoteDetails.status === 1 ? false : true}
											onClick={(e) => this.props.quoteStartAction(tasks[0].id, quoteDetails.id)}
										>
								Start Quote
							</Button>
						</div>
					</div>

					<div style={{marginTop: 15 + 'px'}}>
						{
							tasks.map((task) => {
								return <div className={`flex-center step checkmark${this.isStepActive(quoteDetails.status, task.startDate, task.endDate) ? ' active-step' : ''}`}>
										<div class={`${this.isStepActive(quoteDetails.status, task.startDate, task.endDate) ? 'circle': 'disabled-circle'}`}>
											<label className='text'>{task.text}</label>
										</div>
										
										{
											task.taskId === 1 && <Button variant="primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
																	onClick={(e) => this.showEmail(task.id)}
																>
																	Send Email
																</Button>
										}

										{
											task.taskId === 2 && <div>
																	<Button variant="primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
																		onClick={(e) => {}}
																	>
																		Set Reminder
																	</Button> 
																	<Button variant="primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
																		onClick={(e) => {}}
																	>
																		Done
																	</Button>
																</div>
										}

										{
											task.taskId === 3 && <div>
																	<Button variant="primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
																		onClick={(e) => {}}
																	>
																		If Yes, Upload
																	</Button>
																	<Button variant="primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
																		onClick={(e) => {}}
																	>
																		No
																	</Button>
																</div>
										}

{
											task.taskId === 4 && <Fragment>
																	<Button variant="primary" type="button" isDisabled={this.isDisabled(quoteDetails.status, task.startDate, task.endDate)}
																		onClick={(e) => {}}
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
							<StandardModal btnText='Send Email' heading='Qutation' isLoading={this.state.isLoading} handleSubmit={() => this.sendEmailToCustomer(this.state.acivityTaskId)} show={this.state.showEditor} lgClose={this.lgClose} handleModelClick={this.lgClose}>
								{/* <EmailEditor text={ GetContactEmail(products, quoteDetails)}/> */}
								<div dangerouslySetInnerHTML={{__html: GetContactEmail(products, quoteDetails) }} />
							</StandardModal> : null}
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
		fetchQuoteDetails: (quoteId) => dispatch(itemsFetchQuoteDetails(quoteId)),
		quoteStartAction: (taskHistId, quoteId) => dispatch(quoteStart(taskHistId, quoteId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

