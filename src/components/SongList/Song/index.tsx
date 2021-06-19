import React from 'react'
import classNames from 'classnames'

import styles from './song.module.scss'
import { Col, Row } from 'reactstrap'
import { Song as SongType } from '../../../types/song'
import { VoteHack } from '../../../types/voteHack'

interface SongProps {
    song: SongType
    className?: string
    votes?: VoteHack
    onClick: () => void
}

const Song: React.FC<SongProps> = ({ song: { album, name, artists }, onClick, className, votes }) => {
    return (
        <Row
            className={classNames(styles.song, className, {
                [styles.clickable]: !!onClick
            })}
            onClick={onClick}
        >
            <div className={styles.albumImage}>
                <img
                    src={
                        album.images &&
                        album.images[album.images.length - 1] &&
                        album.images[album.images.length - 1].url
                    }
                    alt={`Album: ${album.name}`}
                />
            </div>
            <Col className={styles.info}>
                <p className={styles.songName}>{name}</p>
                <p className={styles.songArtist}>{artists[0] && artists[0].name}</p>
            </Col>
            {votes && (
                <Col className={styles.info}>
                    <p className={styles.songName}>{`${votes.votes.length} votes`}</p>
                </Col>
            )}
        </Row>
    )
}

export default Song
