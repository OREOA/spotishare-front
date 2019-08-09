import { Artist } from './artist'
import { Image } from './image'
import { SpotifyResource } from './general'

interface Album {
    name: string
    artists: Artist[]
    images: Image[]
    release_data: string
    release_date_precision: string
    total_tracks: number
}

export interface Song extends SpotifyResource {
    name: string
    artists: Artist[]
    album: Album
    duration_ms: number
    available_markets: string[]
    preview_url: string
    track_number: number
    disc_number: number
    explicit: boolean
    external_ids: {
        [key: string]: string
    }
    is_local: boolean
    popularity: number
}
