import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
// import { Modal } from 'react-bootstrap'
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
      productShow: false
    };
  }

  lgClose = () => this.setState({ lgShow: false });

  handleModelClick = (flag) => this.setState({ lgShow: flag });

  handleCompanyRegClick = (flag) => this.setState({ comRegShow: flag });

  handleUserRegClick = (flag) => this.setState({ userRegShow: flag });

  handleProductClick = (flag) => this.setState({ productShow: flag });

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
        
        <ConpanyRegistration heading='Company Registration' show={this.state.comRegShow} lgClose={() => this.handleCompanyRegClick(false)} handleModelClick={this.handleCompanyRegClick}/>

        <UserRegistration heading='User Registration' show={this.state.userRegShow} lgClose={() => this.handleUserRegClick(false)} handleModelClick={this.handleUserRegClick}/>
          
        <Create heading='Create Quote' show={this.state.lgShow} lgClose={this.lgClose} handleModelClick={this.handleModelClick}/>

        <AddProduct heading='Add Product' show={this.state.productShow} lgClose={this.handleProductClick} handleModelClick={this.handleProductClick}/>

        {/* <Modal
          size="lg"
          show={this.state.lgScShow}
          onHide={lgScClose}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Success
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              Quote <Link to='/quote?id=121'>#121</Link> created successfully.
          </Modal.Body>
          <Modal.Footer>
            <Button
            onClick={() => this.setState({ lgScShow: false })} 
            variant="primary" type="button" >
              View Quote
            </Button>
            <Button variant="secondary" type="button" 
            style={{
              marginLeft: 30
            }}
            onClick={() => this.setState({ lgScShow: false })}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal> */}
    </div>
  )}
}

AppBar.propTypes = {
  siteTitle: PropTypes.string,
}

AppBar.defaultProps = {
  siteTitle: ``,
}