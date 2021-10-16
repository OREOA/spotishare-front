import classNames from 'classnames'
import React from 'react'
import styles from './button.module.scss'
import ScaleLoader from 'react-spinners/ScaleLoader'

interface NavbarProps {
    color: string
    onClick?: () => void
    disabled?: boolean
    loading?: boolean
}

const Button: React.FC<NavbarProps> = ({ color, onClick, disabled = false, loading = false, children }) => {
    const className = classNames(styles.btn, styles[color])
    const hiddenClassName = classNames(styles.hidden, styles[color])
    return loading ? (
        <div className={className}>
            <span className={styles.loader}>
                <ScaleLoader color="#ffffff" height={20} />
            </span>
            <span className={hiddenClassName}>{children}</span>
        </div>
    ) : (
        <button disabled={disabled} className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
