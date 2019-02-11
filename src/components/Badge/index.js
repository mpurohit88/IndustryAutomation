import React from 'React'
import { Badge as BadgeRB } from 'react-bootstrap'

/* component styles */
import { styles } from './styles.scss'


export const Badge = ({variant, children}) => {
    return (
        <BadgeRB pill variant={variant} className='st-badge'>{children}</BadgeRB>
    )
}