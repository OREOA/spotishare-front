import axios from 'axios'
import { Song } from '../types/song'
import { Session } from '../types/session'
import { Current } from '../types/current'

const apiUrl = `${process.env.REACT_APP_API_URL}/api`

export const sendSong = (songId: Song['id'], session: Session['hash']): Promise<void> =>
    axios
        .post(`${apiUrl}/song`, {
            songId,
            session
        })
        .then(() => undefined)

export const sendVote = (songId: Song['id'], session: Session['hash']): Promise<void> =>
    axios
        .post(`${apiUrl}/song/${songId}/vote`, {
            session
        })
        .then(() => undefined)

export const searchSong = (searchQuery: string, session: Session['hash']): Promise<Song[]> => {
    return axios
        .get(`${apiUrl}/search`, {
            params: {
                searchQuery,
                session
            }
        })
        .then(response => (response.data.body && response.data.body.tracks && response.data.body.tracks.items) || [])
}

export const getCurrent = (session: Session['hash']): Promise<Current> =>
    axios
        .get(`${apiUrl}/song`, {
            params: {
                session
            }
        })
        .then(({ data }) => data)

export const nextSong = (session: Session['hash']): Promise<void> =>
    axios
        .post(`${apiUrl}/song/next`, {
            session
        })
        .then(() => undefined)

export const addRecommendation = (session: Session['hash']): Promise<void> =>
    axios
        .post(`${apiUrl}/song/recommendation`, {
            session
        })
        .then(() => undefined)

export const getRecommendation = (session: Session['hash']): Promise<Song> =>
    axios
        .get(`${apiUrl}/song/recommendation`, {
            params: { session }
        })
        .then(({ data }) => data)
