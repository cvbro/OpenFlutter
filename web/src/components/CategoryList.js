import React, {useState} from 'react'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {graphql, QueryRenderer} from 'react-relay'

import Search from './Search'
import environment from '../environment'


const ChildItem = withRouter(({node, location, history, match, setCategory}) => {

  const path = location.pathname
  const category = new URLSearchParams(location.search).get('category')
  const active = category == node.id
  if (active) {
    setCategory(node.name)
  }

  return <li><NavLink className='nav-link' isActive={()=>active} to={`/?category=${node.id}`}>{node.name}</NavLink></li>
})

const RootItem = ({node, setCategory}) => {
  return (
    <div>
      <div className="type">{node.name}</div>
      <ul className="nav-main">
        {node.children.map(child => <ChildItem key={child.id} node={child} setCategory={setCategory}/>)}
      </ul>
    </div>
  )
}

class CategoryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: 'auto',
      overflow: 'auto'
    }
    this.wrapper = React.createRef()
    this.content = React.createRef()
  }

  componentWillUpdate = () => {

    if (!this.wrapper.current || this.state.height == 'auto') {
      return
    }

    const height = this.wrapper.current.offsetHeight - 62
    const state = { height }

    if (this.content.current.offsetHeight > height) {
      state.overflow = 'scroll'
    }

    this.setState({overflow: 'scroll'})
  }

  render () {

    const props = this.props

    if (!props.viewer) {
      return null
    }

    return (
      <div ref={this.wrapper} className="nav-list" >
        <Search />
        <div className="container" style={{height: this.state.height, overflow: this.state.overflow}}>
          <div ref={this.content} className="nav-content">
            {props.viewer && props.viewer.categories.edges.map(edge => <RootItem key={edge.node.id} node={edge.node} setCategory={props.setCategory}/>)  }
      </div>
        </div>
        </div>
    )
  }
}

const query = graphql`
query CategoryListQuery{
  viewer{
    categories {
      edges {
        node {
          id
          name
          children {
            id
            name
          }
        }
      }
    }
  }
}
`


export default ({setCategory}) => {

  const render = ({error, props, retry}) => {
    return <CategoryList {...props} setCategory={setCategory} />
  }

  return (
    <QueryRenderer
      query={query}
      render={render}
      environment={environment}
      />
  )
}
