import React, { useEffect, useContext, useState, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import { Col, Row } from 'reactstrap'
import ClearIcon from '../../../icons/ClearIcon'
import HeartIcon from '../../../icons/HeartIcon'
import { getRecommendation, sendSong } from '../../../services/songApi'
import SpotishareContext from '../../../spotishareContext'
import { Song } from '../../../types/song'
import Loader from '../../Loader/Loader'
import styles from './tindercard.module.scss'

const CardSong: React.FC<{ song: Song | null }> = ({ song }) => {
    const imageUrl = song && song.albumImg
    return (
        <div className={styles.cardContainer}>
            <div>
                <div className={styles.albumImage}>
                    {imageUrl && (
                        <img
                            className={styles.img}
                            src={imageUrl || ''}
                            alt={(song && `Album: ${song.album}`) || 'No image'}
                        />
                    )}
                </div>
            </div>
            <Row>
                <Col className={styles.info}>
                    <p className={styles.songArtist}>{song ? song.album : ''}</p>
                    <h2 className={styles.songName}>{song ? song.name : ''}</h2>
                    <p className={styles.songArtist}>{song ? song.artist.name : ''}</p>
                </Col>
            </Row>
        </div>
    )
}

const TinderButton: React.FC<{ onClick: () => void }> = ({ onClick, children }) => {
    return (
        <button onClick={onClick} className={styles.btn}>
            {children}
        </button>
    )
}

const TinderCardComponent = () => {
    const { session } = useContext(SpotishareContext)
    const [voteSong, setVoteSong] = useState<Song[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const tinderRef = useRef<any>(null)
    useEffect(() => {
        session && getRecommendation(session.id).then(data => setVoteSong(data))
    }, [session])

    const onSwipe = async (direction: string, index: number) => {
        if (session && voteSong) {
            setLoading(true)
            if (direction === 'right') {
                await sendSong(voteSong[0].songId, session.id)
            }
            if (index === 0) {
                const recommendation = await getRecommendation(session.id)
                setVoteSong(recommendation)
            }
            setLoading(false)
        }
    }

    const onSwipeClick = (direction: string) => {
        if (session && !loading && tinderRef.current) {
            console.log('click')

            tinderRef.current.swipe(direction)
        }
    }

    return (
        <div className={styles.container}>
            {voteSong ? (
                <>
                    <Row className={styles.tinderContainer}>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            {loading && (
                                <div className={styles.cardLoader}>
                                    <Loader />
                                </div>
                            )}
                            {voteSong.map((song, index) => (
                                <TinderCard
                                    key={song.songId}
                                    ref={tinderRef}
                                    onSwipe={direction => onSwipe(direction, index)}
                                >
                                    <CardSong song={song} />
                                </TinderCard>
                            ))}
                        </Col>
                    </Row>
                    <Row className={styles.btnContainer}>
                        <Col xs={{ size: 10, offset: 1 }} lg={{ size: 6, offset: 3 }} className={styles.btnRow}>
                            <TinderButton onClick={() => onSwipeClick('left')}>
                                <ClearIcon />
                            </TinderButton>
                            <TinderButton onClick={() => onSwipeClick('right')}>
                                <HeartIcon />
                            </TinderButton>
                        </Col>
                    </Row>
                </>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default TinderCardComponent
