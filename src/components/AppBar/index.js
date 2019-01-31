import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'
import Modal from '../Modals/StandardModal'
import Create from '../../containers/Quote/Create'
import { Registration as ConpanyRegistration } from '../../containers/Company'
import { Registration as UserRegistration } from '../../containers/User'
import { Add as AddProduct } from '../../containers/Product'
import { Add as AddCustomer } from '../../containers/Customer'

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
      customerShow: false
    };
  }

  lgClose = () => this.setState({ lgShow: false });

  handleModelClick = (flag) => this.setState({ lgShow: flag });

  handleCompanyRegClick = (flag) => this.setState({ comRegShow: flag });

  handleUserRegClick = (flag) => this.setState({ userRegShow: flag });

  handleProductClick = (flag) => this.setState({ productShow: flag });

  handleCustomerClick = (flag) => this.setState({ customerShow: flag });

  handleSuccessModal = (flag, response) => this.setState({ successShow: flag, msg: response });

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    let name = user.result;
    let isAdmin = user.role == 'admin';

    return (
    <div className='test'
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <header>
        <Link
          to="/"
          className="logo"
        >
          {this.props.children}
        </Link>
        <nav className="nav-collapse">
          <ul>
            {/* active */}
            { !isAdmin && <li className="menu-item"><a href="#" onClick={() => this.setState({ lgShow: true })}>Create Quote</a></li> }
            { isAdmin && <li className="menu-item"><a href="#" onClick={() => this.handleCompanyRegClick(true)}>Company Registration</a></li> }
            { isAdmin && <li className="menu-item"><a href="#" onClick={() => this.handleUserRegClick(true)}>User Registration</a></li> }
            { !isAdmin && <li className="menu-item"><a href="#" onClick={() => this.handleProductClick(true)}>Add Product</a></li> }
            { !isAdmin && <li className="menu-item"><a href="#" onClick={() => this.handleCustomerClick(true)}>Add Customer</a></li> }
            <li className="menu-item user">
              <a>
                <span>Welcome: {name.toUpperCase()}</span>
              </a>
            </li>
            <li className="menu-item"><Link style={{
                color: `white`,
                textDecoration: `none`,
              }}
              to="/login">Logout</Link></li>
          </ul>
        </nav>
      </header>
        
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
        
        {
          this.state.customerShow && <AddCustomer heading='Add Customer' show={this.state.customerShow} lgClose={this.handleCustomerClick} handleModelClick={this.handleCustomerClick}/>
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