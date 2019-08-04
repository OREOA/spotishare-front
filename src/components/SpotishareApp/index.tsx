import React, { useState, useEffect } from 'react'
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom'

import Session from '../Session'
import FrontPage from '../FrontPage'

import { createSession, getMe, getOwnSession } from '../../services/sessionApi'
import Login from '../Login'
import SpotishareContext from '../../spotishareContext'
import { Session as SessionType } from '../../types/session'

const SpotishareApp: React.FC<RouteComponentProps> = ({ history }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [session, setSession] = useState<SessionType | null>(null)
    const [ownSession, setOwnSession] = useState<SessionType | null>(null)
    const [current, setCurrent] = useState(null)

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem('spotishare')
            const data = raw && JSON.parse(raw)
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

    const onSessionChange = (s: SessionType) => setSession({ ...session, ...s })

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
