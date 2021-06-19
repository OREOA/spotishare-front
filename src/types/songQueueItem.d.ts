import { Song } from './song'
import { Vote } from './vote'

export interface SongQueueItem {
    songObject: Song
    votes: Vote[]
}
