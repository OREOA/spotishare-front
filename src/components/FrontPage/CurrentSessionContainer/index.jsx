import React from 'react'
import styles from '../currentSessionContainer.module.scss'
import ArrowIcon from '../../../icons/ArrowIcon'
import { Link } from 'react-router-dom'

const CurrentSessionContainer = ({ session }) => (
  <Link className={styles.currentSession} to="#">
    <div className={styles.currentSessionImage}>
      <img src={session.imageUrl} />
    </div>
    <div className={styles.currentSessionInfo}>
      <p className={styles.name}>
        {session.name}
      </p>
      <p className={styles.sessionHash}>
        {session.hash}
      </p>
    </div>
    <div className={styles.iconContainer}>
      <button className={styles.button}>
        <ArrowIcon className={styles.icon} />
      </button>
    </div>
  </Link>
)

export default CurrentSessionContainer
