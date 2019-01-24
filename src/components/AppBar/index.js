import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
// import { Modal } from 'react-bootstrap'
import Button from '../Button'
import Modal from '../Modals/StandardModal'
import Create from '../../containers/Quote/Create'

/* component styles */
import { styles } from './styles.scss'

export default class AppBar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lgScShow: false,
      lgShow: false,
    };
  }

  lgClose = () => this.setState({ lgShow: false });
  handleModelClick = (flag) => this.setState({ lgShow: flag });

  render() {
    let lgScClose = () => this.setState({ lgScShow: false });

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
        
      </div>

        <Modal show={this.state.lgShow} lgClose={this.lgClose} handleModelClick={this.handleModelClick}>
          <Create />
        </Modal>

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