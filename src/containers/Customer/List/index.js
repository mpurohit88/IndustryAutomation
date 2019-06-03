import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

import { itemsFetchData } from '../../../core/api/customer'

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
			customer: {}
		};
	}

	componentDidMount() {
		this.props.fetchCustomerList();
	}

	handleCustomerRegClick = (flag, customer) => this.setState({ customerRegShow: flag, customer: customer });

	render() {
		const { customerList, hasError, isLoading } = this.props;

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
							<td>Name</td>
							<td>Address</td>
							<td>Contact Person</td>
							<td>telephone</td>
							<td>GSTN</td>
							<td>Email</td>
							<td>Created Time</td>
						</tr>
					</thead>
					<tbody>
						{
							customerList && customerList.map((customer, index) => {
								return <tr key={index}>
									{/* <td>{customer.id}</td> */}
									<td className='imgEdit'>
										<img height='17' src='/img/userEdit.png' />
										<a style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => this.handleCustomerRegClick(true, customer)}>{customer.name}</a>
									</td>
									<td>{customer.address}</td>
									<td>{customer.customerContact.length > 0 ? <a style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => this.handleCustomerRegClick(true, customer)}>View</a> : ''}</td>
									<td>{customer.telephone}</td>
									<td>{customer.gstn}</td>
									<td>{customer.email}</td>
									<td>{getISODateTime(customer.dateTimeCreated)}</td>
								</tr>
							})
						}
					</tbody>
				</Table>
				{
					this.state.customerRegShow ? <CustomerEdit heading='Customer Edit' show={this.state.customerRegShow} newCustomer={this.state.customer} lgClose={() => this.handleCustomerRegClick(false)} handleModelClick={this.handleCustomerRegClick} />
						:
						null
				}
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
