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

export const getCurrent = (session) => axios.get(`${apiUrl}/song`, {
    params: {
        session
    }
})
    .then(({ data }) => data)
