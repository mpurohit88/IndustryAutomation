import React                   from 'react'
import PropTypes               from 'prop-types'
import { Form } from 'react-bootstrap';

/* component styles */
import { styles } from './styles.scss'

const Checkbox = (props) => {
  const { color, children } = props
  return (
    <Form.Group controlId="formBasicChecbox">
        <Form.Check type={props.type} label={props.label} />
    </Form.Group>
  )
}

// Checkbox.propTypes = {
//   children: PropTypes.node.isRequired,
//   color: PropTypes.string
// }

Checkbox.defaultProps = {
  color: 'primary'
}

export default Checkbox
