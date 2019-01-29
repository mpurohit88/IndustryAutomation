import React, { Component, Fragment } from 'react'
import { Form, Row, Col, Table } from 'react-bootstrap';

import { StandardModal } from '../../../components/Modals'
import Input from '../../../components/Input'
import Checkbox from '../../../components/Checkbox'
import Dropdown from '../../../components/Dropdown'

import { all as getAllProductList } from '../../../core/api/product'
import { all as getAllPartyList } from '../../../core/api/customer'

import { createQuote } from '../../../core/api/quote'

/* component styles */
import { styles } from './styles.scss'

// Quote Create
class Create extends Component {
	constructor(props){
		super(props);
	
		this.state={
			isLoading: false,
			newQuote: {
				party_name: '',
				address: '',
				phoneNo: '',
				mobileNo: ''
			},
			listOfProduct: [],
			products: [],
			productDrpDwn: [],
			partyDrpDwn: [],
			party_names: [{text: 'Individual', value:1},{text: 'Sole proprietorship', value:2},{text: 'Partnership', value:3},{text: 'Private limited company', value:4}],
		}

		this.handleAddEvent = this.handleAddEvent.bind(this);
		this.handleRowDel = this.handleRowDel.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleProductChange = this.handleProductChange.bind(this);
	}

	componentDidMount() {
		const that = this;

		getAllPartyList().then(function(listOfParty) {

			let list = listOfParty.map((party) => {
				return {text: party.name, value: party.id};
			});

			that.setState({partyDrpDwn: list});
		});

		getAllProductList().then(function(listOfProduct) {

			let list = listOfProduct.map((product) => {
				return {text: product.name, value: product.id};
			});

			that.setState({productDrpDwn: list, listOfProduct: listOfProduct});
		});
	}

	handleProductChange(e) {
		const that = this;

		this.state.listOfProduct.map((product) => {
			if(product.id === parseInt(e.target.value)) {
				that.refs.hsnCode.value = product.hsnCode;
				that.refs.rate.value = product.unit;
			}
		});
	}

	handleRowDel(product) {
		var index = -1;	
		var clength = this.state.products.length;
		for( var i = 0; i < clength; i++ ) {
			if( this.state.products[i].id === product.value ) {
				index = i;
				break;
			}
		}
		this.state.products.splice( index, 1 );	
		this.setState( {products: this.state.products} );
  };

	handleAddEvent(evt) {
		const fileArray = this.refs.file.value.split('\\');
		let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
		let isExists = false;

		if(this.refs.name.value === '0') {
			alert('Please select product.');
			return false;
		}
		
		this.state.products.map((product) => {
			if(product.product_id === this.refs.name.value) {
				isExists = true;
			}
		});

		if(isExists) {
			alert('Product already added.');
			return false;
		}

		var product = {
			id: id,
			product_id: this.refs.name.value,
			hsn: this.refs.hsnCode.value,
			qty: this.refs.qty.value,
			rate: this.refs.rate.value,
			gst: this.refs.gst.value,
			file: fileArray[fileArray.length - 1]
		}
		this.state.products.push(product);
		this.setState(this.state.products);

		this.refs.name.value = '0';
		this.refs.hsnCode.value = '';
		this.refs.qty.value = '';
		this.refs.rate.value = '';
		this.refs.gst.value = '';
	}
		
	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState( prevState => {
			 return { 
					newQuote : {
									 ...prevState.newQuote, [name]: value
									}
			 }
		}, () => console.log(this.state.newQuote)
		)
	}

	handleSubmit(event){
		event.preventDefault();
		const that = this;

		let data = {
			quote: this.state.newQuote,
			productList: this.state.products
		}

		this.setState({isLoading: true});
		
		createQuote(data).then((response) => {
			this.setState({isLoading: false});
			that.props.lgClose(false);
			that.props.handleSuccess(true, response);
		}).catch(error => {
			console.log(error.response)
		});
	}

  render() {
		const that = this;
		var product = this.state.products.map(function(product, index) {
      return (
			<tr key={product.id} className='productList'>
									<td>{index + 1}</td>
									<td>{product.product_id}
									</td>
									<td>{product.hsn}</td>
									<td>{product.qty}</td>
									<td>{product.rate}</td>
									<td>{product.gst}</td>
									<td>{product.file}</td>
									<td className='link'><a id='remove_quote' href='#' onClick={() => that.handleRowDel(product).bind(this)}>Remove</a></td>
								</tr>)
		});
		
    return (
		<Fragment>
			<StandardModal heading='Create Quote' isLoading={this.state.isLoading} handleSubmit={this.handleSubmit} show={this.props.show} lgClose={this.props.lgClose} handleModelClick={this.props.handleModelClick}>
				<Form>
						<Row className="show-grid">
							<Col xs={8} md={6}>
								<Dropdown
									id='party_name'
									name='party_name'
									label='Party Name:'
									value={this.state.newQuote.party_name} 
									onChange={this.handleInput}
									placeholder='--Select Party Name--'
									options={this.state.partyDrpDwn}
								/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Address:' type='input' onChange={this.handleInput} value={this.state.newQuote.address} name='address' id='address' placeholder='Enter Address'/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Phone no.:' type='input' onChange={this.handleInput} value={this.state.newQuote.phoneNo} name='phoneNo' id='phoneNo' placeholder='Enter Phone No'/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Mobile no.:' type='input' onChange={this.handleInput} value={this.state.newQuote.mobileNo} name='mobileNo' id='mobileNo' placeholder='Enter Mobile No'/>
							</Col>
						</Row>
						<Table responsive>
							<thead>
								<tr>
									<th>#</th>
									<th>Name of product/Description/
										particulars
									</th>
									<th>HSN Code</th>
									<th>Quantity</th>
									<th>Rate With unit</th>
									<th>GST(%)</th>
									<th>Browse image</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
									<tr>
										<td></td>
										<td>
											<select className='product' ref="name" onChange={this.handleProductChange} defaultValue='0'>
												<option value='0' disabled>--Select Product--</option>
												{
													this.state.productDrpDwn.map((product) => {
														return <option value={product.value}>{product.text}</option>;
													})
												}
											</select>
										</td>
										<td>
											<input type='input' className='hsnCode' ref="hsnCode"/>
										</td>
										<td>
											<input type='input' className='quantity' ref="qty"/>
										</td>
										<td>
											<input type='input' className='rate' ref="rate"/>
										</td>
										<td>
											<input type='input' className='gst' ref="gst"/>
										</td>
										<td>
											<input type='file' className='file' ref="file"/>
										</td>
										<td>
											<input type='button' value='Add' onClick={this.handleAddEvent}/>
										</td>
									</tr>
									{product}
							</tbody>
						</Table>
					<Checkbox type="checkbox" label="Check me out" />
				</Form>  
			</StandardModal>
		</Fragment>
    )
  }
}

export default Create
