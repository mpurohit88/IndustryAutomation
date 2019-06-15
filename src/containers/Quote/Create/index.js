import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Table } from 'react-bootstrap'

import { StandardModal } from '../../../components/Modals'
import Input from '../../../components/Input'
import Dropdown from '../../../components/Dropdown'
import { Success, Info } from '../../../components/Alerts'

import { createQuote } from '../../../core/api/quote'
import { fetchFirmContactList } from '../../../core/api/customer'
import { getCurrencyType } from '../../../core/api/currencyType'

import Zoom from './Zoom'

/* component styles */
import { styles } from './styles.scss'

const INITIAL_STATE = {
	newQuote: {
		party_name: '',
		address: '',
		phoneNo: '',
		mobileNo: '',
		contact_person: '',
		currency_type: ''
	},
};

// Quote Create
class Create extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			showSucess: false,
			newQuote: INITIAL_STATE,
			listOfProduct: [],
			products: [],
			contactList: [],
			currencyList: [],
			currencyHtmlCode: [],
			imgSrc: undefined,
			isEdit: false
		}

		this.handleAddEvent = this.handleAddEvent.bind(this);
		this.handleRowDel = this.handleRowDel.bind(this);

		this.handleReset = this.handleReset.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleProductChange = this.handleProductChange.bind(this);
		this.resetSuccess = this.resetSuccess.bind(this);
		this.getCurrencySymbole = this.getCurrencySymbole.bind(this);
		this.handleRowEdit = this.handleRowEdit.bind(this);
		this.onUpdateProduct = this.onUpdateProduct.bind(this);
		this.reset = this.reset.bind(this);
	}

	componentDidMount() {
		getCurrencyType().then((listOfCurrency) => {
			let currencyList = [];
			let currencyHtmlCode = [];

			listOfCurrency.map(currency => {
				currencyList.push({ text: currency.name, value: currency.id });

				currencyHtmlCode.push({ id: currency.id, code: currency.html_code })
			});

			this.setState({ currencyList: currencyList, currencyHtmlCode: currencyHtmlCode });
		});
	}

	componentWillMount() {
		if (this.props.newQuote) {
			const self = this;
			// let isActive = this.props.newProduct.isActive === 1 ? true : false;
			let newQuoteVar = {};
			// newProductVar.isActive = isActive;
			newQuoteVar.id = this.props.newQuote.id;
			newQuoteVar.party_name = this.props.newQuote.customer_id;
			newQuoteVar.address = this.props.newQuote.address;
			newQuoteVar.phoneNo = this.props.newQuote.phoneNo;
			newQuoteVar.mobileNo = this.props.newQuote.mobileNo;
			newQuoteVar.currency_type = this.props.newQuote.currency_type;
			newQuoteVar.contact_person = this.props.newQuote.contact_person_id;

			let productsVar = [];
			this.props.products.forEach((product) => {
				productsVar.push(product);
			});

			this.setState({ newQuote: newQuoteVar, products: productsVar, isEdit: true }, () => {
				self.handleInput({ target: { value: newQuoteVar.party_name, name: 'party_name' } });
				self.handleInput({ target: { value: newQuoteVar.contact_person, name: 'contact_person' } });
			});
		}
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
				that.refs.unit.value = product.unit;
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

	handleRowEdit(product, index) {
		// let index = -1;
		// const clength = this.state.products.length;
		// for (var i = 0; i < clength; i++) {
		// 	if (i === index) {
		// 		index = i;
		// 		break;
		// 	}
		// }

		const productEdit = this.state.products[index];

		this.refs.name.value = productEdit.product_id;
		this.refs.hsnCode.value = productEdit.hsnCode;
		this.refs.qty.value = productEdit.quantity;
		this.refs.rate.value = productEdit.rate;
		this.refs.gst.value = productEdit.gstn;
		this.refs.imgName.src = productEdit.imgName;
		this.refs.description.value = productEdit.description;
		this.refs.unit.value = productEdit.unit;
		this.refs.imgName.src = `img/product/${productEdit.imgName}`;

		this.setState({ productEdit: productEdit, editIndex: index })
	};

	onUpdateProduct = event => {
		const that = this;

		this.setState(state => {
			const products = state.products.map((item, j) => {
				if (j === that.state.editIndex) {

					return {
						id: that.state.productEdit.product_id,
						name: that.state.productEdit.name,
						product_id: that.state.productEdit.product_id,
						hsnCode: this.refs.hsnCode.value,
						description: this.refs.description.value,
						quantity: this.refs.qty.value,
						rate: this.refs.rate.value,
						gstn: this.refs.gst.value === '' ? 0 : this.refs.gst.value,
						unit: this.refs.unit.value,
						imgName: that.state.productEdit.imgName

					};
				} else {
					return item;
				}
			});

			that.reset();
			return {
				products,
				productEdit: null,
				imgSrc: null
			};
		});
	};

	handleRowDel(product, index) {
		this.setState(state => {
			const products = state.products.filter((product, j) => index !== j);

			return {
				products,
			};
		});
	};

	handleAddEvent() {
		if (this.refs.qty.value && parseInt(this.refs.qty.value) > 0) {

			let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
			// let isExists = false;

			if (this.refs.name.value === '0') {
				alert('Please select product.');
				return false;
			}

			if (this.refs.rate.value === '') {
				alert('Please Enter Rate.');
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
				hsnCode: this.refs.hsnCode.value,
				description: this.refs.description.value,
				quantity: this.refs.qty.value,
				rate: this.refs.rate.value,
				gstn: this.refs.gst.value === '' ? 0 : this.refs.gst.value,
				unit: this.refs.unit.value,
				imgName: this.state.imgSrc
			}

			let productsListTemp = this.state.products;
			productsListTemp.push(product);
			this.setState({ products: productsListTemp });
			this.reset();

		} else {
			alert("Product quantity should be greater then Zero");
			this.refs.qty.focus();
		}
	}

	reset() {
		this.refs.name.value = '0';
		this.refs.hsnCode.value = '';
		this.refs.qty.value = '';
		this.refs.rate.value = '';
		this.refs.gst.value = '';
		this.refs.imgName.src = '';
		this.refs.description.value = '';
		this.refs.unit.value = '';
		document.getElementById('unit').innerText = '';
	}

	handleInput(e) {
		const self = this;

		let value = e.target.value;
		let name = e.target.name;

		if (name === 'party_name') {
			fetchFirmContactList(value).then((contactList) => {
				this.setState({ contactList });

				this.props.partyList.map((data) => {
					if (data.id.toString() === value) {
						self.setState(prevState => {
							return {
								newQuote: { ...prevState.newQuote, ['address']: data.address, ['phoneNo']: data.telephone, [name]: value }
							}
						});
					}
				});
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

		if (isSave && this.state.newQuote.currency_type === '') {
			isSave = false;
			alert('Please select currency type')
		}

		if (isSave) {
			document.getElementById('save_popup').disabled = true;
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
		if (!this.state.isEdit) {

			this.setState({
				isLoading: false,
				showSucess: true,
				newQuote: INITIAL_STATE,
				products: []
			});
		} else {
			this.setState({ showSucess: true, isLoading: false })
		}

		document.getElementById('save_popup').disabled = false;

		// this.props.lgClose(false);
		// this.props.handleSuccess(true, response);
	}

	resetSuccess() {
		this.setState({ showSucess: false });
	}

	getCurrencySymbole(currency) {
		let code;

		this.state.currencyHtmlCode.map((htmlCode) => {
			if (htmlCode.id == currency) {
				code = htmlCode.code;
			}
		});

		return code;
	}

	getRateSybmole = function (currency) {
		switch (currency) {
			case 1:
				return '/-';
			default:
				return ''
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
			let isPathExists = product.imgName.indexOf('img/product') > 1;
			return (
				<tr key={product.id}>
					{/* <td>{index + 1}</td> */}
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.hsnCode}</td>
					<td>{product.quantity}</td>
					<td><span dangerouslySetInnerHTML={{ __html: that.getCurrencySymbole(that.state.newQuote.currency_type) }} /> {product.rate}{that.getRateSybmole(that.state.newQuote.currency_type)} per {product.unit}</td>
					<td>{product.unit}</td>
					<td>{product.gstn}</td>
					<td>{product.imgName ? <Zoom src={isPathExists ? product.imgName : `img/product/${product.imgName}`} /> : that.state.imgSrc && <Zoom src={that.state.imgSrc} />
					}</td>
					<td className='link'>
						<a id='edit_quote' style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => that.handleRowEdit(product, index)}>Edit</a><br />
						<a id='remove_quote' style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => that.handleRowDel(product, index).bind(this)}>Remove</a>
					</td>
				</tr>)
		});

		return (
			<Fragment>
				<StandardModal btnText='Save' heading='Create Quote' id='CreateQuote' isLoading={this.state.isLoading} handleSubmit={this.handleSubmit} isSubmitDisabled={this.props.isNonEditable ? true : false} show={this.props.show} lgClose={this.props.lgClose} handleModelClick={this.props.handleModelClick}>
					<Form>
						{this.state.showSucess ? <Success>Quote {this.state.isEdit ? 'Updated' : 'Created'} Successfully!</Success> : null}
						{this.props.isNonEditable ? <Info>As Quote Email is already sent, Quote Editing is not allowed.</Info> : null}

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
									<th>Unit</th>
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
										<textarea cols='60' type='input' className='form-control' ref="description" />
									</td>
									<td>
										<input type='input' className='form-control' ref="hsnCode" />
									</td>
									<td>
										<input style={{ width: '70px' }} type='input' className='form-control' ref="qty" />
									</td>
									<td>
										<input type='input' className='form-control' ref="rate" /> <span id='unit'>{this.refs.unit && this.refs.unit.value}</span>
									</td>
									<td>
										<input style={{ width: '75px' }} type='input' className='form-control' ref="unit" />
									</td>
									<td>
										<input style={{ width: '62px' }} type='number' className='form-control' ref="gst" />
									</td>
									<td>
										{/* {this.state.imgSrc && <Zoom src = {this.state.imgSrc} />} */}
										<img height="80" name="imgName" ref="imgName" id="imgName" width="100" />
										{/* <figure onMouseMove={this.handleMouseMove} style={this.state}>
											<img ref="imgName" />
										</figure> */}
									</td>
									<td>
										{
											this.state.productEdit ?
												<input type='button' value='Update' onClick={this.onUpdateProduct} />
												:
												<input type='button' value='Add' onClick={this.handleAddEvent} />
										}
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