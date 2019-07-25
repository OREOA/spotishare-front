import React from 'react'
import classNames from 'classnames'

import styles from './queue.module.scss'
import Col from 'reactstrap/es/Col'
import Row from 'reactstrap/es/Row'

const Queue = ({ queue, className }) => (
    <div className={classNames(styles.container, className)}>
        {queue && queue.map((song, i) => {
            return (
                <Row className={styles.song} key={i}>
                    <div className={styles.albumImage}>
                        <img
                            srcSet={song.album.images.reverse().map((a) => `${a.url} ${a.width}w`)}
                            src={song.album.images[song.album.images.length - 1].url}
                        />
                    </div>
                    <Col className={styles.info}>
                        <p className={styles.songName}>{song.name}</p>
                        <p className={styles.songArtist}>{song.artists[0].name}</p>
                    </Col>
                </Row>
            )
        })}
    </div>
)

export default Queue
