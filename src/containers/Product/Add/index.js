import React, { Component } from 'react'
import { Form, Row, Col, Table } from 'react-bootstrap';

import Modal from '../../../components/Modals/StandardModal'
import Input from '../../../components/Input'

import { addProduct } from '../../../core/api/product'
/* component styles */
import { styles } from './styles.scss'

// Add Product Component
class Add extends Component {
	constructor(props){
		super(props);
	
		this.state={
			newProduct: {
				name: '',
				description: '',
				unit: '',
				img: '',
				hsnCode: ''
			}
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState( prevState => {
			 return { 
					newProduct : {
									 ...prevState.newProduct, [name]: value
									}
			 }
		}, () => console.log(this.state.newProduct)
		)
	}

	handleSubmit(event){
		event.preventDefault();
		let productData = this.state.newProduct;

		addProduct(productData).then((response) => {
				console.log(response);
		}).catch(error => {
			console.log(error.response)
		});
	}

  render() {
    return (
			<Modal heading='Add Product' handleSubmit={this.handleSubmit} show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
				<Form>
						<Row className="show-grid">
							<Col xs={4} md={6}>
								<Input label='Name Of Product:' onChange={this.handleInput} value={this.state.newProduct.name} name='name' id='name' type='input' placeholder='Enter Name Of Product'/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Description:' type='input' onChange={this.handleInput} value={this.state.newProduct.description} name='description' id='description' placeholder='Enter Description'/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Name Of Unit:' type='input' onChange={this.handleInput} value={this.state.newProduct.unit} name='unit' id='unit' placeholder='Enter Unit'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Browse Image:' type='file' onChange={this.handleInput} value={this.state.newProduct.img} name='img' id='img' placeholder='Enter State'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='HSN Code:' onChange={this.handleInput} value={this.state.newProduct.hsnCode} name='hsnCode' id='hsnCode' type='input' placeholder='Enter HSN Code'/>
							</Col>
						</Row>
					</Form>  
        </Modal>
    )
  }
}

export default Add
