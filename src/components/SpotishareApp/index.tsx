import React, { useState, useEffect } from 'react'
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom'

import Session from '../Session'
import FrontPage from '../FrontPage'

import { createSession, getMe, getOwnSession, deleteSession } from '../../services/sessionApi'
import Login from '../Login'
import SpotishareContext from '../../spotishareContext'
import { Session as SessionType } from '../../types/session'
import { Current } from '../../types/current'
import { User } from '../../types/user'

const SpotishareApp: React.FC<RouteComponentProps> = ({ history }) => {
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
                setSession(data.session)
            }
        }
    }, [])

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
        setLoading(true)
        getMe()
            .then(user => {
                setUser(user)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        getOwnSession().then(session => setOwnSession(session))
    }, [])

    const onNewSession = (): void => {
        createSession().then(session => {
            setOwnSession(session)
            history.push(`/session/${session.hash}`)
        })
    }

    const onDeleteSession = (): void => {
        deleteSession().then(() => {
            setOwnSession(null)
        })
    }

    return loading ? (
        <div>Loading...</div>
    ) : !user ? (
        <Login />
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
                    component={() => <FrontPage onNewSession={onNewSession} onDeleteSession={onDeleteSession} />}
                />
            </Switch>
        </SpotishareContext.Provider>
    )
}

export default withRouter(React.memo(SpotishareApp))
