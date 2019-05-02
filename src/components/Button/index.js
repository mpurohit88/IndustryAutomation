import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button as STButton } from 'react-bootstrap'

/* component styles */
import { styles } from './styles.scss'

const Button = (props) => {
  const { color, children, className } = props
  return (
    <Fragment>
      <STButton id={props.id} className={`margin ${className}`} variant={props.variant} color={color} onClick={props.onClick} disabled={props.isDisabled || false}>
        {children}
      </STButton>
    </Fragment>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string
}

Button.defaultProps = {
  color: 'primary'
}

export default Button
