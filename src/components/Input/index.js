import React, {Fragment}                   from 'react'
import PropTypes               from 'prop-types'
import { Form } from 'react-bootstrap';

const Input = ({type, name, value, placeholder, onChange, id, onBlur, label, hint, inputRef}) => {
  return (
		<Fragment>
			<Form.Group controlId={id}>
				<Form.Label>{label}</Form.Label>
				<Form.Control ref={inputRef} type={type} placeholder={placeholder} onChange={onChange} value={value} name={name} onBlur={onBlur}/>
				<Form.Text className="text-muted" >
					{hint}
				</Form.Text>
			</Form.Group>
		</Fragment>
  )
}

const { string, func, number, oneOfType } = PropTypes;

Input.propTypes = {
	type: string.isRequired,
	name: string.isRequired,
	onChange: func.isRequired,
	onBlur: func,
  placeholder: string,
  value: oneOfType([
    string,
    number
  ])
};

Input.defaultProps = {
  color: 'primary'
}

export default Input
