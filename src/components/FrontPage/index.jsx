import React, { useContext, useEffect } from 'react'
import classNames from 'classnames'
import { Container } from 'reactstrap'
import Navbar from '../Navbar'
import SessionHashInput from './SessionHashInput'

import styles from './frontPage.module.scss'
import SessionContext from '../../sessionContext'
import { Link } from 'react-router-dom'

const FrontPage = ({ onNewSession }) => {
    const session = useContext(SessionContext)

    return (
        <React.Fragment>
            <Navbar backButton={false} />
            <Container className={styles.frontPageContainer}>
                <div className={styles.titleContainer}>
                    <h1>Start playing</h1>
                </div>
                <div className={styles.container}>
                    {/*{false && (*/}
                    {/*    <div className={styles.section}>*/}
                    {/*        <h2 className={styles.title}>Current session</h2>*/}
                    {/*        <CurrentSessionContainer session={session} />*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    <div className={styles.section}>
                        <h2 className={styles.title}>Join a session</h2>
                        <SessionHashInput />
                    </div>
                    <div className={classNames(styles.section, styles.newSessionButtonContainer)}>
                        {session && session.hash ? (
                            <Link to={`/session/${session.hash}`} className={styles.newSessionButton}>
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

export default FrontPage
