export interface SpotifyResource {
    id: string
    href: string
    uri: string
    external_urls: {
        spotify?: string
        [key: string]: string
    }
    type: 'track' | 'album' | 'artist'
}
