import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap';

/* component styles */
import { styles } from './styles.scss'

const Dropdown = (props) => {
  const { color, children } = props
  return (
    <Form.Group controlId="formBasicEmail">
      <Form.Label>{props.label}</Form.Label>
      <select className="form-control" onChange={props.onChange} id={props.id} name={props.name} value={props.value || '0'}>
        <option value="0">{props.placeholder}</option>
        {
          props.options.map((data, index) => {
            return <option key={index + `drpdwn`} value={data.value} key={index}>{data.text}</option>
          })
        }
      </select>
    </Form.Group>
  )
}

// Dropdown.propTypes = {
//   children: PropTypes.node.isRequired,
//   color: PropTypes.string
// }

Dropdown.defaultProps = {
  color: 'primary'
}

export default Dropdown
