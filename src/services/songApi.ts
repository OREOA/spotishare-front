import axios from 'axios'
import { Song } from '../types/song'
import { Session } from '../types/session'
import { Current } from '../types/current'

const apiUrl = `${process.env.REACT_APP_API_URL}/api`

export const sendSong = (songId: Song['songId'], session: Session['id']): Promise<Song> =>
    axios
        .post(`${apiUrl}/song`, {
            songId,
            session
        })
        .then(response => response.data)

export const sendVote = (songId: Song['songId'], session: Session['id']): Promise<void> =>
    axios
        .post(`${apiUrl}/song/${songId}/vote`, {
            session
        })
        .then(() => undefined)

export const searchSong = (searchQuery: string, session: Session['id']): Promise<Song[]> => {
    return axios
        .get(`${apiUrl}/search`, {
            params: {
                searchQuery,
                session
            }
        })
        .then(response => response.data)
}

export const getCurrent = (session: Session['id']): Promise<Current> =>
    axios
        .get(`${apiUrl}/song`, {
            params: {
                session
            }
        })
        .then(({ data }) => data)

export const nextSong = (session: Session['id']): Promise<void> =>
    axios
        .post(`${apiUrl}/song/next`, {
            session
        })
        .then(() => undefined)

export const addRecommendation = (session: Session['id']): Promise<void> =>
    axios
        .post(`${apiUrl}/song/recommendation`, {
            session
        })
        .then(() => undefined)

export const getRecommendation = (session: Session['id']): Promise<Song> =>
    axios
        .get(`${apiUrl}/song/recommendation`, {
            params: { session }
        })
        .then(({ data }) => data)
