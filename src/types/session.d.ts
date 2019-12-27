import { User } from './user'

export interface Session {
    hash: string
    owner: User
}
