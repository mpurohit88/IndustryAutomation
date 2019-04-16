import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

import { itemsFetchData } from '../../../core/api/product'
import { Add as ProductEdit } from '../index';

import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of Quote Component
class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			productRegShow: false,
			product: {}
		};
	}

	componentDidMount() {
		this.props.fetchProductList();
	}

	handleProductRegClick = (flag, product) => this.setState({ productRegShow: flag, product: product });

	render() {
		const { productList, hasError, isLoading } = this.props;

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
							<td>Description</td>
							<td>Unit</td>
							<td>HSN Code</td>
							<td>Image</td>
							<td>Created Time</td>
							<td>Created By</td>
						</tr>
					</thead>
					<tbody>
						{
							productList && productList.map((product, index) => {
								return <tr key={index}>
									{/* <td>{product.id}</td> */}
									<td className='imgEdit'>
										<img height='17' src='/img/userEdit.png' />
										<a href='#' onClick={() => this.handleProductRegClick(true, product)}>{product.name}</a>
									</td>
									<td>{product.description}</td>
									<td>{product.unit}</td>
									<td>{product.hsnCode}</td>
									<td> {product.imgName && <img height="80" width="80" src={`/img/product/${product.imgName}`} />}</td>
									<td>{getISODateTime(product.dateTimeCreated)}</td>
									<td>{product.createdBy}</td>
								</tr>
							})
						}
					</tbody>
				</Table>
				{
					this.state.productRegShow ? <ProductEdit heading='Product Edit' show={this.state.productRegShow} newProduct={this.state.product} lgClose={() => this.handleProductRegClick(false)} handleModelClick={this.handleProductRegClick} />
						:
						null
				}
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		productList: state.product.list,
		hasError: state.product.hasError,
		isLoading: state.product.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProductList: () => dispatch(itemsFetchData())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

