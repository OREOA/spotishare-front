import React, { useContext, useState, useEffect } from 'react'
import SessionContext from '../../sessionContext'
import { Container } from 'reactstrap'
import Navbar from '../Navbar'
import { getCurrentSong } from '../../services/songApi'
import CurrentSong from './CurrentSong'
import Progress from './Progress'
import Queue from './Queue'

import styles from './session.module.scss'

const ONE_SECOND = 1000

const Session = () => {
    let currentSongInterval

    const session = useContext(SessionContext)
    const [current, setCurrent] = useState(null)

    useEffect(() => {
        currentSongInterval = setInterval(() => {
            getCurrentSong(session.hash)
                .then(setCurrent)
        }, ONE_SECOND)
        return () => clearInterval(currentSongInterval)
    }, [])

    return (
        <Container>
            <Navbar backButtonPath={'/'} />
            <h1>Now playing</h1>
            {current && (
                <React.Fragment>
                    <CurrentSong song={current.song} progress={current.progress} />
                    <Progress progress={current.progress / current.song.duration_ms} className={styles.progress} />
                    <Queue queue={[current.song, current.song, current.song]} className={styles.queue} />
                </React.Fragment>
            )}
        </Container>
    )
}

export default Session
