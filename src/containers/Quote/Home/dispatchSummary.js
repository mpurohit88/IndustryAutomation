import React, { Component } from 'React'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'

import { StandardModal } from '../../../components/Modals'

import Input from '../../../components/Input'
import { updateDispatchSummary } from '../../../core/api/quote'

class DispatchSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dispatchSummary: {
        party_detail: '',
        order_no: '',
        order_date: '',
        invoice_no: '',
        invoice_date: '',
        builty_no: '',
        up_to: ''
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.lgClose = this.lgClose.bind(this);
  }

  handleSubmit() {
    const self = this;

    this.props.dispatchSummary(self.props.quoteDetails.id, self.props.quoteDetails.customer_id, self.props.acivityTaskId, this.state.dispatchSummary, () => {
      self.lgClose();
    });
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
    let showImageColumn = false;

    if (this.props.products) {
      this.props.products.map((product) => {
        if (product.imgName && product.imgName !== '') {
          showImageColumn = true;
        }
      })
    }

    return (
      <StandardModal btnText='Update Summary' heading='Dispatch Summary' isLoading={false} handleSubmit={this.handleSubmit} show={this.props.show} lgClose={this.lgClose} handleModelClick={this.lgClose}>
        <Form>
          <Row className="show-grid">
            {/* <Col xs={8} md={12}>
              <Dropdown
                id='party_detail'
                name='party_detail'
                label='Party Details'
                value={this.state.dispatchSummary.party_detail}
                onChange={this.handleInput}
                placeholder='--Select Status--'
                options={[{ text: 'Confirmed', value: 100 },
                { text: 'Not Confirmed', value: 101 }
                ]}
              />
            </Col> */}
            <Col xs={8} md={12}>
              <div className="form-group">
                <label>Party Name: <strong>{this.props.quoteDetails.companyName}</strong></label>
              </div>
            </Col>
            <Col xs={8} md={6}>
              <Input label='Purchase Order No:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.order_no} name='order_no' id='order_no' placeholder='Enter Purchase Order Number' />
            </Col>
            <Col xs={8} md={6}>
              <Input label='Purchase Order Date:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.order_date} name='order_date' id='order_date' placeholder='Enter Purchase Order Date' />
            </Col>
            <Col xs={8} md={6}>
              <Input label='Invoice No:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.invoice_no} name='invoice_no' id='invoice_no' placeholder='Enter Purchase Invoice Number' />
            </Col>
            <Col xs={8} md={6}>
              <Input label='Invoice Date:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.invoice_date} name='invoice_date' id='invoice_date' placeholder='Enter Purchase Invoice Date' />
            </Col>
            <Col xs={8} md={6}>
              <Input label='Builty No:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.builty_no} name='builty_no' id='builty_no' placeholder='Enter Purchase Builty Number' />
            </Col>
            <Col xs={8} md={6}>
              <Input label='Up To:' handleError={() => { }} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.dispatchSummary.up_to} name='up_to' id='up_to' placeholder='Enter Up To' />
            </Col>
            <Col xs={8} md={12}>
              <table width="100%" height="100%" cellPadding="0" cellSpacing="0" border="0" align="left" valign="top">
                <tr>
                  <th style={{ border: '1px solid black', padding: '10px' }}>Sr. No.</th>
                  <th style={{ border: '1px solid black', padding: '10px' }}>Particular</th>
                  {showImageColumn && <th style={{ border: '1px solid black', padding: '10px' }}>Image</th>}
                  <th style={{ border: '1px solid black', padding: '10px' }}>HSN code</th>
                  <th style={{ border: '1px solid black', padding: '10px' }}>Qty.</th>
                  <th style={{ border: '1px solid black', padding: '10px' }}>Rate</th>
                  <th style={{ border: '1px solid black', padding: '10px' }}>GST</th>
                </tr>
                {
                  this.props.products.map((product, index) => {
                    return <tr>
                      <td style={{ border: '1px solid black', padding: '10px' }}>
                        {index + 1}
                      </td>
                      <td style={{ border: '1px solid black', padding: '10px' }}>{product.name}</td>
                      {showImageColumn && <td style={{ border: '1px solid black', padding: '10px' }}>
                        <img height="80" id={'img-' + index} src={`/img/product/${product.imgName}`} alt={product.imgName} />
                      </td>}
                      <td style={{ border: '1px solid black', padding: '10px' }}>{product.hsnCode}</td>
                      <td style={{ border: '1px solid black', padding: '10px' }}>{product.quantity}</td>
                      <td style={{ border: '1px solid black', padding: '10px' }}>Rs. {product.rate}/-each</td>
                      <td style={{ border: '1px solid black', padding: '10px' }}>{product.gstn}%</td>
                    </tr>
                  })
                }
              </table>
            </Col>
          </Row>
        </Form>
      </StandardModal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSummary: (quoteId, companyId, acivityTaskId, data, cb) => dispatch(updateDispatchSummary(quoteId, customerId, acivityTaskId, data, cb))
  };
};

export default connect(null, mapDispatchToProps)(DispatchSummary);