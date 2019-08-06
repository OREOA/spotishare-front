import React, { useContext } from 'react'
import classNames from 'classnames'
import { Container } from 'reactstrap'
import Navbar from '../Navbar'
import SessionHashInput from './SessionHashInput'

import styles from './frontPage.module.scss'
import SpotishareContext from '../../spotishareContext'
import { Link } from 'react-router-dom'
import CurrentSessionContainer from './CurrentSessionContainer'

const FrontPage = ({ onNewSession }) => {
    const { session, ownSession } = useContext(SpotishareContext)

    return (
        <React.Fragment>
            <Navbar backButton={false} />
            <Container className={styles.frontPageContainer}>
                <div className={styles.titleContainer}>
                    <h1>Start playing</h1>
                </div>
                <div className={styles.container}>
                    {session && (
                        <div className={styles.section}>
                            <h2 className={styles.title}>Current session</h2>
                            <CurrentSessionContainer session={session} />
                        </div>
                    )}
                    <div className={styles.section}>
                        <h2 className={styles.title}>Join a session</h2>
                        <SessionHashInput />
                    </div>
                    <div className={classNames(styles.section, styles.newSessionButtonContainer)}>
                        {ownSession && ownSession.hash ? (
                            <Link to={`/session/${ownSession.hash}`} className={styles.newSessionButton}>
                                Open my session
                            </Link>
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

export default React.memo(FrontPage)
