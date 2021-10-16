import React, { useState, useEffect, useCallback } from 'react'
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom'

import Session from '../Session'
import FrontPage from '../FrontPage'

import { createSession, getMe, getOwnSession, deleteSession, getSession } from '../../services/sessionApi'
import Login from '../Login'
import SpotishareContext from '../../spotishareContext'
import { Session as SessionType } from '../../types/session'
import { Current } from '../../types/current'
import { User } from '../../types/user'
import Loader from '../Loader/Loader'

const SpotishareApp: React.FC<RouteComponentProps> = ({ history }) => {
    const [initializing, setInitializing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<SessionType | null>(null)
    const [ownSession, setOwnSession] = useState<SessionType | null>(null)
    const [current, setCurrent] = useState<Current | null>(null)

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem('spotishare')
            const data = raw && JSON.parse(raw)
            if (data && data.session) {
                getSession(data.session.id)
                    .then(setSession)
                    .catch(() => undefined)
            }
        }
    }, [setSession])

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            if (session) {
                localStorage.setItem(
                    'spotishare',
                    JSON.stringify({
                        session
                    })
                )
            }
        }
    }, [session])

    useEffect(() => {
        setInitializing(true)
        getMe()
            .then(user => {
                setUser(user)
                setInitializing(false)
            })
            .catch(() => {
                setInitializing(false)
            })
    }, [setInitializing, setUser])

    useEffect(() => {
        getOwnSession().then(s => setOwnSession(s))
    }, [setOwnSession])

    const onNewSession = useCallback(() => {
        setLoading(true)
        createSession().then(s => {
            setOwnSession(s)
            setTimeout(() => {
                setLoading(false)
                history.push(`/session/${s.id}`)
            }, 3000)
        })
    }, [setOwnSession, history])

    const onDeleteSession = useCallback(() => {
        const ownSessionOpen = session && ownSession && session.id === ownSession.id
        deleteSession().then(() => {
            setOwnSession(null)
            if (ownSessionOpen) {
                setSession(null)
            }
            localStorage.removeItem('spotishare')
        })
    }, [ownSession, session])

    return initializing ? (
        <Loader />
    ) : !user ? (
        <Login redirect={window.location.href} />
    ) : (
        <SpotishareContext.Provider
            value={{
                session,
                setSession,
                ownSession,
                setOwnSession,
                user,
                setUser,
                current,
                setCurrent
            }}
        >
            <Switch>
                <Route path="/(session|s)/:id" component={Session} />
                <Route
                    path="/"
                    component={() => (
                        <FrontPage onNewSession={onNewSession} loading={loading} onDeleteSession={onDeleteSession} />
                    )}
                />
            </Switch>
        </SpotishareContext.Provider>
    )
}

export default withRouter(React.memo(SpotishareApp))
