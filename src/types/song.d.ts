export interface Song {
    id: string
    name: string
    album: {
        artists: {
            name: string
        }[]
        images: {
            width: number
            height: number
            url: string
        }[]
    }
    duration_ms: number
}
