import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

import Bars from '../../../icons/Bars'
import styles from './menu.module.scss'
import SpotishareContext from '../../../spotishareContext'
import { endSession } from '../../../services/sessionApi'

const Menu = ({ history }) => {
    const { session, setSession, ownSession, setOwnSession, user } = useContext(SpotishareContext)
    const [open, setOpen] = useState(false)
    const onClick = (e) => {
        e.preventDefault()
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }
    const onEndSession = () => {
        const ownSessionHash = ownSession.hash
        endSession()
            .then(() => {
                setOwnSession(null)
                if (session.hash === ownSessionHash) {
                    setSession(null)
                }
                history.push('/')
            })
    }
    return (
        <div
            className={classNames(styles.container)}
        >
            <a href="#" onClick={onClick}>
                <Bars className={styles.icon} />
            </a>
            {open && (
                <div className={styles.menuContainer}>
                    <div className={styles.section}>
                        <p className={styles.title}>
                            Logged in as
                        </p>
                        <p className={styles.value}>
                            {user.display_name}
                        </p>
                    </div>
                    {session && session.owner &&  (
                        <div className={styles.section}>
                            <p className={styles.title}>
                                Session hosted by
                            </p>
                            <p className={styles.value}>
                                {session.owner.display_name}
                            </p>
                        </div>
                    )}
                    {ownSession && (
                        <div className={classNames(styles.section, styles.endSessionSection)}>
                            <a href="#" onClick={onEndSession}>
                                End my session
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default withRouter(Menu)
