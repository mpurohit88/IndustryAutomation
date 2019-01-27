import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-bootstrap';

import Button from '../Button'
import Modal from '../Modals/StandardModal'
import Create from '../../containers/Quote/Create'
import { Registration as ConpanyRegistration } from '../../containers/Company'
import { Registration as UserRegistration } from '../../containers/User'
import { Add as AddProduct } from '../../containers/Product'

/* component styles */
import { styles } from './styles.scss'

export default class AppBar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lgScShow: false,
      lgShow: false,
      comRegShow: false,
      userRegShow: false,
      productShow: false,
      successShow: false
    };
  }

  lgClose = () => this.setState({ lgShow: false });

  handleModelClick = (flag) => this.setState({ lgShow: flag });

  handleCompanyRegClick = (flag) => this.setState({ comRegShow: flag });

  handleUserRegClick = (flag) => this.setState({ userRegShow: flag });

  handleProductClick = (flag) => this.setState({ productShow: flag });

  handleSuccessModal = (flag, response) => this.setState({ successShow: flag, msg: response });

  render() {
    return (
    <div className='test'
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1300,
          padding: `1.45rem 1.0875rem`,
          display: `flex`,
          alignItems: `baseline`,
          flex: `0 auto`,
          flexDirection: `row`
        }}
      >
      <div 
       style={{
        minWidth: 1000,
        display: `flex`,
        flex: `0 1 auto`,
        flexDirection: `row`,
        alignItems: `stretch`
      }}
      >
        <h2 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {this.props.children}
          </Link>
        </h2>
        <Button
          style={{
            marginLeft: 40,
            color: `white`
          }}
          onClick={() => this.setState({ lgShow: true })}
          variant='primary'
        >
          Create Quote
        </Button>
        <Button
          style={{
            marginLeft: 40,
            color: `white`
          }}
          onClick={() => this.handleCompanyRegClick(true)}
          variant='primary'
        >
          Company Registration
        </Button>
        <Button
          style={{
            marginLeft: 40,
            color: `white`
          }}
          onClick={() => this.handleUserRegClick(true)}
          variant='primary'
        >
          User Registration
        </Button>
        <Button
          style={{
            marginLeft: 40,
            color: `white`
          }}
          onClick={() => this.handleProductClick(true)}
          variant='primary'
        >
          Add Product
        </Button>
        </div>
        <div>
        <Link style={{
              color: `white`,
              textDecoration: `none`,
            }}
            to="/login">Logout</Link>
        </div>
        {/* <Link to="/admin">admin</Link>
        <Link to="/user">user</Link>
        <Link to="/test">test</Link> */}

      </div>
        
        {
          this.state.comRegShow && <ConpanyRegistration heading='Company Registration' show={this.state.comRegShow} lgClose={() => this.handleCompanyRegClick(false)} handleModelClick={this.handleCompanyRegClick}/>
        }

        {
          this.state.userRegShow && <UserRegistration heading='User Registration' show={this.state.userRegShow} lgClose={() => this.handleUserRegClick(false)} handleModelClick={this.handleUserRegClick}/>
        }

        {
          this.state.lgShow && <Create heading='Create Quote' show={this.state.lgShow} lgClose={this.lgClose} handleModelClick={this.handleModelClick} handleSuccess={this.handleSuccessModal}/>
        }

        {
          this.state.productShow && <AddProduct heading='Add Product' show={this.state.productShow} lgClose={this.handleProductClick} handleModelClick={this.handleProductClick}/>
        }

        <Modal heading='Success' show={this.state.successShow} lgClose={() => this.handleSuccessModal(false)} handleModelClick={this.handleSuccessModal}>
          Quote <a href={`/quote/${this.state.msg && this.state.msg.quote_id}`}>#{this.state.msg && this.state.msg.quote_id}</a> is created successfully.
        </Modal>
    </div>
  )}
}

AppBar.propTypes = {
  siteTitle: PropTypes.string,
}

AppBar.defaultProps = {
  siteTitle: ``,
}