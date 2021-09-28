import { Artist } from './artist'

export interface Song {
    songId: string
    name: string
    album: string
    albumImg: string
    votes: number
    artist: Artist
    duration: number
}
