import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import Modal from '../Modals/StandardModal'
import Create from '../../containers/Quote/Create'
import { Registration as ConpanyRegistration } from '../../containers/Company'
import { Registration as UserRegistration } from '../../containers/User'
import { Add as AddProduct } from '../../containers/Product'
import { Add as AddCustomer } from '../../containers/Customer'
import { Add as AddCurrency } from '../../containers/Currency'
import Template from '../../containers/Template'

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
      successShow: false,
      customerShow: false,
      currencyShow: false,
      showTemplate: false
    };
  }

  lgClose = () => this.setState({ lgShow: false });

  handleModelClick = (flag) => this.setState({ lgShow: flag });

  handleCompanyRegClick = (flag) => this.setState({ comRegShow: flag });

  handleUserRegClick = (flag) => this.setState({ userRegShow: flag });

  handleProductClick = (flag) => this.setState({ productShow: flag });

  handleCustomerClick = (flag) => this.setState({ customerShow: flag });

  handleCurrencyClick = (flag) => this.setState({ currencyShow: flag });

  handleTemplateClick = (flag) => this.setState({ showTemplate: flag });

  handleSuccessModal = (flag, response) => this.setState({ successShow: flag, msg: response });

  render() {
    const { isAdmin, name, cname, clogo, userName } = this.props;

    return (
      <div className='test'
        style={{
          background: `rebeccapurple`,
          marginBottom: `1.45rem`,
        }}
      >
        <header style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '15px' }}>
            <img style={{ background: 'white', borderRadius: '15%' }} src={clogo ? "/img/company/" + clogo : "/img/logo.png"} height="40" />
            <Link
              to="/"
              className="logo"
            >
              {cname ? cname : this.props.children}
            </Link>
          </div>

          <nav className="nav-collapse" id="navbar">
            <ul>
              {/* active */}
              {!isAdmin && <li className="menu-item"><a style={{ color: 'white', cursor: 'pointer' }} onClick={() => this.setState({ lgShow: true })}>Create Quote</a></li>}
              {isAdmin && <li className="menu-item"><a style={{ color: 'white', cursor: 'pointer' }} onClick={() => this.handleCompanyRegClick(true)}>Company Registration</a></li>}
              {isAdmin && <li className="menu-item"><a style={{ color: 'white', cursor: 'pointer' }} onClick={() => this.handleUserRegClick(true)}>User Registration</a></li>}
              {!isAdmin && <li className="menu-item"><a style={{ color: 'white', cursor: 'pointer' }} onClick={() => this.handleProductClick(true)}>Add Product</a></li>}
              {!isAdmin && <li className="menu-item"><a style={{ color: 'white', cursor: 'pointer' }} onClick={() => this.handleCustomerClick(true)}>Add Customer</a></li>}
              {<li className="menu-item"><a style={{ color: 'white', cursor: 'pointer' }} onClick={() => this.handleCurrencyClick(true)}>Add Currency</a></li>}
              {<li className="menu-item"><a style={{ color: 'white', cursor: 'pointer', width: '138px', padding: '2px' }} onClick={() => this.handleTemplateClick(true)}>Reminder Template</a></li>}
            </ul>
          </nav>
          <div style={{ display: 'flex', width: '326px', padding: '15px' }}>
            <a style={{ color: 'white' }}>
              <span>Hello, {userName && userName.toUpperCase()} !</span>
            </a>
            <Link style={{
              color: `white`,
              textDecoration: `none`,
              paddingLeft: '30px'
            }}
              to="/login" className='imgEdit'>

              <img height='17' src='/img/logout.png' />
              <span id="logout" style={{ paddingLeft: '2px' }}>Logout</span>
            </Link>
          </div>
        </header>

        {
          this.state.comRegShow && <ConpanyRegistration heading='Company Registration' show={this.state.comRegShow} lgClose={() => this.handleCompanyRegClick(false)} handleModelClick={this.handleCompanyRegClick} />
        }

        {
          this.state.userRegShow && <UserRegistration heading='User Registration' show={this.state.userRegShow} lgClose={() => this.handleUserRegClick(false)} handleModelClick={this.handleUserRegClick} />
        }

        {
          this.state.lgShow && <Create heading='Create Quote' show={this.state.lgShow} lgClose={this.lgClose} handleModelClick={this.handleModelClick} handleSuccess={this.handleSuccessModal} />
        }

        {
          this.state.productShow && <AddProduct heading='Add Product' show={this.state.productShow} lgClose={this.handleProductClick} handleModelClick={this.handleProductClick} />
        }

        {
          this.state.customerShow && <AddCustomer heading='Add Customer' show={this.state.customerShow} lgClose={this.handleCustomerClick} handleModelClick={this.handleCustomerClick} />
        }

        {
          this.state.currencyShow && <AddCurrency heading='Add Currency' show={this.state.currencyShow} lgClose={this.handleCurrencyClick} handleModelClick={this.handleCurrencyClick} />
        }

        {
          this.state.showTemplate && <Template heading='Manage Email Template' show={this.state.showTemplate} lgClose={this.handleTemplateClick} handleModelClick={this.handleTemplateClick} />
        }

        <Modal heading='Success' show={this.state.successShow} lgClose={() => this.handleSuccessModal(false)} handleModelClick={this.handleSuccessModal}>
          Quote <a href={`/quote/${this.state.msg && this.state.msg.quote_id}`}>#{this.state.msg && this.state.msg.quote_id}</a> is created successfully.
        </Modal>
      </div>
    )
  }
}

AppBar.propTypes = {
  siteTitle: PropTypes.string,
}

AppBar.defaultProps = {
  siteTitle: ``,
}