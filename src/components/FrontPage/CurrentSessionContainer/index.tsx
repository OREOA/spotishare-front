import React, { useMemo } from 'react'
import styles from '../currentSessionContainer.module.scss'
import ArrowIcon from '../../../icons/ArrowIcon'
import { Link } from 'react-router-dom'
import { Session } from '../../../types/session'

interface CurrentSessionContainerProps {
    session: Session
}

const CurrentSessionContainer: React.FC<CurrentSessionContainerProps> = ({ session }) => {
    const imageUrl = useMemo(
        () => session.owner.images && session.owner.images && session.owner.images[0] && session.owner.images[0].url,
        [session]
    )
    const displayName = useMemo(() => session.owner && session.owner.display_name, [session])
    const username = useMemo(() => session.owner && session.owner.id, [session])
    return (
        <Link className={styles.currentSession} to={`session/${session.hash}`}>
            <div className={styles.currentSessionImage}>
                <img src={imageUrl || 'https://i.pravatar.cc/50'} alt={username} />
            </div>
            <div className={styles.currentSessionInfo}>
                <p className={styles.name} title={displayName ? username : undefined}>
                    {displayName || username}
                </p>
                <p className={styles.sessionHash}>{session.hash}</p>
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
