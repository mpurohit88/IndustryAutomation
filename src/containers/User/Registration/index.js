import React, { Component } from 'react'
import { Form, Row, Col } from 'react-bootstrap';

import Modal from '../../../components/Modals/StandardModal'
import Input from '../../../components/Input'
import Checkbox from '../../../components/Checkbox'
import Dropdown from '../../../components/Dropdown'
/* component styles */
import { styles } from './styles.scss'

// User Registration Component
class Registration extends Component {
	constructor(props){
		super(props);
	
		this.state={
			newUser: {
				company_name: '',
				name: '',
				designation: '',
				area: '',
				address: '',
				mobNo: '',
				isActive: true
			},
			company: [{text: 'Individual', value:1},{text: 'Sole proprietorship', value:2},{text: 'Partnership', value:3},{text: 'Private limited company', value:4}],
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}
	
	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState( prevState => {
			 return { 
					newUser : {
									 ...prevState.newUser, [name]: value
									}
			 }
		}, () => console.log(this.state.newUser)
		)
	}

	handleSubmit(event){
		event.preventDefault();
		let userData = this.state.newUser;

		// registerAssociate(userData).then((response) => {
		// 		console.log(response);
		// }).catch(error => {
		// 	console.log(error.response)
		// });
	}

  render() {
    return (
			<Modal handleSubmit={this.handleSubmit} heading='User Registration' show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
				<Form>
						<Row className="show-grid">
							<Col xs={4} md={6}>
                                <Dropdown
									id='company_name'
									name='company_name'
									label='Select Company:'
									onChange={this.handleInput} value={this.state.name}
									options={this.state.company}
								/>
							</Col>
							<Col xs={12} md={12}>
								<Input label='Name of User:' type='input' onChange={this.handleInput} value={this.state.name} name='name' id='name' placeholder='Enter Name of User'/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Designation:' type='input' onChange={this.handleInput} value={this.state.designation} name='designation' id='designation' placeholder='Enter Designation'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Area:' type='input' onChange={this.handleInput} value={this.state.area} name='area' id='area' placeholder='Enter Area'/>
							</Col>
              <Col xs={12} md={12}>
								<Input label='Address:' type='input' onChange={this.handleInput} value={this.state.address} name='address' id='address' placeholder='Enter Country'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Mob. No.:' type='input' onChange={this.handleInput} value={this.state.mobNo} name='mobNo' id='mobNo' placeholder='Enter Mobile Number'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Email:' type='input' placeholder='Enter Email'/>
							</Col>
							<Col xs={4} md={6}>
								<Checkbox type="checkbox" label="Yes" />
							</Col>
						</Row>
				</Form>  
			</Modal>
    )
  }
}

export default Registration
