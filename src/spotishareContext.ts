import React from 'react'
import { Session } from './types/session'
import { Current } from './types/current'
import { User } from './types/user'

interface SpotishareContext {
    session: Session | null
    setSession: (session: Session | null) => void
    ownSession: Session | null
    setOwnSession: (ownSession: Session | null) => void
    current: Current | null
    setCurrent: (current: Current | null) => void
    user: User | null
    setUser: (user: User | null) => void
}

const SpotishareContext = React.createContext<SpotishareContext>({
    session: null,
    setSession: () => {},
    ownSession: null,
    setOwnSession: () => {},
    current: null,
    setCurrent: () => {},
    user: null,
    setUser: () => {}
})

export default SpotishareContext
