import React, { useContext, useState, useEffect, useRef } from 'react'
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
import { getCurrent, nextSong } from '../../services/songApi'
import { getSession } from '../../services/sessionApi'

const ONE_SECOND = 1000

const Session: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
    const intervalRef = useRef<NodeJS.Timeout>()
    const { current, setCurrent, session, setSession, user } = useContext(SpotishareContext)
    const [searchOpen, setSearchOpen] = useState(false)

    const onOpen = (): void => setSearchOpen(true)
    const onClose = (): void => setSearchOpen(false)

    useEffect(() => {
        if (session && session.hash) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            const call = (): void => {
                if (session) {
                    getCurrent(session.hash).then(setCurrent)
                }
            }
            intervalRef.current = setInterval(call, ONE_SECOND)
            call()
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [session, setCurrent])

    useEffect(() => {
        const { id } = match.params
        if (id && id !== (session && session.hash)) {
            getSession(match.params.id).then(session => setSession(session))
        }
    }, [match, session, setSession])

    return (
        <React.Fragment>
            <div
                className={classNames(styles.sessionContainer, {
                    [styles.searchOpen]: searchOpen
                })}
            >
                <Navbar
                    backButtonPath={!searchOpen ? '/' : undefined}
                    onBackButtonClick={searchOpen ? () => setSearchOpen(false) : undefined}
                />
                <Container className={styles.contentContainer}>
                    {current && current.song && (
                        <React.Fragment>
                            <div className={styles.headerContainer}>
                                <h1>Now playing</h1>
                            {session && session.owner && user && (
                                user.id === session.owner.id ||
                                // remove hardcoded admins when (if) admin page implemented
                                user.id === 'mungrits' ||
                                user.id === 'aapzu' ||
                                user.id === 'ihme.'
                                ) && (
                                <button onClick={() => nextSong(session.hash)} className={styles.skipSongButton}>
                                Skip 
                                </button>
                            )}
                            </div>
                            <CurrentSong song={current.song} />
                            <Progress
                                progress={current.progress / current.song.duration_ms}
                                className={styles.progress}
                            />
                            <Queue queue={current.queue} className={styles.queue} />
                        </React.Fragment>
                    ) || (
                        <p>
                            No session active/no music playing.
                            Remember to put any song on from Spotify and turn crossfade off :)
                        </p>
                    )}
                </Container>
                <Container>
                    <Search className={styles.search} isOpen={searchOpen} onOpen={onOpen} onClose={onClose} />
                </Container>
            </div>
        </React.Fragment>
    )
}

export default withRouter(Session)
