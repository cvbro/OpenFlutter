import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "mobx-react"

import store from './store'
import App from './App'


const Connected = Component => (
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>
)

ReactDOM.render(<Connected />, document.body.appendChild(document.createElement('div')))
