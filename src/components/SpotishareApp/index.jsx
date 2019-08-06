import React, { useState, useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import Session from '../Session'
import FrontPage from '../FrontPage'

import { createSession, getMe, getOwnSession } from '../../services/sessionApi'
import Login from '../Login'
import SpotishareContext from '../../spotishareContext'

const SpotishareApp = ({ history }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [ownSession, setOwnSession] = useState(null)
    const [current, setCurrent] = useState(null)

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            const data = JSON.parse(localStorage.getItem('spotishare'))
            if (data && data.session) {
                setSession(data.session)
            }
        }
    }, [])

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            if (session) {
                localStorage.setItem('spotishare', JSON.stringify({
                    session
                }))
            }
        }
    }, [session])

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

    useEffect(() => {
        getOwnSession()
            .then(({ data }) => setOwnSession(data))
    }, [])

    const onNewSession = () => {
        createSession()
            .then(({ data }) => {
                setOwnSession(data)
                history.push(`/session/${data.hash}`)
            })
    }

    return loading ? (
        <div>Loading...</div>
    ) : !user ? (
        <Login />
    ) : (
        <SpotishareContext.Provider value={{
            session, setSession,
            ownSession, setOwnSession,
            user, setUser,
            current, setCurrent
        }}>
            <Switch>
                <Route path="/(session|s)/:id" component={Session} />
                <Route path="/" component={() => <FrontPage onNewSession={onNewSession} />} />
            </Switch>
        </SpotishareContext.Provider>
    )
}

export default withRouter(React.memo(SpotishareApp))
