import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap';

import Modal from '../../../components/Modals/StandardModal'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import { Success } from '../../../components/Alerts'

import { addProduct } from '../../../core/api/product'

// Add Product Component
class Add extends Component {
	constructor(props) {
		super(props);

		this.nameInput = React.createRef();

		this.state = {
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
		this.resetSuccess = this.resetSuccess.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;

		this.setState(prevState => {
			return {
				newProduct: {
					...prevState.newProduct, [name]: value
				}
			}
		}, () => console.log(this.state.newProduct)
		)
	}

	handleSubmit(event) {
		event.preventDefault();
		const that = this;

		const config = {
			onUploadProgress: function (progressEvent) {
				var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
				that.setState({
					progress:
						Math.round((progressEvent.loaded * 100) / progressEvent.total)
				})
				console.log(percentCompleted)
			}
		}

		const formData = new FormData();
		formData.append('data', JSON.stringify(this.state.newProduct));
		formData.append('avatar', document.getElementById('img').files[0])

		this.props.register({ formData: formData, cb: this.handleReset, config: config });
	}

	handleReset() {
		this.setState({
			showSucess: true,
			newProduct: {
				name: '',
				description: '',
				unit: '',
				img: '',
				hsnCode: ''
			}
		});

		this.nameInput.current.focus();
	}

	resetSuccess() {
		this.setState({ showSucess: false });
	}

	render() {
		return (
			<Modal btnText='Save' heading='Add Product' handleSubmit={this.handleSubmit} show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
				<Form>
					{this.state.showSucess ? <Success>Product Added Successfully!</Success> : null}
					<Row className="show-grid">
						<Col xs={4} md={6}>
							<Input label='Name Of Product:' validationType='string' min={2} max={50} isRequired={true} inputRef={this.nameInput} onBlur={this.resetSuccess} onChange={this.handleInput} value={this.state.newProduct.name} name='name' id='name' type='input' placeholder='Enter Name Of Product' />
						</Col>
						<Col xs={4} md={6}>
							<Textarea label='Description:' validationType='string' min={2} max={1000} type='input' onChange={this.handleInput} value={this.state.newProduct.description} name='description' id='description' placeholder='Enter Description' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='Name Of Unit:' isRequired={true} type='input' onChange={this.handleInput} value={this.state.newProduct.unit} name='unit' id='unit' placeholder='Enter Unit' />
						</Col>
						<Col xs={4} md={6}>
							<Input type='file' label='Browse Image:' accept="image/*" onChange={this.handleInput} value={this.state.newProduct.img} name='img' id='img' />
						</Col>
						<Col xs={4} md={6}>
							<Input label='HSN Code:' isRequired={true} onChange={this.handleInput} value={this.state.newProduct.hsnCode} name='hsnCode' id='hsnCode' type='input' placeholder='Enter HSN Code' />
						</Col>
					</Row>
				</Form>
			</Modal>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (newProduct) => dispatch(addProduct(newProduct))
	};
};

export default connect(null, mapDispatchToProps)(Add);
