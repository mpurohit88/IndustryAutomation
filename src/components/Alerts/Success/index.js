import React                   from 'react'
import PropTypes               from 'prop-types'
import { Alert } from 'react-bootstrap'

/* component styles */
import { styles } from './styles.scss'

const Success = (props) => {
  return (
    <Alert key={props.idx} variant='success'>
        {props.children}
    </Alert>
  )
}

export default Success
