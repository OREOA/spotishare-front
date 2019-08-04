import React, { useContext, useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import classNames from 'classnames'
import SpotishareContext from '../../spotishareContext'
import Navbar from '../Navbar'
import CurrentSong from './CurrentSong'
import Progress from './Progress'
import Queue from './Queue'
import Search from './Search'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import styles from './session.module.scss'
import { getCurrent } from '../../services/songApi'
import { getSession } from '../../services/sessionApi'

const ONE_SECOND = 1000

const Session: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
    let interval: NodeJS.Timeout
    const { current, setCurrent, session, setSession } = useContext(SpotishareContext)
    const [searchOpen, setSearchOpen] = useState(false)

    const onOpen = () => setSearchOpen(true)
    const onClose = () => setSearchOpen(false)

    const initCalls = () => {
        clearInterval(interval)
        const call = () => {
            if (session) {
                getCurrent(session.hash)
                    .then(setCurrent)
            }
        }
        interval = setInterval(call, ONE_SECOND)
        call()
    }

    useEffect(() => {
        if (session && session.hash) {
            initCalls()
        }
    }, [session])

    useEffect(() => {
        const { id } = match.params
        if (id && id !== (session && session.hash)) {
            getSession(match.params.id)
                .then(({ data }) => setSession(data))
        }
    }, [match])

    useEffect(() => () => clearInterval(interval), [])

    return (
        <React.Fragment>
            <div className={classNames(styles.sessionContainer, {
                [styles.searchOpen]: searchOpen
            })}>
                <Navbar
                    backButtonPath={!searchOpen ? '/' : undefined}
                    onBackButtonClick={searchOpen ? () => setSearchOpen(false) : undefined}
                />
                <Container className={styles.contentContainer}>
                    <h1>Now playing</h1>
                    {current && current.song && (
                        <React.Fragment>
                            <CurrentSong song={current.song} />
                            <Progress
                                progress={current.progress / current.song.duration_ms}
                                className={styles.progress}
                            />
                            <Queue queue={current.queue} className={styles.queue} />
                        </React.Fragment>
                    )}
                </Container>
                <Container>
                    <Search
                        className={styles.search}
                        isOpen={searchOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                    />
                </Container>
            </div>
        </React.Fragment>
    )
}

export default withRouter(Session)
