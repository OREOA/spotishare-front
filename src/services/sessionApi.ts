import axios from 'axios'
import { Session } from '../types/session'

const apiUrl = `${process.env.REACT_APP_API_URL}/api`

export const getMe = () => axios.get(`${apiUrl}/me/`)

export const getOwnSession = () => axios.get(`${apiUrl}/session/`)

export const getSession = (hash: Session['hash']) => axios.get(`${apiUrl}/session/${hash}`)

export const createSession = () => axios.post(`${apiUrl}/session/`)
