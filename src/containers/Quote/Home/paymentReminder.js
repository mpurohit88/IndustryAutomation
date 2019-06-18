import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'

import { getDispatchSummary, sendPaymentReminder } from '../../../core/api/quote'
import { getTermCondition } from '../../../core/api/company'
import { quoteContactDetail } from '../../../core/api/customerContact'

import { StandardModal } from '../../../components/Modals'
import { getPaymentTemplate } from '../../../components/Email'
import Input from '../../../components/Input'

class PaymentReminder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      dispatchSummary: [],
      paymentReminder: {
        companyEmailId: '',
        to: '',
        cc: '',
        bcc: ''
      },
      footerBody: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.lgClose = this.lgClose.bind(this);
  }

  componentDidMount() {
    const that = this;
    let type = this.props.quoteDetails.userEmail.indexOf('export') > -1 ? 4 : 3;

    getTermCondition(type).then((termCondition) => {
      let terms = termCondition ? termCondition.TermCondition ? (termCondition.TermCondition.text && termCondition.TermCondition.text !== '') ? termCondition.TermCondition.text : 'Template is missing' : 'Template is missing' : 'Template is missing';

      that.setState({ footerBody: terms });
    });

    getDispatchSummary(this.props.quote_id).then(result => {
      that.setState({ dispatchSummary: result.dispatchSummary });
    });

    this.setState(prevState => {
      return {
        paymentReminder: {
          ...prevState.paymentReminder, ['companyEmailId']: that.props.quoteDetails.userEmail, ['to']: that.props.quoteDetails.email
        }
      }
    }, () => { }
    );
  }

  handleSubmit() {
    const self = this;

    let body = getPaymentTemplate(this.props.companyId, this.state.dispatchSummary, this.state.footerBody);

    self.setState({ isLoading: true });

    this.props.sendPaymentReminder(self.props.quoteDetails.id, self.props.nextActivityTaskId, self.props.acivityTaskId, this.state.paymentReminder, this.state.products, body, () => {
      self.lgClose();
      self.setState({ isLoading: false });
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
        paymentReminder: {
          ...prevState.paymentReminder, [name]: value
        }
      }
    }, () => { }
    )
  }

  render() {
    return (
      <StandardModal btnText='Send Email' heading='Payment Reminder Email' isLoading={this.state.isLoading} handleSubmit={this.handleSubmit} show={this.props.show} lgClose={this.lgClose} handleModelClick={this.lgClose}>
        <Form>
          <Row className="show-grid">
            <Col xs={4} md={6}>
              <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='From:' onChange={this.handleInput} value={this.state.paymentReminder.companyEmailId} name='companyEmailId' id='companyEmailId' type='email' />
            </Col>
            <Col xs={4} md={6}>
              <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='To:' onChange={this.handleInput} value={this.state.paymentReminder.to} name='to' id='to' type='email' />
            </Col>
            <Col xs={4} md={6}>
              <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='CC:' onChange={this.handleInput} value={this.state.paymentReminder.cc} name='cc' id='cc' type='email' />
            </Col>
            <Col xs={4} md={6}>
              <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='BCC:' onChange={this.handleInput} value={this.state.paymentReminder.bcc} name='bcc' id='bcc' type='email' />
            </Col>
            <Col xs={12} md={12}>
              <hr />
            </Col>
          </Row>
        </Form>
        <div dangerouslySetInnerHTML={{ __html: getPaymentTemplate(this.props.companyId, this.state.dispatchSummary, this.state.footerBody) }} />
      </StandardModal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendPaymentReminder: (quoteId, nextActivityTaskId, acivityTaskId, data, products, body, cb) => dispatch(sendPaymentReminder(quoteId, nextActivityTaskId, acivityTaskId, data, products, body, cb))
  };
};

export default connect(null, mapDispatchToProps)(PaymentReminder);