import React                   from 'react'
import PropTypes               from 'prop-types'
import { Alert } from 'react-bootstrap'

/* component styles */
// import { styles } from './styles.scss'

const Info = (props) => {
  return (
    <Alert key={props.idx} variant='info'>
        {props.children}
    </Alert>
  )
}

export default Info
