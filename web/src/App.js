import React, { Component } from 'react'
import { Route, Link } from "react-router-dom"

import Home from './routes/Home'

export default class App extends Component {

  render() {

    const store = this.props.store

    return (
      <div>
        <Route path="/" exact render={props => <Home store={store} /> } ></Route>
      </div>
    )
  }
}
