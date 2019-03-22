import React, { Component } from 'react'
import { observer } from "mobx-react"

@observer
export default class About extends Component {

  render() {
    return (
      <div>
        <h2>About</h2>
        <p>{this.props.store.count}</p>
      </div>
    )
  }
}
