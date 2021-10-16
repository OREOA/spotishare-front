import classNames from 'classnames'
import React from 'react'
import styles from './button.module.scss'

interface NavbarProps {
    color: string
    onClick?: () => void
    disabled?: boolean
}

const Button: React.FC<NavbarProps> = ({ color, onClick, disabled = false, children }) => {
    const className = classNames(styles.btn, styles[color])
    return (
        <button disabled={disabled} className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
