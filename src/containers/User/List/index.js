import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

import { itemsFetchData } from '../../../core/api/user'

import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of User Component
class List extends Component {
	componentDidMount() {
		this.props.fetchUserList();
  }

  render() {
		const { userList, hasError, isLoading} = this.props;

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
							<td>Company Name</td>
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
							userList && userList.map((user, index) => {
								return <tr key={index}>
									<td>{user.id}</td>
									<td>{user.name}</td>
									<td>{user.companyName}</td>
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

const mapStateToProps = (state) => {
	return {
			userList: state.user.list,
			hasError: state.user.hasError,
			isLoading: state.user.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserList: () => dispatch(itemsFetchData())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

