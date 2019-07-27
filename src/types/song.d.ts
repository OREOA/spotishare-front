type Artist = {
    name: string
}

type Image = {
    width: number
    height: number
    url: string
}

export interface Song {
    id: string
    name: string
    artists: Artist[]
    album: {
        artists: Artist[]
        images: Image[]
    }
    duration_ms: number
}
