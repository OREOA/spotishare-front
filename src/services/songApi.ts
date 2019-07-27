import axios from 'axios'
import { Song } from '../types/song';
import { Session } from '../types/session'

const apiUrl = `${process.env.REACT_APP_API_URL}/api`

export const sendSong = (songId: Song['id'], session: Session['hash']) => axios.post(`${apiUrl}/song`, {
    songId,
    session,
})

export const searchSong = (searchQuery: string, session: Session['hash']) => {
    return axios.get(`${apiUrl}/search`, {
        params: {
            searchQuery,
            session,
        },
    })
    .then((response) => (response.data.body && response.data.body.tracks && response.data.body.tracks.items) || [])
}

export const getSongList = (session: Session['hash']) => axios.get(`${apiUrl}/song`, {
    params: {
        session
    }
})
    .then(({ data }) => data)

export const getCurrentSong = (session: Session['hash']) => axios.get(`${apiUrl}/song/current`, {
    params: {
        session
    }
})
    .then(({ data }) => data)
