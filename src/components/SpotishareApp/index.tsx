import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import Session from '../Session'
import FrontPage from '../FrontPage'

import { createSession, getMe, getSession } from '../../services/sessionApi'
import Login from '../Login'
import SpotishareContext from '../../spotishareContext'
import { getCurrentSong, getSongList } from '../../services/songApi'
import { Session as SessionType } from '../../types/session'

const ONE_SECOND = 1000

const SpotishareApp: React.FC = () => {
    let interval: NodeJS.Timeout

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [session, setSession] = useState<SessionType | null>(null)
    const [current, setCurrent] = useState(null)
    const [queue, setQueue] = useState([])

    const initCalls = () => {
        clearInterval(interval)
        const call = () => {
            if (!session) {
                return
            }
            getCurrentSong(session.hash)
                .then(setCurrent)
            getSongList(session.hash)
                .then(setQueue)
        }
        interval = setInterval(call, ONE_SECOND)
        call()
    }

    useEffect(() => {
        setLoading(true)
        getMe()
            .then(({ data }) => {
                setUser(data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
        return () => clearInterval(interval)
    }, [])

    const onSessionChange = (s: SessionType) => setSession({ ...session, ...s })

    useEffect(() => {
        getSession()
            .then(({ data }) => {
                onSessionChange(data)
            })
    }, [])

    useEffect(() => {
        if (session) {
            initCalls()
        }
    }, [session])

    const onNewSession = () => {
        createSession()
            .then(({ data }) => {
                onSessionChange(data)
            })
    }

    return loading ? (
        <div>Loading...</div>
    ) : !user ? (
        <Login />
    ) : (
        <SpotishareContext.Provider value={{ session, current, queue }}>
            <Switch>
                <Route path="/(session|s)/:id" component={Session} />
                <Route path="/" component={() => <FrontPage onNewSession={onNewSession} />} />
            </Switch>
        </SpotishareContext.Provider>
    )
}

export default SpotishareApp
