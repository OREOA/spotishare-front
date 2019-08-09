import React, { useState } from 'react'
import classNames from 'classnames'
import ArrowIcon from '../../../icons/ArrowIcon'

import styles from './sessionHashInput.module.scss'

interface SessionHashInputProps {
    onSend: (hash: string) => void
}

const SessionHashInput: React.FC<SessionHashInputProps> = ({ onSend }) => {
    const [value, setValue] = useState('')
    const [focus, setFocus] = useState(false)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        onSend(value)
    }

    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setValue(e.currentTarget.value)
    }

    const onFocus = (): void => {
        setFocus(true)
    }

    const onBlur = (): void => {
        setFocus(false)
    }

    return (
        <form onSubmit={onSubmit}>
            <div
                className={classNames(styles.sessionHashInput, {
                    [styles.focused]: focus || value
                })}
            >
                <input onFocus={onFocus} onBlur={onBlur} value={value} onChange={onChange} className={styles.input} />
                <div className={styles.inputPlaceholder}>Session hash</div>
                <div
                    className={classNames(styles.iconContainer, {
                        [styles.disabled]: !value
                    })}
                >
                    <button className={styles.button} disabled={!value}>
                        <ArrowIcon className={styles.icon} />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SessionHashInput
