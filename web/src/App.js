import React, { Component } from 'react'
import { Route, Link } from "react-router-dom"

import PackageList from './routes/PackageList'
import PackageEdit from './routes/PackageEdit'


export default class App extends Component {

  render() {

    return (
      <div>
        <Route path="/" exact component={PackageList}  ></Route>
        <Route path="/packages/edit/:id" component={PackageEdit} ></Route>
      </div>
    )
  }
}
