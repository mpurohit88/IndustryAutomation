import React, { Component } from 'react'
import { Form, Row, Col, Table } from 'react-bootstrap';

import Input from '../../../components/Input'
import Checkbox from '../../../components/Checkbox'
import Dropdown from '../../../components/Dropdown'
/* component styles */
import { styles } from './styles.scss'

class Create extends Component {
	constructor(props){
		super(props);
	
		this.state={
			products: [],
			natureOfBusiness: [{text: 'Individual', value:1},{text: 'Sole proprietorship', value:2},{text: 'Partnership', value:3},{text: 'Private limited company', value:4}],
		}

		this.handleAddEvent = this.handleAddEvent.bind(this);
		this.handleRowDel = this.handleRowDel.bind(this);
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
				<Form>
						<Row className="show-grid">
							<Col xs={8} md={6}>
								<Dropdown
									id='nature_of_Business'
									name='nature_of_Business'
									label='Select Party Name:'
									// value={this.state.newUser.nature_of_Business} 
									// onChange={this.handleInput}
									placeholder = {'Nature of Business'}
									options={this.state.natureOfBusiness}
								/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Address:' type='input' placeholder='Enter Address'/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Phone no.:' type='input' placeholder='Enter Phone No'/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Mobile no.:' type='input' placeholder='Enter Mobile No'/>
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
											<select className='product' ref="name">
												<option>data 1</option>
												<option>data 2</option>
												<option>data 3</option>
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
    )
  }
}

export default Create
