import React, {Fragment}                   from 'react'
import PropTypes               from 'prop-types'
import { Form } from 'react-bootstrap';

/* component styles */
import { styles } from './styles.scss'

const Input = (props) => {
  const { type, onChange, value, placeholder, id, name, onBlur } = props
  return (
		<Fragment>
			<Form.Group controlId={id}>
				<Form.Label>{props.label}</Form.Label>
				<Form.Control type={type} placeholder={placeholder} onChange={onChange} value={value} name={name} onBlur={onBlur}/>
				<Form.Text className="text-muted" >
					{props.hint}
				</Form.Text>
			</Form.Group>
		</Fragment>
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
