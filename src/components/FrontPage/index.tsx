import React, { useContext } from 'react'
import classNames from 'classnames'
import { Container } from 'reactstrap'
import Navbar from '../Navbar'
import SessionHashInput from './SessionHashInput'

import styles from './frontPage.module.scss'
import SpotishareContext from '../../spotishareContext'
import CurrentSessionContainer from './CurrentSessionContainer'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Session } from '../../types/session'

type FrontPageProps = {
    onNewSession: () => void
    onDeleteSession: () => void
} & RouteComponentProps

export const FrontPage: React.FC<FrontPageProps> = ({ onNewSession, history, onDeleteSession }) => {
    const { session, ownSession } = useContext(SpotishareContext)

    const onSessionOpen = (hash: Session['hash']): void => {
        history.push(`/session/${hash}`)
    }

    return (
        <React.Fragment>
            <Navbar backButton={false} />
            <Container>
                <div className={styles.titleContainer}>
                    <h1>Start playing</h1>
                </div>
                <div>
                    {session && (
                        <div className={styles.section}>
                            <h2 className={styles.title}>Current session</h2>
                            <CurrentSessionContainer session={session} />
                        </div>
                    )}
                    <div className={styles.section}>
                        <h2 className={styles.title}>Join a session</h2>
                        <SessionHashInput onSend={onSessionOpen} />
                    </div>
                    <div className={classNames(styles.section, styles.newSessionButtonContainer)}>
                        {ownSession && ownSession.hash ? (
                            <>
                                <Link to={`/session/${ownSession.hash}`} className={styles.newSessionButton}>
                                    Open my session
                                </Link>
                                <button className={styles.deleteSessionButton} onClick={onDeleteSession}>
                                    Delete my session
                                </button>
                            </>
                        ) : (
                            <button className={styles.newSessionButton} onClick={onNewSession}>
                                Start a new session
                            </button>
                        )}
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default React.memo(withRouter(FrontPage))