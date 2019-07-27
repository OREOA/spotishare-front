import axios from 'axios'

const apiUrl = `${process.env.REACT_APP_API_URL}/api`

export const sendSong = (songId, session) => axios.post(`${apiUrl}/song`, {
    songId,
    session,
})

export const searchSong = (searchQuery, session) => {
    return axios.get(`${apiUrl}/search`, {
        params: {
            searchQuery,
            session,
        },
    })
    .then((response) => response.data.body && response.data.body.tracks && response.data.body.tracks.items || [])
}

export const getSongList = (session) => axios.get(`${apiUrl}/song`, {
    params: {
        session
    }
})
    .then(({ data }) => data)

export const getCurrentSong = (session) => axios.get(`${apiUrl}/song/current`, {
    params: {
        session
    }
})
    .then(({ data }) => data)
