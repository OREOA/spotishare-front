import React, { useEffect, useContext, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Container } from 'reactstrap'
import { getRecommendation, sendSong } from '../../../services/songApi'
import SpotishareContext from '../../../spotishareContext'
import { Song } from '../../../types/song'
import CurrentSong from '../CurrentSong'

const TinderCardComponent = () => {
    const { session } = useContext(SpotishareContext)
    const [voteSong, setVoteSong] = useState<Song | null>(null)
    const [testi, setTesti] = useState(0)

    useEffect(() => {
        session && getRecommendation(session.hash).then(data => setVoteSong(data))
    }, [])

    const onSwipe = (direction: string) => {
        session &&
            getRecommendation(session.hash).then(data => {
                setVoteSong(voteSong => {
                    if (direction === 'right') {
                        voteSong && session && sendSong(voteSong.id, session.hash)
                    }
                    return data
                })
            })
    }

    return (
        <Container>
            <TinderCard onSwipe={direction => onSwipe(direction)} preventSwipe={['right', 'left']}>
                <CurrentSong song={voteSong} />
            </TinderCard>
        </Container>
    )
}

export default TinderCardComponent