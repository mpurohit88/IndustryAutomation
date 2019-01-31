import React, { Component, Fragment } from 'react'
import { Table } from 'react-bootstrap'

import { all as getAllCustomer } from '../../../core/api/customer'

import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of customer Component
class List extends Component {
	constructor(props){
		super(props);

		this.state = {
			customerList: []
		}
	}

	componentDidMount() {
		const that = this;

        getAllCustomer().then((customerList) => {
      that.setState({customerList: customerList})
    });
  }

  render() {
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
							this.state.customerList && this.state.customerList.map((customer, index) => {
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

export default List
