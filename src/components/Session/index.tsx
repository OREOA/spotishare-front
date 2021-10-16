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
import { getCurrent, nextSong, addRecommendation } from '../../services/songApi'
import { getSession } from '../../services/sessionApi'

import styles from './session.module.scss'
import Button from '../Button'
import TinderCardComponent from './TinderCard/index'

const ONE_SECOND = 1000

const Session: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
    const intervalRef = useRef<NodeJS.Timeout>()
    const { current, setCurrent, session, setSession, user } = useContext(SpotishareContext)
    const [searchOpen, setSearchOpen] = useState(false)
    const [tinderOpen, setTinderOpen] = useState(false)

    const onOpen = useCallback(() => setSearchOpen(true), [setSearchOpen])
    const onClose = useCallback(() => setSearchOpen(false), [setSearchOpen])
    const onTinderOpen = useCallback(() => setTinderOpen(true), [setTinderOpen])
    const onTinderClose = useCallback(() => setTinderOpen(false), [setTinderOpen])

    useEffect(() => {
        if (session && session.id) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            const call = (): void => {
                if (session) {
                    getCurrent(session.id).then(setCurrent)
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
        if (id && id !== (session && session.id)) {
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
                    backButtonPath={searchOpen || tinderOpen ? match.url : '/'}
                    onBackButtonClick={searchOpen ? onClose : tinderOpen ? onTinderClose : undefined}
                />
                {tinderOpen ? (
                    <Container className={styles.contentContainer}>
                        <TinderCardComponent />
                    </Container>
                ) : (
                    <Container className={styles.contentContainer}>
                        <Button
                            color="purple"
                            onClick={() => onTinderOpen()}
                            disabled={!(current && current.queue.length > 0)}
                        >
                            Play tinder
                        </Button>
                        {(current && current.song && (
                            <React.Fragment>
                                <div className={styles.headerContainer}>
                                    <h1 className={styles.title}>Now playing</h1>
                                    {session &&
                                        session.user &&
                                        user &&
                                        (user.id === session.user ||
                                            // remove hardcoded admins when (if) admin page implemented
                                            user.id === 'mungrits' ||
                                            user.id === 'aapzu' ||
                                            user.id === 'ihme.') && (
                                            <>
                                                <Button
                                                    color="purple"
                                                    onClick={() => nextSong(session.id)}
                                                    disabled={!(current && current.queue.length > 0)}
                                                >
                                                    Skip
                                                </Button>
                                                <Button
                                                    color="purple"
                                                    onClick={() => addRecommendation(session.id)}
                                                    disabled={!(current && current.queue.length > 0)}
                                                >
                                                    Add
                                                </Button>
                                            </>
                                        )}
                                </div>
                                <CurrentSong song={current.song} />
                                <Row>
                                    <Col xs={12}>
                                        <Progress
                                            progress={current.song && current.progress / current.song.duration}
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
                )}
                {!tinderOpen && (
                    <Search className={styles.search} isOpen={searchOpen} onOpen={onOpen} onClose={onClose} />
                )}
            </div>
        </React.Fragment>
    )
}

export default withRouter(Session)
