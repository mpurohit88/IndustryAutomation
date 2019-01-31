import React, { Component, Fragment } from 'react'
import { Table } from 'react-bootstrap'

import { all as getAllProduct } from '../../../core/api/product'

import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of Quote Component
class List extends Component {
	constructor(props){
		super(props);

		this.state = {
			productList: []
		}
	}

	componentDidMount() {
		const that = this;

    getAllProduct().then((productList) => {
      that.setState({productList: productList})
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
							<td>Unit</td>
							<td>HSN Code</td>
							<td>Created Time</td>
							<td>Created By</td>
						</tr>
					</thead>
					<tbody>
						{
							this.state.productList && this.state.productList.map((product, index) => {
								return <tr key={index}>
									<td>{product.id}</td>
									<td>{product.name}</td>
									<td>{product.unit}</td>
									<td>{product.hsnCode}</td>
									<td>{getISODateTime(product.dateTimeCreated)}</td>
									<td>{product.name}</td>
								</tr>
							})
						}
					</tbody>
				</Table>
			</Fragment>
		)
  }
}

export { List }
