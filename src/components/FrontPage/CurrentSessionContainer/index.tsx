import React from 'react'
import styles from '../currentSessionContainer.module.scss'
import ArrowIcon from '../../../icons/ArrowIcon'
import { Link } from 'react-router-dom'
import { Session } from '../../../types/session'

interface CurrentSessionContainerProps {
    session: Session
}

const CurrentSessionContainer: React.FC<CurrentSessionContainerProps> = ({ session }) => {
    return (
        <Link className={styles.currentSession} to={`session/${session.id}`}>
            <div className={styles.currentSessionImage}>
                <img src={session.imageUrl || 'https://i.pravatar.cc/50'} alt={session.user} />
            </div>
            <div className={styles.currentSessionInfo}>
                <p className={styles.name} title={session.name ? session.user : undefined}>
                    {session.name || session.user}
                </p>
                <p className={styles.sessionHash}>{session.id}</p>
            </div>
            <div className={styles.iconContainer}>
                <button className={styles.button}>
                    <ArrowIcon className={styles.icon} />
                </button>
            </div>
        </Link>
    )
}

export default CurrentSessionContainer
