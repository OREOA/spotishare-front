import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import Session from '../Session'
import FrontPage from '../FrontPage'

import { createSession, getMe, getSession } from '../../services/sessionApi'
import Login from '../Login'
import SpotishareContext from '../../spotishareContext'
import { getCurrent } from '../../services/songApi'

const ONE_SECOND = 1000

const SpotishareApp = () => {
    let interval

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [current, setCurrent] = useState(null)

    const initCalls = () => {
        clearInterval(interval)
        const call = () => {
            getCurrent(session.hash)
                .then(setCurrent)
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

    const onSessionChange = (s) => setSession({ ...session, ...s })

    useEffect(() => {
        getSession()
            .then(({ data }) => {
                onSessionChange(data)
            })
    }, [])

    useEffect(() => {
        if (session && session.hash) {
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
        <SpotishareContext.Provider value={{ session, current }}>
            <Switch>
                <Route path="/(session|s)/:id" component={Session} />
                <Route path="/" component={() => <FrontPage onNewSession={onNewSession} />} />
            </Switch>
        </SpotishareContext.Provider>
    )
}

export default SpotishareApp
