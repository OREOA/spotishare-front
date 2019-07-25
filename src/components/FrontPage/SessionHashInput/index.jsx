import React, { useState } from 'react'
import classNames from 'classnames'
import ArrowIcon from '../../../icons/ArrowIcon'

import styles from './sessionHashInput.module.scss'

const SessionHashInput = ({ onSend }) => {
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    onSend(value)
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onFocus = () => setFocus(true)
  const onBlur = () => setFocus(false)

  return (
    <form onSubmit={onSubmit}>
      <div
        className={classNames(styles.sessionHashInput, {
          [styles.focused]: focus || value,
        })}
      >
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          className={styles.input}
        />
        <div className={styles.inputPlaceholder}>
          Session hash
        </div>
        <div
          className={classNames(styles.iconContainer, {
            [styles.disabled]: !value,
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
