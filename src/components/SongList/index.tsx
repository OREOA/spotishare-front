import React from 'react'
import Song from './Song'
import classNames from 'classnames'

import styles from './songList.module.scss'
import { Song as SongType } from '../../types/song'
interface SongListProps {
    songs: SongType[]
    onSongClick: (song: SongType) => void
    className?: string
}

const SongList: React.FC<SongListProps> = ({ songs, onSongClick, className }) => {
    return (
        <div className={classNames(styles.songList, className)}>
            {songs &&
                songs.map(song => (
                    <Song
                        song={song}
                        className={styles.song}
                        key={song.songId}
                        onClick={() => onSongClick(song)}
                    />
                ))}
        </div>
    )
}

export default SongList
