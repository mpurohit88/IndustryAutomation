import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'

import Modal from '../../../components/Modals/StandardModal'
import Input from '../../../components/Input'
import Dropdown from '../../../components/Dropdown'
import { Success } from '../../../components/Alerts'

import { registerUser, clearCredentials } from '../../../core/api/user'
import { itemsFetchData } from '../../../core/api/company'

// User Registration Component
class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newUser: {
				companyId: '',
				name: '',
				designation: '',
				area: '',
				address: '',
				mobileNo: '',
				email: '',
				isActive: true,
				isEdit: false
			},
			businessArea: [{ text: 'Project', value: 'Project' }, { text: 'Operational', value: 'Operational' },
			{ text: 'Govt. Tender', value: 'Govt. Tender' }, { text: 'Export', value: 'Export' }]
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleModelClick = this.handleModelClick.bind(this);
	}

	componentDidMount() {
		this.props.getCustomerList();
	}

	componentWillMount() {
		if (this.props.newUser) {
			this.setState({ newUser: this.props.newUser, isEdit: true });
		}
	}

	handleReset() {
		if (!this.state.isEdit) {
			this.setState({
				newUser: {
					companyId: '',
					name: '',
					designation: '',
					area: '',
					address: '',
					mobileNo: '',
					email: '',
					userId: '',
					password: '',
					isActive: true
				}
			});
		}
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState(prevState => {
			return {
				newUser: {
					...prevState.newUser, [name]: value
				}
			}
		}, () => { }
		)
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.register({ data: this.state.newUser, cb: this.handleReset });
	}

	handleModelClick(flag) {
		this.props.clear();
		this.props.handleModelClick(flag);
	}

	render() {
		const { credentials, companyList } = this.props;

		let companyDropdownList = companyList.map((company) => {
			return { text: company.name, value: company.id }
		});

		return (
			<Modal btnText='Save' handleSubmit={this.handleSubmit} heading='User Registration' show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={(flag) => this.handleModelClick(flag)}>
				<Form>
					<Row className="show-grid">
						{
							credentials && this.state.isEdit ?
								<Col xs={12} md={12}><Success id='userSuccess'>User Data Updated Successfully</Success></Col>
								:
								credentials && <Col xs={12} md={12}><Success id='userSuccess'>Credentials For '{credentials.userName}' => UserId: {credentials.userId} | Password: {credentials.password}</Success></Col>
						}
						<Col xs={12} md={12}>
							<Dropdown
								id='companyId'
								name='companyId'
								label='Select Company:'
								onChange={this.handleInput}
								value={this.state.newUser.companyId}
								options={companyDropdownList}
								placeholder='--Select Company--'
							/>
						</Col>
						<Col xs={4} md={6}>
							<Input label='User Id:' isRequired={true} type='input' onChange={this.handleInput} value={this.state.newUser.userId} name='userId' id='userId' placeholder='Enter User Login Id' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Password:' isRequired={true} type='input' onChange={this.handleInput} value={this.state.newUser.password} name='password' id='password' placeholder='Enter User Password' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Name of User:' isRequired={true} type='input' onChange={this.handleInput} value={this.state.newUser.name} name='name' id='name' placeholder='Enter Name of User' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Designation:' type='input' onChange={this.handleInput} value={this.state.newUser.designation} name='designation' id='designation' placeholder='Enter Designation' />
						</Col>
						<Col xs={4} md={6}>
							<Dropdown
								id='area'
								name='area'
								label='Select Business Area:'
								onChange={this.handleInput}
								value={this.state.newUser.area}
								options={this.state.businessArea}
								placeholder='--Select Business Area--'
							/>
						</Col>
						<Col xs={4} md={6}>
							<Input label='Address:' type='input' onChange={this.handleInput} value={this.state.newUser.address} name='address' id='address' placeholder='Enter Address' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Mobile No.:' type='input' onChange={this.handleInput} value={this.state.newUser.mobileNo} name='mobileNo' id='mobileNo' placeholder='Enter Mobile Number' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Email:' type='email' onChange={this.handleInput} value={this.state.newUser.email} name='email' id='email' placeholder='Enter Email' />
						</Col>
						{/* <Col xs={4} md={6}>
								<Checkbox type="checkbox" label="Yes" />
							</Col> */}
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
		register: (newUser) => dispatch(registerUser(newUser)),
		getCustomerList: () => dispatch(itemsFetchData()),
		clear: () => dispatch(clearCredentials())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
