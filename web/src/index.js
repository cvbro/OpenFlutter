import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from "react-router-dom"

import App from './App'

import './styles/main.scss'


const Connected = Component => (
	<Router>
		<App />
	</Router>
)

ReactDOM.render(<Connected />, document.getElementById('root'))
