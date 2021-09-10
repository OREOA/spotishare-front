import classNames from 'classnames'
import React from 'react'
import styles from './button.module.scss'

interface NavbarProps {
    style: string
    onClick?: () => void
}

const Button: React.FC<NavbarProps> = ({ style, onClick, children }) => {
    const className = classNames(styles.btn, styles[style])
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button