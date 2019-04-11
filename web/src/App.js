import React, { Component } from 'react'
import { Route, Link } from "react-router-dom"

import Admin from './routes/Admin'
import Packages from './routes/Packages'
import PackageEdit from './routes/admin/PackageEdit'

export default class App extends Component {

  render() {

    return (
      <div className='height-full'>
        <Route path="/admin" exact component={Admin}  ></Route>
        <Route path="/admin/packages/:id" exact component={PackageEdit}  ></Route>
        <Route path="/" exact component={Packages}></Route>
      </div>
    )
  }
}
