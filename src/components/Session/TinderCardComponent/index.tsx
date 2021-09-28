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
        session && getRecommendation(session.id).then(data => setVoteSong(data))
    }, [session])

    const onSwipe = (direction: string) => {
        session &&
            getRecommendation(session.id).then(data => {
                setVoteSong(voteSong => {
                    if (direction === 'right') {
                        voteSong &&
                            session &&
                            sendSong(voteSong.songId, session.id).then(data => sendVote(data.songId, session.id))
                    }
                    return data
                })
                return data
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
