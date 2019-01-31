import React, { Component } from 'react'
import { Form, Row, Col } from 'react-bootstrap';

import Modal from '../../../components/Modals/StandardModal'
import Input from '../../../components/Input'
import Checkbox from '../../../components/Checkbox'
import Dropdown from '../../../components/Dropdown'
import { Success } from '../../../components/Alerts'

import { registerUser } from '../../../core/api/user'
import { all as getCompanyList } from '../../../core/api/company'

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
				email: '',
				isActive: true
			},
			companyList: []
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	componentDidMount() {
		const that = this;
		getCompanyList().then((companyList) => {
			let companyDropdownList = companyList.map((company) => {
				return { text: company.name, value: company.id }
			});

			that.setState({companyList: companyDropdownList})
		});
	}
	
	handleReset() {
		this.setState({
			newUser: {
				company_name: '',
				name: '',
				designation: '',
				area: '',
				address: '',
				mobNo: '',
				email: '',
				isActive: true
			}
		})
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
		const that = this;
		let userData = this.state.newUser;

		registerUser(userData).then((response) => {
			that.setState({response});
			that.handleReset();
		}).catch(error => {
			console.log(error)
		});
	}

  render() {
	const { response } = this.state;

    return (
			<Modal handleSubmit={this.handleSubmit} heading='User Registration' show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
				<Form>
						<Row className="show-grid">
							{
								response && <Col xs={12} md={12}><Success id='userSuccess'>Credentials For '{response.userName}' => UserId: {response.userId} | Password: {response.password}</Success></Col>
							}
							<Col xs={12} md={12}>
                				<Dropdown
									id='company_name'
									name='company_name'
									label='Select Company:'
									onChange={this.handleInput} value={this.state.name}
									options={this.state.companyList}
									placeholder='--Select Company--'
								/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Name of User:' type='input' onChange={this.handleInput} value={this.state.name} name='name' id='name' placeholder='Enter Name of User'/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Designation:' type='input' onChange={this.handleInput} value={this.state.designation} name='designation' id='designation' placeholder='Enter Designation'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Business Area:' type='input' onChange={this.handleInput} value={this.state.area} name='area' id='area' placeholder='Enter Area'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Address:' type='input' onChange={this.handleInput} value={this.state.address} name='address' id='address' placeholder='Enter Address'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Mob. No.:' type='input' onChange={this.handleInput} value={this.state.mobNo} name='mobNo' id='mobNo' placeholder='Enter Mobile Number'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Email:' type='email' onChange={this.handleInput} value={this.state.email} name='email' id='email'placeholder='Enter Email'/>
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
