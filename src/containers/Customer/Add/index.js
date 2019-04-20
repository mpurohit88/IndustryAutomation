import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Table } from 'react-bootstrap'

import Modal from '../../../components/Modals/StandardModal'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import { Success } from '../../../components/Alerts'

import { addCustomer } from '../../../core/api/customer'

import { styles } from './styles.scss'

// Add Product Component
class Add extends Component {
	constructor(props) {
		super(props);

		this.nameInput = React.createRef();

		this.state = {
			showSucess: false,
			errors: [],
			newCustomer: {
				name: '',
				address: '',
				contact_person: '',
				telephone: '',
				gstn: '',
				email: ''
			},
			contactPerson: []
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.resetSuccess = this.resetSuccess.bind(this);
		this.handleError = this.handleError.bind(this);

		this.handleAddEvent = this.handleAddEvent.bind(this);
		this.handleRowDel = this.handleRowDel.bind(this);
	}

	componentWillMount() {
		if (this.props.newCustomer) {
			let newContactArr = [];
			this.props.newCustomer.customerContact.forEach((contact) => {
				newContactArr.push(contact);
			})

			this.setState({ newCustomer: this.props.newCustomer, contactPerson: newContactArr, isEdit: true });
		}
	}

	handleAddEvent() {
		let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);

		var person = {
			id: id,
			name: this.refs.name.value,
			designation: this.refs.designation.value,
			department: this.refs.department.value,
			email: this.refs.email.value,
			mobileNo: this.refs.mobileNo.value,
		}
		this.state.contactPerson.push(person);
		this.setState(this.state.contactPerson);

		this.refs.name.value = '';
		this.refs.designation.value = '';
		this.refs.department.value = '';
		this.refs.email.value = '';
		this.refs.mobileNo.value = '';
	}

	handleRowDel(customer) {
		var index = -1;
		var clength = this.state.contactPerson.length;
		for (var i = 0; i < clength; i++) {
			if (this.state.contactPerson[i].id === customer.id) {
				index = i;
				break;
			}
		}

		this.state.contactPerson.splice(index, 1);
		this.setState({ contactPerson: this.state.contactPerson });
	};

	handleError(obj) {
		let error = Object.assign([], this.state.errors);

		error[obj.id] = obj.isError;

		this.setState({ errors: error })
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState(prevState => {
			return {
				newCustomer: {
					...prevState.newCustomer, [name]: value
				}
			}
		}, () => console.log(this.state.newCustomer)
		)
	}

	handleSubmit(event) {
		event.preventDefault();
		let errorExists = false;

		Object.values(this.state.errors).map((isError) => {
			if (isError) {
				errorExists = true;
			}
		});

		errorExists ? alert("Please fix the errors first") : this.props.register({ data: { customer: this.state.newCustomer, contactList: this.state.contactPerson }, cb: this.handleReset });
	}

	handleReset() {
		if (!this.state.isEdit) {
			this.setState({
				showSucess: true,
				newCustomer: {
					name: '',
					address: '',
					contact_person: '',
					telephone: '',
					gstn: '',
					email: ''
				}
			});
		} else {
			this.setState({ showSucess: true })
		}

		this.nameInput.current.focus();
	}

	resetSuccess() {
		this.setState({ showSucess: false });
	}

	render() {
		const that = this;

		let contactPerson = this.state.contactPerson.map(function (person, index) {
			return (
				<tr key={person.id} className='personList'>
					<td>{index + 1}</td>
					<td>{person.name}</td>
					<td>{person.designation}</td>
					<td>{person.department}</td>
					<td>{person.email}</td>
					<td>{person.mobileNo}</td>
					<td className='link'><a id='remove_person' href='#' onClick={() => that.handleRowDel(person)}>Remove</a></td>
				</tr>)
		});

		return (
			<Modal btnText='Save' heading='Add Customer' handleSubmit={this.handleSubmit} show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
				<Form>
					{this.state.showSucess ? <Success>Customer {this.state.isEdit ? 'Updated' : 'Added'} Successfully!</Success> : null}
					<Row className="show-grid">
						<Col xs={4} md={6}>
							<Input label='Firm Name:' handleError={this.handleError} isRequired={true} inputRef={this.nameInput} onBlur={this.resetSuccess} onChange={this.handleInput} value={this.state.newCustomer.name} name='name' id='name' type='input' placeholder='Enter Firm Name' />
						</Col>
						<Col xs={4} md={6}>
							<Textarea label='Address:' handleError={this.handleError} isRequired={true} type='input' onChange={this.handleInput} value={this.state.newCustomer.address} name='address' id='address' placeholder='Enter Addrress' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Telephone Number:' handleError={this.handleError} isRequired={true} type='input' onChange={this.handleInput} value={this.state.newCustomer.telephone} name='telephone' id='telephone' placeholder='Enter Telephone Number' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='GSTN:' handleError={this.handleError} onChange={this.handleInput} value={this.state.newCustomer.gstn} name='gstn' id='gstn' type='input' placeholder='Enter GSTN' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Email:' handleError={this.handleError} isRequired={true} onChange={this.handleInput} value={this.state.newCustomer.email} name='email' id='email' type='email' placeholder='Enter Email' />
						</Col>
					</Row>
					<Table responsive>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Designation</th>
								<th>Department </th>
								<th>Email</th>
								<th>Mobile No.</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td></td>
								<td>
									<input type='input' className='name' ref="name" />
								</td>
								<td>
									<input type='input' className='designation' ref="designation" />
								</td>
								<td>
									<input type='input' className='department' ref="department" />
								</td>
								<td>
									<input type='input' className='email' ref="email" />
								</td>
								<td>
									<input type='input' className='mobileNo' ref="mobileNo" />
								</td>
								<td>
									<input type='button' value='Add' onClick={this.handleAddEvent} />
								</td>
							</tr>
							{contactPerson}
						</tbody>
					</Table>
				</Form>
			</Modal>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (newCustomer) => {
			console.log("Resgister Called....")
			dispatch(addCustomer(newCustomer))
		}
	};
};

export default connect(null, mapDispatchToProps)(Add);