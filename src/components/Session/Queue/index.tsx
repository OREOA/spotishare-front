import React from 'react'
import classNames from 'classnames'

import styles from './queue.module.scss'
import SongList from '../../SongList'
import { Song } from '../../../types/song'
import { Col, Row } from 'reactstrap'

interface QueueProps {
    queue: Song[]
    className?: string
}

const Queue: React.FC<QueueProps> = ({ queue, className }) => {
    // @ts-ignore
    const songs = queue.reduce(
        (acc, it) => [...acc, it, it, it, it, it, it, it, it, it, it, it, it, it, it, it, it],
        []
    )
    return (
        <Row className={classNames(styles.row, className)}>
            <Col className={styles.col}>
                <SongList className={styles.songList} songs={songs} onSongClick={() => ''} />
            </Col>
        </Row>
    )
}

export default Queue
