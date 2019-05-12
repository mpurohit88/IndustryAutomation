import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { Table, OverlayTrigger, Popover, Button } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import LoadingOverlay from 'react-loading-overlay';

import Dropdown from '../../../components/Dropdown'
import Input from '../../../components/Input'

import { Badge } from '../../../components/Badge'
import { itemsFetchData } from '../../../core/api/quote'
import { getByQuoteId } from '../../../core/api/quoteProduct'
import { getUniqueNames } from '../../../core/api/customer'
import { getUniqueNames as userUniqueList } from '../../../core/api/user'

import { getStatus, getVariant } from '../helper'
import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of Quote Component
class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quoteProductList: [],
			customerList: [],
			userList: [],
			statusList: [{ text: 'New', value: '1' }, { text: 'Started', value: '2' }, { text: 'Quote Sent', value: '3' }, { text: 'Scheduled', value: '4' }, { text: 'Quote Closed', value: '100' }, { text: 'Quote Discarded', value: '102' }],
			filterCriteria: {
				customerId: null,
				userId: null,
				status: null,
				from_date: null,
				to_date: null
			}
		}

		this.getProductList = this.getProductList.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.filterList = this.filterList.bind(this);
		this.reset = this.reset.bind(this);
	}

	componentDidMount() {
		this.props.fetchQuoteList();

		getUniqueNames().then((list) => {
			this.setState({ customerList: list });
		});

		userUniqueList().then((list) => {
			this.setState({ userList: list.userList });
		});
	}

	getProductList(quoteId) {
		getByQuoteId(quoteId).then((quoteProductList) => {
			this.setState({ quoteProductList })
		});
	}

	reset() {
		this.setState(prevState => {
			return {
				filterCriteria: {
					...prevState.filterCriteria, ['customerId']: '0', ['userId']: '0', ['statusId']: '0', ['from_date']: '', ['to_date']: ''
				}
			}
		}, () => { }
		)

		this.props.fetchQuoteList();
	}

	filterList() {
		const customerId = this.state.filterCriteria.customerId === '0' ? null : this.state.filterCriteria.customerId;
		const userId = this.state.filterCriteria.userId === '0' ? null : this.state.filterCriteria.userId;
		const statusId = this.state.filterCriteria.statusId === '0' ? null : this.state.filterCriteria.statusId;
		const from_date = this.state.filterCriteria.from_date;
		const to_date = this.state.filterCriteria.to_date;

		this.props.fetchQuoteList(customerId, userId, statusId, from_date, to_date);
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState(prevState => {
			return {
				filterCriteria: {
					...prevState.filterCriteria, [name]: value
				}
			}
		}, () => { }
		)
	}

	render() {
		const { quoteList, hasError, isLoading } = this.props;

		// if (isLoading) {
		// 	return <div>...Loading</div>
		// }

		const popover = (
			<Popover id="popover-basic" title="Product List">
				<table>
					<thead><tr><th>Name</th><th>Description</th><th>Quantity</th><th>GSTN</th></tr></thead>
					<tbody>
						{this.state.quoteProductList.map((list) => {
							return <tr>
								<td>{list.name}</td>
								<td>{list.description}</td>
								<td>{list.quantity}</td>
								<td>{list.gstn}</td>
							</tr>
						})}
					</tbody>
				</table>
			</Popover >
		);

		return (
			<Fragment>
				<hr />
				<div id='filter' style={{ border: '1px solid #ef851c', padding: '10px', borderRadius: '0.90rem', marginBottom: '14px' }}>
					<Row className="show-grid" style={{ alignItems: 'center' }}>
						<Col xs={2} md={2}>
							<Dropdown
								id='customerId'
								name='customerId'
								label='Select Customer:'
								onChange={this.handleInput}
								value={this.state.filterCriteria.customerId}
								options={this.state.customerList}
								placeholder='--Select Customer--'
							/>
						</Col>
						{
							this.props.isAdmin && <Col xs={2} md={2}>
								<Dropdown
									id='userId'
									name='userId'
									label='Select User:'
									onChange={this.handleInput}
									value={this.state.filterCriteria.userId}
									options={this.state.userList}
									placeholder='--Select User--'
								/>
							</Col>
						}
						<Col xs={2} md={2}>
							<Dropdown
								id='statusId'
								name='statusId'
								label='Select Status:'
								onChange={this.handleInput}
								value={this.state.filterCriteria.statusId}
								options={this.state.statusList}
								placeholder='--Select Status--'
							/>
						</Col>
						<Col xs={2} md={2}>
							<Input label='From Date:' handleError={() => { }} onBlur={() => { }} onChange={this.handleInput} value={this.state.filterCriteria.from_date} name='from_date' id='from_date' type='date' />
						</Col>
						<Col xs={2} md={2}>
							<Input label='To Date:' handleError={() => { }} onBlur={() => { }} onChange={this.handleInput} value={this.state.filterCriteria.to_date} name='to_date' id='to_date' type='date' />
						</Col>
						<Col xs={2} md={2} style={{ paddingTop: '12px' }}>
							<Button variant="primary" type='button' onClick={this.filterList}>
								Filter Quote
						</Button>
							<Button variant="secondary" type='button' onClick={this.reset} style={{ marginLeft: '20px' }}>
								Reset
						</Button>
						</Col>
					</Row>
				</div>
				<LoadingOverlay
					active={isLoading}
					spinner
					text='Please wait...'
				>

					<Table responsive striped bordered hover className={styles}>
						<thead>
							<tr>
								<td>Id</td>
								<td>Customer Name</td>
								<td>Address</td>
								<td>Phone Number</td>
								<td>Mobile Number</td>
								<td>Products</td>
								<td>Status</td>
								<td>Created Time</td>
								<td>Created By</td>
							</tr>
						</thead>
						{
							quoteList.length === 0 ? <tr><td colSpan='9'>No Quote found for given selection, Please modify search selection and try again!</td></tr> :
								<tbody>
									{
										quoteList && quoteList.map((quote, index) => {
											return <tr key={index}>
												<td><Link to={`/quote/${quote.id}`}>{`Quote ${quote.id}`}</Link></td>
												<td>{quote.companyName}</td>
												<td>{quote.address}</td>
												<td>{quote.phoneNo}</td>
												<td>{quote.mobileNo}</td>
												<td>
													<OverlayTrigger trigger="click" placement="right" overlay={popover}>
														<Button variant="success" onClick={() => this.getProductList(quote.id)}>View</Button>
													</OverlayTrigger>
													{/* <a href="#" onClick={() => this.getProductList(quote.id)}>View</a> */}
												</td>
												<td><Badge pill variant={getVariant(quote.status)}>{getStatus(quote.status)}</Badge></td>
												<td>{getISODateTime(quote.dateTimeCreated)}</td>
												<td>{quote.name}</td>
											</tr>
										})
									}
								</tbody>
						}

					</Table>
				</LoadingOverlay>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		quoteList: state.quote.list,
		hasError: state.quote.hasError,
		isLoading: state.quote.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchQuoteList: (customerId, userId, statusId, from_date, to_date) => dispatch(itemsFetchData(customerId, userId, statusId, from_date, to_date))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
