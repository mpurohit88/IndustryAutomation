import React, { Component, Fragment } from 'react'
import { Form, Row, Col, Table } from 'react-bootstrap'

import { all as getAllQuote } from '../../../core/api/quote'

import { getStatus } from '../helper'
import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of Quote Component
class List extends Component {
	constructor(props){
		super(props);

		this.state = {
			quoteList: []
		}
	}

	componentDidMount() {
		const that = this;

    getAllQuote().then((quoteList) => {
      that.setState({quoteList: quoteList})
    });
  }

  render() {
    return (
			<Fragment>
				<h2>Quote List</h2>
				<hr />
				<Table responsive>
					<thead>
						<tr>
							<td>Id</td>
							<td>Party Id</td>
							<td>Address</td>
							<td>Phone Number</td>
							<td>Mobile Number</td>
							<td>Status</td>
							<td>Created Time</td>
						</tr>
					</thead>
					<tbody>
						{
							this.state.quoteList && this.state.quoteList.map((quote, index) => {
								return <tr key={index}>
									<td>{quote.id}</td>
									<td>{quote.party_id}</td>
									<td>{quote.address}</td>
									<td>{quote.phoneNo}</td>
									<td>{quote.mobileNo}</td>
									<td>{getStatus(quote.status)}</td>
									<td>{getISODateTime(quote.dateTimeCreated)}</td>
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
