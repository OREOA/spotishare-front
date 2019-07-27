import React from 'react'
import classNames from 'classnames'

import styles from './queue.module.scss'
import SongList from '../../SongList'
import { Song } from '../../../types/song';

type QueueProps = {
    queue: Song[],
    className?: string
}

const Queue: React.FC<QueueProps> = ({ queue, className }) => (
    <div className={classNames(styles.container, className)}>
        <SongList songs={queue} onSongClick={() => ''}/>
    </div>
)

export default Queue
