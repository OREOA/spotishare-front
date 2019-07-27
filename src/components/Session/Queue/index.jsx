import React from 'react'
import classNames from 'classnames'

import styles from './queue.module.scss'
import SongList from '../../SongList'

const Queue = ({ queue, className }) => (
    <div className={classNames(styles.container, className)}>
        <SongList songs={queue} onSongClick={() => ''}/>
    </div>
)

export default Queue
