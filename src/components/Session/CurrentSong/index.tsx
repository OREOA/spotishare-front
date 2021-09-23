import React from 'react'

import styles from './currentSong.module.scss'
import { Row, Col } from 'reactstrap'
import { Song } from '../../../types/song'

interface CurrentSongProps {
    song?: Song | null
}

const CurrentSong: React.FC<CurrentSongProps> = ({ song }) => {
    const imageUrl = song && song.albumImg
    return (
        <Row>
            <div className={styles.albumImage}>
                {imageUrl && (
                    <img
                        className={styles.img}
                        src={imageUrl || ''}
                        alt={(song && `Album: ${song.album}`) || 'No image'}
                    />
                )}
            </div>
            <Col className={styles.info}>
                <p className={styles.songName}>{song ? song.name : ''}</p>
                <p className={styles.songArtist}>{song ? song.artist.name: ''}</p>
            </Col>
        </Row>
    )
}

export default CurrentSong
