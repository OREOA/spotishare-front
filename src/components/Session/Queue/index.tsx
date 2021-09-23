import React, { useContext } from 'react'
import classNames from 'classnames'

import styles from './queue.module.scss'
import SongList from '../../SongList'
import { Song } from '../../../types/song'
import { Col, Row } from 'reactstrap'
import { sendVote } from '../../../services/songApi'
import SpotishareContext from '../../../spotishareContext'

interface QueueProps {
    queue: Song[]
    className?: string
}

const Queue: React.FC<QueueProps> = ({ queue, className }) => {
    const { session } = useContext(SpotishareContext)

    const onSongClick = (song: Song): void => {
        if (session) {
            sendVote(song.songId, session.hash).then(res => console.log(res))
        }
    }

    return (
        <Row className={classNames(styles.row, className)}>
            <Col className={styles.col}>
                <SongList
                    className={styles.songList}
                    songs={queue}
                    onSongClick={onSongClick}
                />
            </Col>
        </Row>
    )
}

export default Queue
