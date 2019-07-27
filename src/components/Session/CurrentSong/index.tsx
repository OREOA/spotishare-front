import React from 'react'

import styles from './currentSong.module.scss'
import { Row, Col } from 'reactstrap'
import { Song } from '../../../types/song';

type CurrentSongProps = {
    song: Song
}

const CurrentSong: React.FC<CurrentSongProps> = ({ song }) => {
    return (
        <Row className={styles.currentSong}>
            <div className={styles.albumImage}>
                <img
                    srcSet={song.album.images.reverse().map((a) => `${a.url} ${a.width}w`).join(',')}
                    src={song.album.images[song.album.images.length - 1].url}
                />
            </div>
            <Col className={styles.info}>
                <p className={styles.songName}>{song.name}</p>
                <p className={styles.songArtist}>{song.artists[0].name}</p>
            </Col>
        </Row>
    )
}

export default CurrentSong
