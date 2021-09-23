import React, { useEffect, useContext, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Container } from 'reactstrap'
import { getRecommendation, sendSong, sendVote } from '../../../services/songApi'
import SpotishareContext from '../../../spotishareContext'
import { Song } from '../../../types/song'
import CurrentSong from '../CurrentSong'

const TinderCardComponent = () => {
    const { session } = useContext(SpotishareContext)
    const [voteSong, setVoteSong] = useState<Song | null>(null)

    useEffect(() => {
        session && getRecommendation(session.hash).then(data => setVoteSong(data))
    }, [session])

    const onSwipe = (direction: string) => {
        session &&
            getRecommendation(session.hash)
                .then(data => {
                    setVoteSong(voteSong => {
                        if (direction === 'right') {
                            voteSong && session && sendSong(voteSong.songId, session.hash)
                        }
                        return data
                    })
                    return data
                })
                .then(data => {
                    if (data && data.songId) {
                        sendVote(data.songId, session.hash)
                    }
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
