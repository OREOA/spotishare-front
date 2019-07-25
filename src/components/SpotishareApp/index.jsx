import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import Session from '../Session'
import FrontPage from '../FrontPage'

import { createSession, getMe, getSession } from '../../services/sessionApi'
import Login from '../Login'
import SessionContext from '../../sessionContext'

const SpotishareApp = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)

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
    }, [])

    const onSessionChange = (s) => setSession({ ...session, ...s })

    useEffect(() => {
        getSession()
            .then(({ data }) => {
                onSessionChange(data)
            })
    }, [])

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
        <SessionContext.Provider value={session}>
            <Switch>
                <Route path="/(session|s)/:id" component={Session} />
                <Route path="/" component={() => <FrontPage onNewSession={onNewSession} />} />
            </Switch>
        </SessionContext.Provider>
    )
}

export default SpotishareApp
