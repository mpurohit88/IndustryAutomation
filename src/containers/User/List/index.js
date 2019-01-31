import React, { Component, Fragment } from 'react'
import { Table } from 'react-bootstrap'

import { all as getAllUser } from '../../../core/api/user'

import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of User Component
class List extends Component {
	constructor(props){
		super(props);

		this.state = {
			userList: []
		}
	}

	componentDidMount() {
		const that = this;

    getAllUser().then((userList) => {
      that.setState({userList: userList})
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
							<td>Company Name</td>
							<td>Name</td>
							<td>User Id</td>
							<td>Designation</td>
							<td>Area</td>
							<td>Address</td>
							<td>Mobile Number</td>
							<td>Email Address</td>
							<td>Created Time</td>
						</tr>
					</thead>
					<tbody>
						{
							this.state.userList && this.state.userList.map((user, index) => {
								return <tr key={index}>
									<td>{user.id}</td>
									<td>{user.companyName}</td>
									<td>{user.name}</td>
									<td>{user.userId}</td>
									<td>{user.designation}</td>
									<td>{user.area}</td>
									<td>{user.address}</td>
									<td>{user.mobileNo}</td>
									<td>{user.email}</td>
									<td>{getISODateTime(user.dateTimeCreated)}</td>
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
