import axios from 'axios'

const apiUrl = `${process.env.REACT_APP_API_URL}/api`

export const sendSong = (songId, hash) => axios.post(`${apiUrl}/song/${hash}`, {
    songId,
})

export const searchSong = (searchQuery, hash) => {
    return axios.get(`${apiUrl}/search/${hash}`, {
        params: {
            searchQuery,
        },
    })
        .then((response) => response.data.body.tracks.items.slice(0,6))
}

export const getSongList = (hash) => axios.get(`${apiUrl}/song/${hash}`)
    .then(({ data }) => data)

export const getCurrentSong = (hash) =>  axios.get(`${apiUrl}/song/current/${hash}`)
    .then(({ data }) => data)
