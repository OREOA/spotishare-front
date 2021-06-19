import { Song } from './song'
import { SongQueueItem } from './songQueueItem'

export interface Current {
    song: Song
    queue: SongQueueItem[]
    progress: number
}
