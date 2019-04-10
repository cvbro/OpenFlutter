import React, { Component } from 'react'
import { Route, Link } from "react-router-dom"

import Packages from './routes/Packages'

export default class App extends Component {

  render() {

    return (
      <div>
        <Route path="/" exact component={Packages}  ></Route>
      </div>
    )
  }
}
