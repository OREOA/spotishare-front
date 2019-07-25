import React from 'react'
import ReactDOM from 'react-dom'

import './axiosDefaultSettings'

import './index.scss'
import SpotishareRouter from './components/SpotishareRouter'
import * as serviceWorker from './serviceWorker'

const Root = () => (
  <SpotishareRouter />
)

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
