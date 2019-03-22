import React, { Component } from 'react'
import { observer } from "mobx-react"

@observer
export default class Home extends Component {

  componentDidMount() {
    this.props.store.increment()
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <p>{this.props.store.count}</p>
      </div>
    )
  }
}
