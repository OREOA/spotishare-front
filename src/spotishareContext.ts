import React from 'react'
import { Session } from './types/session'
import { Song } from './types/song'

interface SpotishareContext {
    session: Session | null
    current: {
        song: Song
        progress: number
    } | null
    queue: Song[]
}

const SpotishareContext = React.createContext<SpotishareContext>({
    session: null,
    current: null,
    queue: [],
})

export default SpotishareContext
