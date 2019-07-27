import React from 'react'
import Song from './Song'

import styles from './songList.module.scss'

const SongList = ({ songs, onSongClick }) => {
    return (
        <div className={styles.songList}>
            {songs && songs.map((song, i) => (
                <Song
                    song={song}
                    className={styles.song}
                    key={i}
                    onClick={() => onSongClick(song)}
                />
            ))}
        </div>
    )
}

export default SongList
