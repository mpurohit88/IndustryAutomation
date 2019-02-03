import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'

import Modal from '../../../components/Modals/StandardModal'
import Input from '../../../components/Input'
import Checkbox from '../../../components/Checkbox'
import Dropdown from '../../../components/Dropdown'
import { Success } from '../../../components/Alerts'

import { registerUser } from '../../../core/api/user'

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
			}
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.resetSuccess = this.resetSuccess.bind(this);
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
		this.props.register({data: this.state.newUser, cb: this.handleReset});
	}

  render() {
		const { credentials, companyList } = this.props;

		let companyDropdownList = companyList.map((company) => {
			return { text: company.name, value: company.id }
		});

    return (
			<Modal handleSubmit={this.handleSubmit} heading='User Registration' show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
				<Form>
						<Row className="show-grid">
							{
								credentials && <Col xs={12} md={12}><Success id='userSuccess'>Credentials For '{credentials.userName}' => UserId: {credentials.userId} | Password: {credentials.password}</Success></Col>
							}
							<Col xs={12} md={12}>
                <Dropdown
									id='company_name'
									name='company_name'
									label='Select Company:'
									onChange={this.handleInput} 
									value={this.state.newUser.company_name}
									options={companyDropdownList}
									placeholder='--Select Company--'
								/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Name of User:' type='input' onChange={this.handleInput} onBlur={this.resetSuccess} value={this.state.newUser.name} name='name' id='name' placeholder='Enter Name of User'/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Designation:' type='input' onChange={this.handleInput} value={this.state.newUser.designation} name='designation' id='designation' placeholder='Enter Designation'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Business Area:' type='input' onChange={this.handleInput} value={this.state.newUser.area} name='area' id='area' placeholder='Enter Area'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Address:' type='input' onChange={this.handleInput} value={this.state.newUser.address} name='address' id='address' placeholder='Enter Address'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Mobile No.:' type='input' onChange={this.handleInput} value={this.state.newUser.mobNo} name='mobNo' id='mobNo' placeholder='Enter Mobile Number'/>
							</Col>
              <Col xs={4} md={6}>
								<Input label='Email:' type='email' onChange={this.handleInput} value={this.state.newUser.email} name='email' id='email'placeholder='Enter Email'/>
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

const mapStateToProps = (state) => {
	return {
			companyList: state.company.list,
			credentials: state.user.credentials
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		register: (newUser) => dispatch(registerUser(newUser))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
