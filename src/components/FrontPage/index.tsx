import React, { useCallback, useContext } from 'react'
import classNames from 'classnames'
import { Container } from 'reactstrap'
import Navbar from '../Navbar'
import SessionHashInput from './SessionHashInput'
import Button from '../Button'

import styles from './frontPage.module.scss'
import SpotishareContext from '../../spotishareContext'
import CurrentSessionContainer from './CurrentSessionContainer'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Session } from '../../types/session'

interface FrontPageProps extends RouteComponentProps {
    onNewSession: () => void
    loading: boolean
    onDeleteSession: () => void
}

export const FrontPage: React.FC<FrontPageProps> = ({ onNewSession, loading, history, onDeleteSession }) => {
    const { session, ownSession } = useContext(SpotishareContext)

    const onSessionOpen = useCallback(
        (hash: Session['id']) => {
            history.push(`/session/${hash}`)
        },
        [history]
    )

    const onDeleteSessionClick = useCallback(() => {
        // TODO: make better
        if (window.confirm('Really?')) {
            onDeleteSession()
        }
    }, [onDeleteSession])

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
                        {!loading && ownSession && ownSession.id ? (
                            <>
                                <Link to={`/session/${ownSession.id}`}>
                                    <Button color="purple">Open my session</Button>
                                </Link>
                                <Button color="red" onClick={onDeleteSessionClick}>
                                    Delete my session
                                </Button>
                            </>
                        ) : (
                            <Button color="purple" loading={loading} onClick={onNewSession}>
                                Start a new session
                            </Button>
                        )}
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default React.memo(withRouter(FrontPage))
