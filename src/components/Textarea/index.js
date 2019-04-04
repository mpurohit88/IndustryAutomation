import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import validation from '../validation'

const Textarea = ({ type, name, value, placeholder, onChange, id, onBlur, label, hint, inputRef, error, accept }) => {

  const [a, ...b] = error && error.split(' ');

  return (
    <Fragment>
      <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control accept={accept} className={b.length > 0 && " red-border"} ref={inputRef} as="textarea" placeholder={placeholder} onChange={onChange} value={value} name={name} onBlur={onBlur} />
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

Textarea.propTypes = {
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

Textarea.defaultProps = {
  color: 'primary'
}

export default validation(Textarea)
