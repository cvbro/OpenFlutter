import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from "react-router-dom"
import { ApolloProvider } from "react-apollo"

import client from './apollo'
import App from './App'

import './styles/main.scss'


const Connected = Component => (
	<Router>
    <ApolloProvider client={client}>
		  <App />
    </ApolloProvider>
	</Router>
)

ReactDOM.render(<Connected />, document.body.appendChild(document.createElement('main')))
