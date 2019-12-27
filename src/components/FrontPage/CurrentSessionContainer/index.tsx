import React from 'react'
import styles from '../currentSessionContainer.module.scss'
import ArrowIcon from '../../../icons/ArrowIcon'
import { Link } from 'react-router-dom'
import { Session } from '../../../types/session'

interface CurrentSessionContainerProps {
    session: Session
}

const CurrentSessionContainer: React.FC<CurrentSessionContainerProps> = ({ session }) => (
    <Link className={styles.currentSession} to={`/session/${session.hash}`}>
        <div className={styles.currentSessionImage}>
            <img
                src={(session.owner.images.length && session.owner.images[0].url) || ''}
                alt={session.owner.display_name}
            />
        </div>
        <div className={styles.currentSessionInfo}>
            <p className={styles.name}>{session.owner.display_name}'s session</p>
            <p className={styles.sessionHash}>{session.hash}</p>
        </div>
        <div className={styles.iconContainer}>
            <button className={styles.button}>
                <ArrowIcon className={styles.icon} />
            </button>
        </div>
    </Link>
)

export default CurrentSessionContainer
