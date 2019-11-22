import React from 'react'
import classNames from 'classnames'

import styles from './song.module.scss'
import { Col, Row } from 'reactstrap'
import { Song as SongType } from '../../../types/song'

interface SongProps {
    song: SongType
    className?: string
    onClick: () => void
}

const Song: React.FC<SongProps> = ({ song: { album, name, artists }, onClick, className }) => (
    <Row
        className={classNames(styles.song, className, {
            [styles.clickable]: !!onClick
        })}
        onClick={onClick}
    >
        <div className={styles.albumImage}>
            <img src={album.images && album.images[album.images.length - 1] && album.images[album.images.length - 1].url} alt={`Album: ${album.name}`} />
        </div>
        <Col className={styles.info}>
            <p className={styles.songName}>{name}</p>
            <p className={styles.songArtist}>{artists[0] && artists[0].name}</p>
        </Col>
    </Row>
)

export default Song
