import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Table } from 'react-bootstrap'

import { StandardModal } from '../../../components/Modals'
import Input from '../../../components/Input'
import Dropdown from '../../../components/Dropdown'
import { Success } from '../../../components/Alerts'

import { createQuote } from '../../../core/api/quote'
import { fetchFirmContactList } from '../../../core/api/customer'
import Zoom from './Zoom'

/* component styles */
import { styles } from './styles.scss'

// Quote Create
class Create extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			showSucess: false,
			newQuote: {
				party_name: '',
				address: '',
				phoneNo: '',
				mobileNo: ''
			},
			listOfProduct: [],
			products: [],
			contactList: [],
			currencyList: [{ text: 'Rupee', value: '1' }, { text: 'Dollor', value: '2' }, { text: 'Euro', value: '3' }, { text: 'Yen', value: '4' }],
			imgSrc: undefined
		}

		this.handleAddEvent = this.handleAddEvent.bind(this);
		this.handleRowDel = this.handleRowDel.bind(this);

		this.handleReset = this.handleReset.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleProductChange = this.handleProductChange.bind(this);
		this.resetSuccess = this.resetSuccess.bind(this);
	}

	handleFirmChange(e) {
		fetchFirmContactList(e.currentTarget.id).then((contactList) => {
			this.setState({ contactList })
		});
	}

	handleProductChange(e) {
		const that = this;
		that.setState({ imgSrc: `` });

		that.props.productList.map((product) => {
			if (product.id === parseInt(e.target.value)) {
				that.refs.hsnCode.value = product.hsnCode;
				// that.refs.rate.value = product.unit;
				document.getElementById('unit').innerText = product.unit;
				that.refs.imgName.src = `img/product/${product.imgName}`;
				that.setState({ imgSrc: `img/product/${product.imgName}` });
				// that.refs.description.innerText = product.description;
			}
		});

		this.forceUpdate();

		this.refs.description.focus();
	}

	handleRowDel(product) {
		var index = -1;
		var clength = this.state.products.length;
		for (var i = 0; i < clength; i++) {
			if (this.state.products[i].id === product.id) {
				index = i;
				break;
			}
		}
		this.state.products.splice(index, 1);
		this.setState({ products: this.state.products });
	};

	handleAddEvent() {
		if (this.refs.qty.value && parseInt(this.refs.qty.value) > 0) {

			let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
			// let isExists = false;

			if (this.refs.name.value === '0') {
				alert('Please select product.');
				return false;
			}

			// this.state.products.map((product) => {
			// 	if (product.product_id === this.refs.name.value) {
			// 		isExists = true;
			// 	}
			// });

			// if (isExists) {
			// 	alert('Product already added.');
			// 	return false;
			// }

			this.refs.name[this.refs.name.selectedIndex].text

			var product = {
				id: id,
				name: this.refs.name[this.refs.name.selectedIndex].text,
				product_id: this.refs.name.value,
				hsn: this.refs.hsnCode.value,
				description: this.refs.description.value,
				qty: this.refs.qty.value,
				rate: this.refs.rate.value,
				gst: this.refs.gst.value,
				unit: document.getElementById('unit').innerText,
				imgName: this.state.imgSrc
			}
			this.state.products.push(product);
			this.setState(this.state.products);

			this.refs.name.value = '0';
			this.refs.hsnCode.value = '';
			this.refs.qty.value = '';
			this.refs.rate.value = '';
			this.refs.gst.value = '';
			this.refs.imgName.src = '';
			this.refs.description.value = '';

			document.getElementById('unit').innerText = '';
		} else {
			alert("Product quantity should be greater then Zero");
			this.refs.qty.focus();
		}
	}

	handleInput(e) {
		const self = this;

		let value = e.target.value;
		let name = e.target.name;

		if (name === 'party_name') {
			fetchFirmContactList(e.target.value).then((contactList) => {
				this.setState({ contactList })
			});

			this.props.partyList.map((data) => {
				if (data.id.toString() === value) {
					self.setState(prevState => {
						return {
							newQuote: { ...prevState.newQuote, ['address']: data.address, ['phoneNo']: data.telephone, [name]: value }
						}
					});
				}
			});
		} else if (name === 'contact_person') {
			this.state.contactList.map((data) => {
				if (data.id.toString() === value) {
					self.setState(prevState => {
						return {
							newQuote: { ...prevState.newQuote, ['mobileNo']: data.mobileNo, [name]: value }
						}
					});
				}
			});
		} else {
			this.setState(prevState => {
				return {
					newQuote: {
						...prevState.newQuote, [name]: value
					}
				}
			}, () => { }
			)
		}
	}

	handleSubmit(event) {
		let isSave = true;

		if (document.getElementById('party_name').value <= 0) {
			isSave = false;
			alert('Please select firm first')
		}

		if (isSave && document.getElementById('contact_person').value <= 0) {
			isSave = false;
			alert('Please select contact person')
		}

		if (isSave && this.state.products.length <= 0) {
			isSave = false;
			alert('Please select product')
		}

		if (isSave) {
			event.preventDefault();
			this.setState({ isLoading: true });

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

			this.props.create({
				data: {
					quote: this.state.newQuote,
					productList: this.state.products
				}, cb: this.handleReset, config
			});
		}
	}

	handleReset() {
		this.setState({
			isLoading: false,
			showSucess: true,
			newQuote: {
				party_name: '',
				address: '',
				phoneNo: '',
				mobileNo: ''
			},
			products: []
		})

		// this.props.lgClose(false);
		// this.props.handleSuccess(true, response);
	}

	resetSuccess() {
		this.setState({ showSucess: false });
	}

	getCurrencySymbole(currency) {
		switch (currency) {
			case '1':
				return '&#8377;';
			case '2':
				return '&#36;';
			case '3':
				return '&#8364;';
			case '4':
				return '&#165;';
			default:
				return '&#8377;';
		}
	}

	render() {
		const that = this;
		const { partyList, productList } = that.props;

		let partyDrpDwn = partyList.map((party) => {
			return { text: party.name, value: party.id };
		});

		let productDrpDwn = productList.map((party) => {
			return { text: party.name, value: party.id };
		});

		let contactDrpDwn = this.state.contactList.map((contact) => {
			return { text: contact.name, value: contact.id };
		});

		// let currencyDrpDwn = this.state.currencyList.map((currency) => {
		// 	return { text: currency.name, value: currency.id };
		// });

		let product = this.state.products.map(function (product, index) {
			return (
				<tr key={product.id}>
					{/* <td>{index + 1}</td> */}
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.hsn}</td>
					<td>{product.qty}</td>
					<td><span dangerouslySetInnerHTML={{ __html: that.getCurrencySymbole(that.state.newQuote.currency_type) }} /> {product.rate}/- per {product.unit}</td>
					<td>{product.gst}</td>
					<td>{that.state.imgSrc && <Zoom src={that.state.imgSrc} />
					}</td>
					<td className='link'><a id='remove_quote' href='#' onClick={() => that.handleRowDel(product).bind(this)}>Remove</a></td>
				</tr>)
		});

		return (
			<Fragment>
				<StandardModal btnText='Save' heading='Create Quote' isLoading={this.state.isLoading} handleSubmit={this.handleSubmit} show={this.props.show} lgClose={this.props.lgClose} handleModelClick={this.props.handleModelClick}>
					<Form>
						{this.state.showSucess ? <Success>Quote Created Successfully!</Success> : null}
						<Row className="show-grid">
							<Col xs={8} md={6}>
								<Dropdown
									id='party_name'
									name='party_name'
									label='Firm Name:'
									value={this.state.newQuote.party_name}
									onChange={this.handleInput}
									placeholder='--Select Firm Name--'
									options={partyDrpDwn}
								/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Address:' isRequired={true} onBlur={this.resetSuccess} type='input' onChange={this.handleInput} value={this.state.newQuote.address} name='address' id='address' placeholder='Enter Address' />
							</Col>
							<Col xs={4} md={6}>
								<Input label='Phone no.:' isRequired={true} type='input' onChange={this.handleInput} value={this.state.newQuote.phoneNo} name='phoneNo' id='phoneNo' placeholder='Enter Phone No' />
							</Col>
							<Col xs={6} md={6}>
								<Dropdown
									id='currency_type'
									name='currency_type'
									label='Currency Type:'
									value={this.state.newQuote.currency_type}
									onChange={this.handleInput}
									placeholder='--Select Currency Type--'
									options={this.state.currencyList}
								/>
							</Col>
							<Col xs={8} md={6}>
								<Dropdown
									id='contact_person'
									name='contact_person'
									label='Contact Person:'
									value={this.state.newQuote.contact_person}
									onChange={this.handleInput}
									placeholder='--Select Contact Person--'
									options={contactDrpDwn}
								/>
							</Col>
							<Col xs={4} md={6}>
								<Input label='Mobile no.:' isRequired={true} type='input' onChange={this.handleInput} value={this.state.newQuote.mobileNo} name='mobileNo' id='mobileNo' placeholder='Enter Mobile No' />
							</Col>
						</Row>
						<Table responsive id='productList'>
							<thead>
								<tr>
									{/* <th>#</th> */}
									<th>Name of product/Description/
										particulars
									</th>
									<th>Description</th>
									<th>HSN Code</th>
									<th>Quantity</th>
									<th>Rate With unit</th>
									<th>GST(%)</th>
									<th>Image</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<select className='form-control' id='product' ref="name" onChange={this.handleProductChange} defaultValue='0'>
											<option value='0' disabled>--Select Product--</option>
											{
												productDrpDwn.map((product) => {
													return <option value={product.value}>{product.text}</option>;
												})
											}
										</select>
										{/* <label ref="description"></label> */}
									</td>
									<td>
										<textarea cols='70' type='input' className='form-control' ref="description" />
									</td>
									<td>
										<input type='input' className='form-control' ref="hsnCode" />
									</td>
									<td>
										<input type='input' className='form-control' ref="qty" />
									</td>
									<td>
										<input type='input' className='form-control' ref="rate" /> <span id='unit'></span>
									</td>
									<td>
										<input type='input' className='form-control' ref="gst" />
									</td>
									<td>
										{/* {this.state.imgSrc && <Zoom src = {this.state.imgSrc} />} */}
										<img height="80" name="imgName" ref="imgName" id="imgName" width="100" />
										{/* <figure onMouseMove={this.handleMouseMove} style={this.state}>
											<img ref="imgName" />
										</figure> */}
									</td>
									<td>
										<input type='button' value='Add' onClick={this.handleAddEvent} />
									</td>
								</tr>
								{product}
							</tbody>
						</Table>
						{/* <Checkbox type="checkbox" label="Check me out" /> */}
					</Form>
				</StandardModal>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		quoteList: state.quote.list,
		partyList: state.customer.list,
		productList: state.product.list,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		create: (newQuote) => dispatch(createQuote(newQuote))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);