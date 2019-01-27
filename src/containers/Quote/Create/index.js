import React, { Component } from 'react'
import { Form, Row, Col, Table } from 'react-bootstrap';

import { StandardModal } from '../../../components/Modals'
import Input from '../../../components/Input'
import Checkbox from '../../../components/Checkbox'
import Dropdown from '../../../components/Dropdown'

import { all as getAllProductList } from '../../../core/api/product'
/* component styles */
import { styles } from './styles.scss'

// Quote Create
class Create extends Component {
	constructor(props){
		super(props);
	
		this.state={
			newQuote: {
				party_name: '',
				address: '',
				phoneNo: '',
				mobileNo: ''
			},
			listOfProduct: [],
			products: [],
			productDrpDwn: [],
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

		getAllProductList().then(function(listOfProduct) {

			let list = listOfProduct.map((product) => {
				return {text: product.name, id: product.id};
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
			if( this.state.products[i].id === product.id ) {
				index = i;
				break;
			}
		}
		this.state.products.splice( index, 1 );	
		this.setState( {products: this.state.products} );
  };

	handleAddEvent(evt) {
		const fileArray = this.refs.file.value.split('\\');
		var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
		
    var product = {
      id: id,
      name: this.refs.name.value,
      hsn: this.refs.hsnCode.value,
      qty: this.refs.qty.value,
			rate: this.refs.rate.value,
			gst: this.refs.gst.value,
			file: fileArray[fileArray.length - 1]
    }
    this.state.products.push(product);
    this.setState(this.state.products);
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
		let userData = this.state.newQuote;

		// registerAssociate(userData).then((response) => {
		// 		console.log(response);
		// }).catch(error => {
		// 	console.log(error.response)
		// });
	}

  render() {
		const that = this;
		var product = this.state.products.map(function(product, index) {
      return (
			<tr key={product.id} className='productList'>
									<td>{index + 1}</td>
									<td>{product.name}
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
			<StandardModal heading='Create Quote' handleSubmit={this.handleSubmit} show={this.props.show} lgClose={this.props.lgClose} handleModelClick={this.props.handleModelClick}>
				<Form>
						<Row className="show-grid">
							<Col xs={8} md={6}>
								<Dropdown
									id='party_name'
									name='party_name'
									label='Select Party Name:'
									value={this.state.newQuote.party_name} 
									onChange={this.handleInput}
									placeholder = {'Party Name'}
									options={this.state.party_names}
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
														return <option value={product.id}>{product.text}</option>;
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
    )
  }
}

export default Create
