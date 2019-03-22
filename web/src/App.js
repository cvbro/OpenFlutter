import React, { Component } from 'react'
import { Route, Link } from "react-router-dom"
import { observer, inject } from "mobx-react"

import Home from './routes/Home'
import About from './routes/About'

@inject('store')
@observer
export default class App extends Component {

  render() {

    const store = this.props.store

    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact render={props => <Home store={store} /> } ></Route>
        <Route path="/about/" render={props => <About store={store} /> } ></Route>
      </div>
    )
  }
}
