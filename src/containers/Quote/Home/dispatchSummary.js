import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'

import { StandardModal } from '../../../components/Modals'
import { getDispatchTemplate } from '../../../components/Email'
import { getTermCondition } from '../../../core/api/company'

import Input from '../../../components/Input'
import { updateDispatchSummary } from '../../../core/api/quote'
import { getTodaysDate } from '../../../utils/dates'
import { quoteContactDetail } from '../../../core/api/customerContact'

class DispatchSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      constactPerson: undefined,
      dispatchSummary: {
        companyEmailId: '',
        to: '',
        cc: '',
        bcc: '',
        order_no: '',
        invoice_no: '',
        invoice_date: '',
        transporter_name: '',
        bilty_no: '',
        up_to: '',
        amount: ''
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.lgClose = this.lgClose.bind(this);

    this.handleAddEvent = this.handleAddEvent.bind(this);
  }

  componentDidMount() {
    const that = this;

    let type = this.props.quoteDetails.userEmail.indexOf('export') > -1 ? 4 : 3;

    getTermCondition(type).then((termCondition) => {
      let terms = termCondition ? termCondition.TermCondition ? (termCondition.TermCondition.text && termCondition.TermCondition.text !== '') ? termCondition.TermCondition.text : 'Template is missing' : 'Template is missing' : 'Template is missing';

      that.setState({ footerBody: terms });
    });

    quoteContactDetail(this.props.quoteDetails.contact_person_id).then((result) => {
      this.setState(prevState => {
        return {
          constactPerson: result,
          dispatchSummary: {
            ...prevState.dispatchSummary, ['companyEmailId']: that.props.quoteDetails.userEmail, ['to']: that.props.quoteDetails.email
          }
        }
      }, () => { }
      );
    });

    document.getElementById('order_no').focus();
  }

  reset() {
    this.refs.qty.value = '';
    this.refs.description.value = '';
    this.refs.unit.value = '';

    this.refs.description.focus();
  }

  handleAddEvent() {
    if (this.refs.qty.value && parseInt(this.refs.qty.value) > 0) {

      let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      // let isExists = false;

      var product = {
        id: id,
        product_id: this.refs.productId.value,
        description: this.refs.description.value,
        qty: this.refs.qty.value,
        unit: this.refs.unit.value
      }

      let productsListTemp = this.state.products;
      productsListTemp.push(product);
      this.setState({ products: productsListTemp });
      this.reset();

    } else {
      alert("Product quantity should be greater then Zero");
      this.refs.description.focus();
    }
  }

  handleRowDel(index) {
    this.setState(state => {
      const products = state.products.filter((product, j) => index !== j);

      return {
        products,
      };
    });
  };

  handleSubmit() {
    if (this.state.products.length === 0) {
      alert('Please add product.')
    } else {
      const self = this;

      const productBody = this.state.products.map(function (product, index) {
        return (
          <tr key={product.id}>
            <td>{product.description}</td>
            <td>{product.qty}</td>
            <td>{product.unit}</td>
            {(index === 0) && <td rowspan={self.state.products.length}>{self.state.dispatchSummary.amount}</td>}
            {(index === 0) && <td rowspan={self.state.products.length}>{self.props.quoteDetails.companyName}</td>}
          </tr>)
      });

      let body = getDispatchTemplate(this.props.quoteDetails.companyId, productBody, this.props.quoteDetails, this.state.constactPerson[0], this.props.quoteDetails.companyId === 1 ? <div dangerouslySetInnerHTML={{ __html: 'Belt Size and Specification.<br/>As per IS 1891(1994 Latest)<br/>MAKE – SOMIFLEX' }} /> : 'Particular', this.state.currencyHtmlCode, this.state.dispatchSummary, this.state.footerBody);

      body = body.replace('<input type="text" id="refId" name="refId"/>', document.getElementById('refId').value)

      self.setState({ isLoading: true });

      this.props.dispatchSummary(self.props.quoteDetails.id, self.props.quoteDetails.customer_id, self.props.acivityTaskId, this.state.dispatchSummary, this.state.products, body, () => {
        self.lgClose();
        self.setState({ isLoading: false });
      });
    }
  }

  lgClose() {
    this.props.lgClose(false);
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;

    this.setState(prevState => {
      return {
        dispatchSummary: {
          ...prevState.dispatchSummary, [name]: value
        }
      }
    }, () => { }
    )
  }

  render() {
    const that = this;
    let showImageColumn = false;
    const constactPerson = this.state.constactPerson ? this.state.constactPerson[0] : {};
    const { productList } = that.props;

    let productDrpDwn = productList.map((party) => {
      return { text: party.name, value: party.id };
    });

    if (this.props.products) {
      this.props.products.map((product) => {
        if (product.imgName && product.imgName !== '') {
          showImageColumn = true;
        }
      })
    }

    let product = this.state.products.map(function (product, index) {
      return (
        <tr key={product.id}>
          <td>{product.description}</td>
          <td>{product.qty}</td>
          <td>{product.unit}</td>
          {(index === 0) && <td rowSpan={that.state.products.length}>{that.state.dispatchSummary.amount}</td>}
          {(index === 0) && <td rowSpan={that.state.products.length}>{that.props.quoteDetails.companyName}</td>}
          <td className='link'>
            {/* <a id='edit_quote' style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => that.handleRowEdit(product, index)}>Edit</a><br />
            <a id='remove_quote' style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => that.handleRowDel(product, index).bind(this)}>Remove</a> */}
            <a id='remove_product' style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => that.handleRowDel(index).bind(this)}>Remove</a>
          </td>
        </tr>)
    });

    const productBody = this.state.products.map(function (product, index) {
      return (
        <tr key={product.id}>
          <td>{product.description}</td>
          <td>{product.qty}</td>
          <td>{product.unit}</td>
          {(index === 0) && <td rowspan={that.state.products.length}>{that.state.dispatchSummary.amount}</td>}
          {(index === 0) && <td rowspan={that.state.products.length}>{that.props.quoteDetails.companyName}</td>}
        </tr>)
    });

    return (
      <StandardModal btnText='Update Summary' heading='Dispatch Summary' isLoading={this.state.isLoading} handleSubmit={this.handleSubmit} show={this.props.show} lgClose={this.lgClose} handleModelClick={this.lgClose}>
        <Form>
          <Row className="show-grid">
            <Col xs={8} md={12}>
              <div className="form-group">
                <label>Party Name: <strong>{this.props.quoteDetails.companyName}</strong></label>
              </div>
            </Col>
            <Col xs={4} md={6}>
              <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='From:' onChange={this.handleInput} value={this.state.dispatchSummary.companyEmailId} name='companyEmailId' id='companyEmailId' type='email' />
            </Col>
            <Col xs={4} md={6}>
              <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='To:' onChange={this.handleInput} value={this.state.dispatchSummary.to} name='to' id='to' type='email' />
            </Col>
            <Col xs={4} md={6}>
              <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='CC:' onChange={this.handleInput} value={this.state.dispatchSummary.cc} name='cc' id='cc' type='email' />
            </Col>
            <Col xs={4} md={6}>
              <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='BCC:' onChange={this.handleInput} value={this.state.dispatchSummary.bcc} name='bcc' id='bcc' type='email' />
            </Col>
            <Col xs={12} md={12}>
              <strong>Add Invoice Detail</strong>
              <hr />
            </Col>
            <Col xs={8} md={6}>
              <Input label='Purchase Order No And Date:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.order_no} name='order_no' id='order_no' placeholder='Enter Purchase Order Number' />
            </Col>
            {/* <Col xs={8} md={6}>
              <Input label='Purchase Order Date:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.order_date} name='order_date' id='order_date' placeholder='Enter Purchase Order Date' />
            </Col> */}
            <Col xs={8} md={6}>
              <Input label='Invoice No:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.invoice_no} name='invoice_no' id='invoice_no' placeholder='Enter Purchase Invoice Number' />
            </Col>
            <Col xs={8} md={6}>
              <Input label='Invoice Date:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.invoice_date} name='invoice_date' id='invoice_date' placeholder='Enter Purchase Invoice Date' />
            </Col>
            <Col xs={8} md={6}>
              <Input label="Transporter's Name:" handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.transporter_name} name='transporter_name' id='transporter_name' placeholder='Enter Transporter Name' />
            </Col>
            <Col xs={8} md={6}>
              <Input label='Bilty No:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.bilty_no} name='bilty_no' id='bilty_no' placeholder='Enter Purchase Builty Number' />
            </Col>
            <Col xs={8} md={6}>
              <Input label='Up To:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.up_to} name='up_to' id='up_to' placeholder='Enter Up To' />
            </Col>
            <Col xs={8} md={6}>
              <Input label='Amount:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.amount} name='amount' id='amount' placeholder='Enter Amount' />
            </Col>
            <Col xs={12} md={12}>
              <strong>Add Product Detail</strong>
              <hr />
            </Col>
            <Col xs={12} md={12}>
              <table width="100%" height="100%" cellPadding="0" cellSpacing="0" border="1" align="left" valign="top">
                <thead>
                  <tr style={{ background: '#ededed' }}>
                    <th style={{ border: '1px solid black', padding: '10px', width: '250px' }}>PRODUCT</th>
                    <th style={{ border: '1px solid black', padding: '10px', width: '250px' }}>DESCRIPTION</th>
                    <th style={{ border: '1px solid black', padding: '10px', width: '145px' }}>QTY</th>
                    <th style={{ border: '1px solid black', padding: '10px', width: '100px' }}>UNIT</th>
                    <th style={{ border: '1px solid black', padding: '10px', width: '145px' }}>AMOUNT</th>
                    <th style={{ border: '1px solid black', padding: '10px', width: '167px' }}>CUSTOMER'S NAME</th>
                    <th style={{ border: '1px solid black', padding: '10px' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <select className='form-control' id='productId' ref="productId" onChange={this.handleProductChange} defaultValue='0'>
                        <option value='0' disabled>--Select Product--</option>
                        {
                          productDrpDwn.map((product) => {
                            return <option value={product.value}>{product.text}</option>;
                          })
                        }
                      </select>
                    </td>
                    <td>
                      <input type='input' className='form-control' ref='description' />
                    </td>
                    <td>
                      <input type='number' className='form-control' ref='qty' />
                    </td>
                    <td>
                      <input type='input' className='form-control' ref='unit' />
                    </td>
                    <td>
                      <label>
                        {that.state.dispatchSummary.amount}
                      </label>
                    </td>
                    <td>
                      <label>
                        {that.props.quoteDetails.companyName}
                      </label>
                    </td>
                    <td>
                      <input type='button' value='Add' onClick={this.handleAddEvent} />
                    </td>
                  </tr>
                  {product}
                </tbody>
              </table>
            </Col>
          </Row>
        </Form>
        <hr />
        <br />

        {this.state.constactPerson && <div dangerouslySetInnerHTML={{ __html: getDispatchTemplate(this.props.quoteDetails.companyId, productBody, this.props.quoteDetails, constactPerson, this.props.quoteDetails.companyId === 1 ? <div dangerouslySetInnerHTML={{ __html: 'Belt Size and Specification.<br/>As per IS 1891(1994 Latest)<br/>MAKE – SOMIFLEX' }} /> : 'Particular', this.state.currencyHtmlCode, this.state.dispatchSummary, this.state.footerBody) }} />}

      </StandardModal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    productList: state.product.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSummary: (quoteId, customerId, acivityTaskId, data, products, body, cb) => dispatch(updateDispatchSummary(quoteId, customerId, acivityTaskId, data, products, body, cb))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DispatchSummary);