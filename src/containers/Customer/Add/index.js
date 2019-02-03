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
		this.props.register({data: this.state.newCustomer, cb: this.handleReset});
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
							<Input label='Firm Name:' inputRef={this.nameInput} onBlur={this.resetSuccess} onChange={this.handleInput} value={this.state.newCustomer.name} name='name' id='name' type='input' placeholder='Enter Name Of Product'/>
						</Col>
						<Col xs={4} md={6}>
							<Input label='Address:' type='input' onChange={this.handleInput} value={this.state.newCustomer.address} name='address' id='address' placeholder='Enter Addrress'/>
						</Col>
						<Col xs={4} md={6}>
							<Input label='Contact Person:' type='input' onChange={this.handleInput} value={this.state.newCustomer.contact_person} name='contact_person' id='contact_person' placeholder='Enter Contact Person'/>
						</Col>
						<Col xs={4} md={6}>
							<Input label='Telephone Number:' type='input' onChange={this.handleInput} value={this.state.newCustomer.tele} name='tele' id='tele' placeholder='Enter Telephone Number'/>
						</Col>
						<Col xs={4} md={6}>
							<Input label='GSTN:' onChange={this.handleInput} value={this.state.newCustomer.gstn} name='gstn' id='gstn' type='input' placeholder='Enter GSTN'/>
						</Col>
                        <Col xs={4} md={6}>
							<Input label='Email:' onChange={this.handleInput} value={this.state.newCustomer.email} name='email' id='email' type='input' placeholder='Enter Email'/>
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