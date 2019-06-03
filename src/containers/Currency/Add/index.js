import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap';

import Modal from '../../../components/Modals/StandardModal'
import Input from '../../../components/Input'
import { Success } from '../../../components/Alerts'

import { addCurrency } from '../../../core/api/currencyType'

// Add Currency Component
class Add extends Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();

    this.state = {
      isEdit: false,
      newCurrency: {
        name: '',
        html_code: '',
        isActive: true
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.resetSuccess = this.resetSuccess.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillMount() {
    if (this.props.newCurrency) {
      let isActive = this.props.newCurrency.isActive === 1 ? true : false;
      let newCurrencyVar = { ...this.props.newCurrency };
      newCurrencyVar.isActive = isActive;
      this.setState({ newCurrency: newCurrencyVar, isEdit: true });
    }
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;

    if (e.target.name === 'isActive') {
      value = e.target.checked
    }

    this.setState(prevState => {
      return {
        newCurrency: {
          ...prevState.newCurrency, [name]: value
        }
      }
    }, () => console.log(this.state.newCurrency)
    )
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.register(this.state.newCurrency);
  }

  handleReset() {
    if (!this.state.isEdit) {
      this.setState({
        showSucess: true,
        newCurrency: {
          name: '',
          html_code: '',
          isActive: true
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
    return (
      <Modal btnText='Save' heading='Add Currency' handleSubmit={this.handleSubmit} show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
        <Form>
          {this.state.showSucess ? <Success>Currency {this.state.isEdit ? 'Updated' : 'Added'}  Successfully!</Success> : null}
          <Row className="show-grid">
            <Col xs={4} md={6}>
              <Input hint='ex: Rupee, Dollar and etc.' label='Name of Currency:' validationType='string' min={1} max={50} isRequired={true} inputRef={this.nameInput} onBlur={this.resetSuccess} onChange={this.handleInput} value={this.state.newCurrency.name} name='name' id='name' type='input' placeholder='Enter Name Of Currency' />
            </Col>
            <Col xs={4} md={6}>
              <Input hint='Html code (it start from & and end with ; (semi column)) to display currency symbol (&#36;) on Email. Click below to get one.' label='HTML Code for Currency:' isRequired={true} min={1} max={10} type='input' onChange={this.handleInput} value={this.state.newCurrency.html_code} name='html_code' id='html_code' placeholder='Enter html_code (ex: &#38;#36;)' />
              <a target="blank" href="https://www.toptal.com/designers/htmlarrows/currency/"> GET HTML CODE</a>
            </Col>
            <Col xs={4} md={6}>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Active" onChange={this.handleInput} checked={this.state.newCurrency.isActive} value={this.state.newCurrency.isActive} name='isActive' id='isActive' />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (newCurrency) => dispatch(addCurrency(newCurrency))
  };
};

export default connect(null, mapDispatchToProps)(Add);
