import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

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
    const { isAdmin, name, cname } = this.props;

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
          {this.props.children} {cname && `| ${cname}`}
        </Link>
        {
          <nav className="navbar navbar-expand-md navbar-dark fixed-top">
          <a className="navbar-brand" href="#">Carousel</a>
          <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        }
        
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