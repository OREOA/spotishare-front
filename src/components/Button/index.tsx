import classNames from 'classnames'
import React from 'react'
import styles from './button.module.scss'

interface NavbarProps {
    color: string
    onClick?: () => void
}

const Button: React.FC<NavbarProps> = ({ color, onClick, children }) => {
    const className = classNames(styles.btn, styles[color])
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
