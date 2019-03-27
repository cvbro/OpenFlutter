import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "mobx-react"
import { ApolloProvider } from "react-apollo"

import client from './apollo'
import store from './store'
import App from './App'

import './styles/main.scss'


const Connected = Component => (
	<Router>
		<Provider store={store}>
      <ApolloProvider store={store} client={client}>
		    <App />
      </ApolloProvider>
		</Provider>
	</Router>
)

ReactDOM.render(<Connected />, document.body.appendChild(document.createElement('main')))
