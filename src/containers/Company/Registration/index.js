import React, { Component } from 'react'
import { Form, Row, Col, Table } from 'react-bootstrap';

import Modal from '../../../components/Modals/StandardModal'
import Input from '../../../components/Input'
/* component styles */
import { styles } from './styles.scss'

// Company Registration Component
class Registration extends Component {
	constructor(props){
		super(props);
	
		this.state={
			newCompany: {
				name: '',
				address: '',
				city: '',
				state: '',
				country: '',
				tele: '',
				fax: '',
				mobileNo: '',
				email: '',
				website: '',
				gstn: '',
				logo: '',
				manufacturerOf: ''
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
					newCompany : {
									 ...prevState.newCompany, [name]: value
									}
			 }
		}, () => console.log(this.state.newCompany)
		)
	}

	handleSubmit(event){
		event.preventDefault();
		let userData = this.state.newCompany;

		// registerAssociate(userData).then((response) => {
		// 		console.log(response);
		// }).catch(error => {
		// 	console.log(error.response)
		// });
	}

  render() {
		const that = this;
    return (
			<Modal heading='Company Registration' handleSubmit={this.handleSubmit} show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
				<Form>
						<Row className="show-grid">
							<Col xs={4} md={6}>
								<Input label='Name Of Company:' onChange={this.handleInput} value={this.state.name} name='name' id='name' type='input' placeholder='Enter Name Of Company'/>
							</Col>
							<Col xs={12} md={12}>
								<Input label='Address:' type='input' onChange={this.handleInput} value={this.state.address} name='address' id='address' placeholder='Enter Address'/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='City:' type='input' onChange={this.handleInput} value={this.state.city} name='city' id='city' placeholder='Enter City'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='State:' type='input' onChange={this.handleInput} value={this.state.state} name='state' id='state' placeholder='Enter State'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Country:' onChange={this.handleInput} value={this.state.country} name='country' id='country' type='input' placeholder='Enter Country'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Tele:' onChange={this.handleInput} value={this.state.tele} name='tele' id='tele' type='input' placeholder='Enter Telephone Number'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Fax:' onChange={this.handleInput} value={this.state.fax} name='fax' id='fax' type='input' placeholder='Enter Fax Number'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Mob. No.:' onChange={this.handleInput} value={this.state.mobileNo} name='mobileNo' id='mobileNo' type='input' placeholder='Enter Mobile Number'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Email:' onChange={this.handleInput} value={this.state.email} name='email' id='email' type='input' placeholder='Enter Email'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Website:' onChange={this.handleInput} value={this.state.website} name='website' id='website' type='input' placeholder='Enter Website'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='GSTN:' onChange={this.handleInput} value={this.state.gstn} name='gstn' id='gstn' type='input' placeholder='Enter GSTN'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Browse Logo:' onChange={this.handleInput} value={this.state.logo} name='logo' id='logo' type='file'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Manufacturer of:' onChange={this.handleInput} value={this.state.manufacturerOf} name='manufacturerOf' id='manufacturerOf' type='input' placeholder='Enter Manufacturer of'/>
							</Col>
						</Row>
					</Form>  
        </Modal>
    )
  }
}

export default Registration
