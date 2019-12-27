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
    return (
        <Row className={classNames(styles.row, className)}>
            <Col className={styles.col}>
                <SongList className={styles.songList} songs={queue} onSongClick={() => ''} />
            </Col>
        </Row>
    )
}

export default Queue
