import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import SpotishareApp from '../SpotishareApp'

const history = createBrowserHistory()

const SpotishareRouter: React.FC = () => (
    <Router history={history}>
        <SpotishareApp />
    </Router>
)

export default SpotishareRouter
