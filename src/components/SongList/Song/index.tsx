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

const Song: React.FC<SongProps> = ({ song: { album, albumImg, name, artist, votes }, onClick, className }) => {
    return (
        <Row
            className={classNames(styles.song, className, {
                [styles.clickable]: !!onClick
            })}
            onClick={onClick}
        >
            <div className={styles.albumImage}>
                <img
                    src={albumImg}
                    alt={`Album: ${album}`}
                />
            </div>
            <Col className={styles.info}>
                <p className={styles.songName}>{name}</p>
                <p className={styles.songArtist}>{artist && artist.name}</p>
            </Col>
            {votes && (
                <Col className={styles.info}>
                    <p className={styles.songName}>{`${votes} votes`}</p>
                </Col>
            )}
        </Row>
    )
}

export default Song
