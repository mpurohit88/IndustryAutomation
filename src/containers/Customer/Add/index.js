import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'

import Modal from '../../../components/Modals/StandardModal'
import Input from '../../../components/Input'
import { Success } from '../../../components/Alerts'

import { addCustomer } from '../../../core/api/customer'

// Add Product Component
class Add extends Component {
	constructor(props){
		super(props);

		this.nameInput = React.createRef();

		this.state={
			showSucess: false,
			errors: [],
			newCustomer: {
				name: '',
				address: '',
				contact_person: '',
				tele: '',
				gstn: '',
				email: ''
			}
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.resetSuccess = this.resetSuccess.bind(this);
		this.handleError = this.handleError.bind(this);
	}

	handleError(obj) {
		let error = Object.assign( [], this.state.errors );

		error[obj.id] = obj.isError;

		this.setState({errors: error})
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState( prevState => {
			 return { 
					newCustomer : {
									 ...prevState.newCustomer, [name]: value
									}
			 }
		}, () => console.log(this.state.newCustomer)
		)
	}

	handleSubmit(event){
		event.preventDefault();
		let errorExists = false;

		Object.values(this.state.errors).map((isError) => {
			if(isError) {
				errorExists = true;
			}
		});

		errorExists ? alert("Please fix the errors first") : this.props.register({data: this.state.newCustomer, cb: this.handleReset});
	}

	handleReset() {
		this.setState({
			showSucess: true,
			newCustomer: {
				name: '',
				address: '',
				contact_person: '',
				tele: '',
				gstn: '',
				email: ''
			}
		});

		this.nameInput.current.focus();
	}

	resetSuccess() {
		this.setState({showSucess: false});
	}

  render() {
    return (
			<Modal heading='Add Customer' handleSubmit={this.handleSubmit} show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
				<Form>
				{ this.state.showSucess ? <Success>Customer Added Successfully!</Success> : null }
					<Row className="show-grid">
						<Col xs={4} md={6}>
							<Input label='Firm Name:' handleError={this.handleError} isRequired={true} inputRef={this.nameInput} onBlur={this.resetSuccess} onChange={this.handleInput} value={this.state.newCustomer.name} name='name' id='name' type='input' placeholder='Enter Name Of Product'/>
						</Col>
						<Col xs={4} md={6}>
							<Input label='Address:' handleError={this.handleError} isRequired={true} type='input' onChange={this.handleInput} value={this.state.newCustomer.address} name='address' id='address' placeholder='Enter Addrress'/>
						</Col>
						<Col xs={4} md={6}>
							<Input label='Contact Person:' handleError={this.handleError} isRequired={true} type='input' onChange={this.handleInput} value={this.state.newCustomer.contact_person} name='contact_person' id='contact_person' placeholder='Enter Contact Person'/>
						</Col>
						<Col xs={4} md={6}>
							<Input label='Telephone Number:' handleError={this.handleError} isRequired={true} type='input' onChange={this.handleInput} value={this.state.newCustomer.tele} name='tele' id='tele' placeholder='Enter Telephone Number'/>
						</Col>
						<Col xs={4} md={6}>
							<Input label='GSTN:' handleError={this.handleError} isRequired={true} onChange={this.handleInput} value={this.state.newCustomer.gstn} name='gstn' id='gstn' type='input' placeholder='Enter GSTN'/>
						</Col>
            <Col xs={4} md={6}>
							<Input label='Email:' handleError={this.handleError} isRequired={true} onChange={this.handleInput} value={this.state.newCustomer.email} name='email' id='email' type='email' placeholder='Enter Email'/>
						</Col>
					</Row>
				</Form>  
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (newCustomer) => dispatch(addCustomer(newCustomer))
	};
};

export default connect(null, mapDispatchToProps)(Add);