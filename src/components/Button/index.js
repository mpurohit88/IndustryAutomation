import React                   from 'react'
import PropTypes               from 'prop-types'
import { Button as STButton } from 'react-bootstrap'

/* component styles */
import { styles } from './styles.scss'

const Button = (props) => {
  const { color, children } = props
  return (
    <div className={styles}>
      <STButton variant={props.variant} color={color} onClick={props.onClick}>
        {children}
      </STButton>
    </div>
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
