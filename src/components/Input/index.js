import React                   from 'react'
import PropTypes               from 'prop-types'
import { Form } from 'react-bootstrap';

/* component styles */
import { styles } from './styles.scss'

const Input = (props) => {
  const { color, children } = props
  return (
    <Form.Group controlId="formBasicEmail">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control type={props.type} placeholder={props.placeholder} />
        <Form.Text className="text-muted">
        	{props.hint}
        </Form.Text>
    </Form.Group>
  )
}

// Input.propTypes = {
//   children: PropTypes.node.isRequired,
//   color: PropTypes.string
// }

Input.defaultProps = {
  color: 'primary'
}

export default Input
