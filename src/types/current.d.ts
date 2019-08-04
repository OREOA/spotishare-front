import { Song } from './song'

export type Current = {
    song: Song
    queue: Song[]
    progress: number
}
