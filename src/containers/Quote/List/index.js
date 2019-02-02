import React, { Component, Fragment } from 'react'
import { Table, OverlayTrigger, Popover, Button } from 'react-bootstrap'

import { all as getAllQuote } from '../../../core/api/quote'
import { getByQuoteId } from '../../../core/api/quoteProduct'

import { getStatus } from '../helper'
import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of Quote Component
class List extends Component {
	constructor(props){
		super(props);

		this.state = {
			quoteList: [],
			quoteProductList: []
		}

		this.getProductList = this.getProductList.bind(this);
	}

	componentDidMount() {
		const that = this;

    getAllQuote().then((quoteList) => {
      that.setState({quoteList: quoteList})
    });
  }

  getProductList(quoteId) {
	getByQuoteId(quoteId).then((quoteProductList) => {
		this.setState({quoteProductList})
	});
  }

  render() {
	const popover = (
		<Popover id="popover-basic" title="Product List">
			<table>
				<thead><tr><th>Name</th><th>Quantity</th><th>GSTN</th></tr></thead>
				<tbody>
					{this.state.quoteProductList.map((list) => {
						return <tr>
								<td>{list.name}</td>
								<td>{list.quantity}</td>
								<td> {list.gstn}</td>
							</tr>
					})}
				</tbody>
			</table>
		</Popover>
	  );
	  
    return (
			<Fragment>
				<hr />
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
					<tbody>
						{
							this.state.quoteList && this.state.quoteList.map((quote, index) => {
								return <tr key={index}>
									<td>{quote.id}</td>
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
									<td>{getStatus(quote.status)}</td>
									<td>{getISODateTime(quote.dateTimeCreated)}</td>
									<td>{quote.name}</td>
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
