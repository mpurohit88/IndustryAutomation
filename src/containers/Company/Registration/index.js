import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap';

import Modal from '../../../components/Modals/StandardModal'
import Input from '../../../components/Input'
import { registerCompany } from '../../../core/api/company'
import { Success } from '../../../components/Alerts'

// Company Registration Component
class Registration extends Component {
	constructor(props) {
		super(props);

		this.nameInput = React.createRef();

		this.state = {
			showSucess: false,
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
		this.handleReset = this.handleReset.bind(this);
		this.resetSuccess = this.resetSuccess.bind(this);
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState(prevState => {
			return {
				newCompany: {
					...prevState.newCompany, [name]: value
				}
			}
		}, () => { }
		)
	}

	handleReset() {
		this.setState({
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
			},
			showSucess: true
		});

		// Explicitly focus the text input using the raw DOM API
		// Note: we're accessing "current" to get the DOM node
		this.nameInput.current.focus();
	}

	handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData();
		formData.append('data', JSON.stringify(this.state.newCompany));
		formData.append('logo', document.getElementById('logo').files[0])

		this.props.register({ data: formData, cb: this.handleReset });
	}

	resetSuccess() {
		this.setState({ showSucess: false });
	}

	render() {
		return (
			<Modal btnText='Save' heading='Company Registration' handleSubmit={this.handleSubmit} show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
				<Form>
					{this.state.showSucess ? <Success>Company Registered Successfully!</Success> : null}
					<Row className="show-grid">
						<Col xs={6} md={6}>
							<Input label='Name Of Company:' inputRef={this.nameInput} onBlur={this.resetSuccess} onChange={this.handleInput} value={this.state.newCompany.name} name='name' id='name' type='input' placeholder='Enter Name Of Company' />
						</Col>
						<Col xs={6} md={6}>
							<Input label='Address:' type='input' onChange={this.handleInput} value={this.state.newCompany.address} name='address' id='address' placeholder='Enter Address' />
						</Col>
						<Col xs={6} md={6}>
							<Input label='City:' type='input' onChange={this.handleInput} value={this.state.newCompany.city} name='city' id='city' placeholder='Enter City' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='State:' type='input' onChange={this.handleInput} value={this.state.newCompany.state} name='state' id='state' placeholder='Enter State' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Country:' onChange={this.handleInput} value={this.state.newCompany.country} name='country' id='country' type='input' placeholder='Enter Country' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Telephone No:' onChange={this.handleInput} value={this.state.newCompany.tele} name='tele' id='tele' type='input' placeholder='Enter Telephone Number' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Fax:' onChange={this.handleInput} value={this.state.newCompany.fax} name='fax' id='fax' type='input' placeholder='Enter Fax Number' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Mobile No.:' onChange={this.handleInput} value={this.state.newCompany.mobileNo} name='mobileNo' id='mobileNo' type='input' placeholder='Enter Mobile Number' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Email:' onChange={this.handleInput} value={this.state.newCompany.email} name='email' id='email' type='email' placeholder='Enter Email' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Website:' onChange={this.handleInput} value={this.state.newCompany.website} name='website' id='website' type='input' placeholder='Enter Website' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='GSTN:' onChange={this.handleInput} value={this.state.newCompany.gstn} name='gstn' id='gstn' type='input' placeholder='Enter GSTN' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Browse Logo:' accept="image/*" onChange={this.handleInput} value={this.state.newCompany.logo} name='logo' id='logo' type='file' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Manufacturer of:' onChange={this.handleInput} value={this.state.newCompany.manufacturerOf} name='manufacturerOf' id='manufacturerOf' type='input' placeholder='Enter Manufacturer of' />
						</Col>
					</Row>
				</Form>
			</Modal>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (newCompany) => dispatch(registerCompany(newCompany))
	};
};

export default connect(null, mapDispatchToProps)(Registration);