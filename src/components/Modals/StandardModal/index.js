import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { Modal } from 'react-bootstrap';

import { styles }             from './styles.scss'
import Button from '../../Button'

class StandardModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: true
    }
  }

  handleClose=() => {
    const { actions, modalKey, onClose } = this.props
    actions.ui.closeModal({ modalKey })
    if (onClose) { onClose() }
  }

  render() {
    const {
      children,
      cssModule,
      modalKey,
      modalState,
      title,
      ...other
    } = this.props
    const { open } = this.state
    const mergedStyles = `${styles} ${cssModule}`

    return (
      <div>
        <Modal
          size="lg"
          show={this.props.show}
          onHide={() => this.props.handleModelClick(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Create Quote
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="button"
              onClick={() => this.setState({ lgScShow: true, lgShow: false })}
              >
              Create Quote
            </Button>
            <Button variant="secondary" type="button" 
              style={{
                marginLeft: 30
              }}
              onClick={() => this.props.handleModelClick(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

StandardModal.propTypes = {

}

StandardModal.defaultProps = {
  cssModule: '',
  onClose: null,
  title: ''
}

export default StandardModal
