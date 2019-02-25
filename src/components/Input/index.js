import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import validation from './validation'

import { styles } from './styles.scss'

const Input = ({ type, name, value, placeholder, onChange, id, onBlur, label, hint, inputRef, error }) => {

	const [a, ...b] = error && error.split(' ');

	return (
		<Fragment>
			<Form.Group controlId={id}>
				<Form.Label>{label}</Form.Label>
				<Form.Control className={b.length > 0 && "red-border"} ref={inputRef} type={type} placeholder={placeholder} onChange={onChange} value={value} name={name} onBlur={onBlur} />
				<Form.Text className="text-muted" >
					{hint}
				</Form.Text>
				{b.length > 0 ?
					<Form.Text className="error" >
						{`${label} ${b.join(' ')}`}
					</Form.Text> : null
				}
			</Form.Group>
		</Fragment>
	)
}

const { string, func, number, oneOfType } = PropTypes;

Input.propTypes = {
	type: string.isRequired,
	name: string.isRequired,
	onChange: func,
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

export default validation(Input)
