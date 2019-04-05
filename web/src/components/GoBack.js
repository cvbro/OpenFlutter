import React from 'react'
import {withRouter, Link} from "react-router-dom"

const GoBack = ({history}) => {
  return (
      <Link to='/'>返回</Link>
  )
}

export default withRouter(GoBack)
