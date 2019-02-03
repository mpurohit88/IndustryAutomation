import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

import { itemsFetchData } from '../../../core/api/customer'

import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of customer Component
class List extends Component {
	componentDidMount() {
		this.props.fetchCustomerList();
  }

  render() {
		const { customerList, hasError, isLoading} = this.props;

		if(isLoading) 
		{
			return <div>...Loading</div>
		}

    return (
			<Fragment>
				<hr />
				<Table responsive striped bordered hover className={styles}>
					<thead>
						<tr>
							<td>Id</td>
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
									<td>{customer.id}</td>
									<td>{customer.name}</td>
									<td>{customer.address}</td>
									<td>{customer.contactPerson}</td>
									<td>{customer.telephone}</td>
									<td>{customer.gstn}</td>
									<td>{customer.email}</td>
									<td>{getISODateTime(customer.dateTimeCreated)}</td>
								</tr>
							})
						}
					</tbody>
				</Table>
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
