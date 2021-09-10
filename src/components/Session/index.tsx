import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import { Col, Container, Row } from 'reactstrap'
import classNames from 'classnames'
import SpotishareContext from '../../spotishareContext'
import Navbar from '../Navbar'
import CurrentSong from './CurrentSong'
import Progress from './Progress'
import Queue from './Queue'
import Search from './Search'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { getCurrent, nextSong } from '../../services/songApi'
import { getSession } from '../../services/sessionApi'

import styles from './session.module.scss'
import Button from '../Button'

const ONE_SECOND = 1000

const Session: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
    const intervalRef = useRef<NodeJS.Timeout>()
    const { current, setCurrent, session, setSession, user } = useContext(SpotishareContext)
    const [searchOpen, setSearchOpen] = useState(false)

    const onOpen = useCallback(() => setSearchOpen(true), [setSearchOpen])
    const onClose = useCallback(() => setSearchOpen(false), [setSearchOpen])

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
                    backButtonPath={!searchOpen ? '/' : match.url}
                    onBackButtonClick={searchOpen ? onClose : undefined}
                />
                <Container className={styles.contentContainer}>
                    {(current && current.song && (
                        <React.Fragment>
                            <div className={styles.headerContainer}>
                                <h1 className={styles.title}>Now playing</h1>
                                {session &&
                                    session.owner &&
                                    user &&
                                    (user.id === session.owner.id ||
                                        // remove hardcoded admins when (if) admin page implemented
                                        user.id === 'mungrits' ||
                                        user.id === 'aapzu' ||
                                        user.id === 'ihme.') && (
                                        <Button style="purple" onClick={() => nextSong(session.hash)}>
                                            Skip
                                        </Button>
                                    )}
                            </div>
                            <CurrentSong song={current.song} />
                            <Row>
                                <Col xs={12}>
                                    <Progress
                                        progress={current.song && current.progress / current.song.duration_ms}
                                        className={styles.progress}
                                    />
                                </Col>
                            </Row>
                            <Queue queue={current.queue} className={styles.queue} />
                        </React.Fragment>
                    )) || (
                        <p>
                            No session active/no music playing. Remember to put any song on from Spotify and turn
                            crossfade off :)
                        </p>
                    )}
                </Container>
                <Search className={styles.search} isOpen={searchOpen} onOpen={onOpen} onClose={onClose} />
            </div>
        </React.Fragment>
    )
}

export default withRouter(Session)
