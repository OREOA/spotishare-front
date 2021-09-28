import axios from 'axios'
import { Session } from '../types/session'
import { User } from '../types/user'

const apiUrl = `${process.env.REACT_APP_API_URL}/api`

export const getMe = (): Promise<User> => axios.get(`${apiUrl}/me/`).then(({ data }) => data)

export const getOwnSession = (): Promise<Session> => axios.get(`${apiUrl}/session/`).then(({ data }) => data)

export const getSession = (hash: Session['id']): Promise<Session> =>
    axios.get(`${apiUrl}/session/${hash}`).then(({ data }) => data)

export const createSession = (): Promise<Session> => axios.post(`${apiUrl}/session/`).then(({ data }) => data)

export const deleteSession = (): Promise<any> => axios.delete(`${apiUrl}/session/`)
