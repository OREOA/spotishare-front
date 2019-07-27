import React, { useContext, useState } from 'react'
import { Container } from 'reactstrap'
import classNames from 'classnames'
import SpotishareContext from '../../spotishareContext'
import Navbar from '../Navbar'
import CurrentSong from './CurrentSong'
import Progress from './Progress'
import Queue from './Queue'
import Search from './Search'

import styles from './session.module.scss'

const Session = () => {
    const { queue, current } = useContext(SpotishareContext)
    const [searchOpen, setSearchOpen] = useState(false)

    const onOpen = () => setSearchOpen(true)
    const onClose = () => setSearchOpen(false)

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
                            <CurrentSong song={current.song} progress={current.progress} />
                            <Progress
                                progress={current.progress / current.song.duration_ms}
                                className={styles.progress}
                            />
                            <Queue queue={queue} className={styles.queue} />
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

export default Session
