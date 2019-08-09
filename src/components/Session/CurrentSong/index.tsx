import React from 'react'

import styles from './currentSong.module.scss'
import { Row, Col } from 'reactstrap'
import { Song } from '../../../types/song'

interface CurrentSongProps {
    song: Song
}

const CurrentSong: React.FC<CurrentSongProps> = ({ song }) => {
    return (
        <Row>
            <div className={styles.albumImage}>
                <img
                    src={song.album.images && song.album.images[song.album.images.length - 1].url}
                    alt={`Album: ${song.album.name}`}
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
