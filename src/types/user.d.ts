import { SpotifyResource } from './general'
import { Image } from './image'

export interface User extends SpotifyResource<'user'> {
    display_name: string
    id: string
    images: Image[]
}
