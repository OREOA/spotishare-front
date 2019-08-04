import React from 'react'
import styles from '../currentSessionContainer.module.scss'
import ArrowIcon from '../../../icons/ArrowIcon'
import { Link } from 'react-router-dom'

const CurrentSessionContainer = ({ session }) => (
    <div className={styles.currentSession}>
        <div className={styles.currentSessionImage}>
            <img src={session.owner && session.owner.images && session.owner.image[0] && session.owner.images[0].url} />
        </div>
        <div className={styles.currentSessionInfo}>
            <p className={styles.name}>
                {session.owner && session.owner.display_name}
            </p>
            <p className={styles.sessionHash}>
                {session.hash}
            </p>
        </div>
        <div className={styles.iconContainer}>
            <Link to={`/session/${session.hash}`} className={styles.button}>
                <ArrowIcon className={styles.icon} />
            </Link>
        </div>
    </div>
)

export default React.memo(CurrentSessionContainer)
