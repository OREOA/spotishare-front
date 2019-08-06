import { Song } from './song'

export interface Current {
    song: Song
    queue: Song[]
    progress: number
}
