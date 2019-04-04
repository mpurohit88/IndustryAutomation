import React, { Component } from 'React'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'

import { StandardModal } from '../../../components/Modals'

import Dropdown from '../../../components/Dropdown'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import { getById } from '../../../core/api/company'
import { updateStatus } from '../../../core/api/quote'

class CloseQuote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      closeQuote: {
        quote_status: '',
        comment: '',
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.lgClose = this.lgClose.bind(this);
  }

  handleSubmit() {
    const self = this;

    this.props.closeQuote(self.props.quoteDetails.id, this.state.closeQuote.quote_status, () => {
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
        closeQuote: {
          ...prevState.closeQuote, [name]: value
        }
      }
    }, () => console.log(this.state.closeQuote)
    )
  }

  render() {
    return (
      <StandardModal btnText='Close' heading='Close Quote' isLoading={false} handleSubmit={this.handleSubmit} show={this.props.show} lgClose={this.lgClose} handleModelClick={this.lgClose}>
        <Form>
          <Row className="show-grid">
            <Col xs={8} md={12}>
              <Dropdown
                id='quote_status'
                name='quote_status'
                label='Status'
                value={this.state.closeQuote.quote_status}
                onChange={this.handleInput}
                placeholder='--Select Status--'
                options={[{ text: 'Confirmed', value: 100 },
                { text: 'Not Confirmed', value: 101 }
                ]}
              />
            </Col>
            <Col xs={8} md={12}>
              <Textarea label='Comment:' handleError={() => { }} onBlur={() => { }} type='textarea' onChange={this.handleInput} value={this.state.closeQuote.comment} name='comment' id='comment' placeholder='Enter Closing Comment' />
            </Col>
          </Row>
        </Form>
      </StandardModal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeQuote: (quoteId, status, cb) => dispatch(updateStatus(quoteId, status, cb))
  };
};

export default connect(null, mapDispatchToProps)(CloseQuote);
