import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

import { getEmailLog } from '../../../core/api/emailLog'

import { getISODateTime } from '../../helper'
import { Add as CustomerEdit } from '../index';

/* component styles */
import { styles } from './styles.scss'

// List Of customer Component
class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			customerRegShow: false,
			errorLogs: {},
			isLoading: true
		};
	}

	componentDidMount() {
		getEmailLog().then((result) => {
			this.setState({ errorLogs: result, isLoading: false });
			this.props.setErrorCount(result.length);
		})
	}

	handleCustomerRegClick = (flag, customer) => this.setState({ customerRegShow: flag, customer: customer });

	render() {
		const { errorLogs, isLoading } = this.state;

		if (isLoading) {
			return <div>...Loading</div>
		}

		return (
			<Fragment>
				<hr />
				<Table responsive striped bordered hover className={styles}>
					<thead>
						<tr>
							{/* <td>Id</td> */}
							<td>Quote Id</td>
							<td>Schedule Id</td>
							<td>Error Message</td>
							<td>Stack Trace</td>
							<td>Created Time</td>
						</tr>
					</thead>
					<tbody>
						{
							errorLogs && errorLogs.map((log, index) => {
								return <tr key={index}>
									{/* <td>{customer.id}</td> */}
									{/* <td className='imgEdit'>
										<img height='17' src='/img/userEdit.png' />
										<a href='#' onClick={() => this.handleCustomerRegClick(true, customer)}>{customer.name}</a>
									</td> */}
									<td>{log.quote_id}</td>
									<td>{log.schedule_id}</td>
									<td>{log.error_msg}</td>
									<td>{log.stack_trace}</td>
									<td>{getISODateTime(log.dateTimeCreated)}</td>
								</tr>
							})
						}
					</tbody>
				</Table>
				{/* {
					this.state.customerRegShow ? <CustomerEdit heading='Customer Edit' show={this.state.customerRegShow} newCustomer={this.state.customer} lgClose={() => this.handleCustomerRegClick(false)} handleModelClick={this.handleCustomerRegClick} />
						:
						null
				} */}
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		customerList: state.customer.list,
		hasError: state.customer.hasError,
		isLoading: state.customer.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCustomerList: () => dispatch(itemsFetchData())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
