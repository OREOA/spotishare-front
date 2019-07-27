import axios from 'axios'

const apiUrl = `${process.env.REACT_APP_API_URL}/api`

export const getMe = () => axios.get(`${apiUrl}/me/`)

export const getSession = () => axios.get(`${apiUrl}/session/`)

export const createSession = () => axios.post(`${apiUrl}/session/`)
