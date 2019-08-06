import React from 'react'
import Song from './Song'

import styles from './songList.module.scss'
import { Song as SongType } from '../../types/song'

interface SongListProps {
    songs: SongType[]
    onSongClick: (song: SongType) => void
}

const SongList: React.FC<SongListProps> = ({ songs, onSongClick }) => {
    return (
        <div>
            {songs &&
                songs.map(song => (
                    <Song song={song} className={styles.song} key={song.id} onClick={() => onSongClick(song)} />
                ))}
        </div>
    )
}

export default SongList
