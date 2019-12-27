export interface SpotifyResource<T extends string> {
    id: string
    href: string
    uri: string
    external_urls: {
        spotify?: string
        [key: string]: string
    }
    type: T
}
