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

const CategoryList = props => {

  if (!props.viewer) {
    return null
  }

  return (
    <div className="nav-list">
      <Search />
      <div className="container">
        {props.viewer && props.viewer.categories.edges.map(edge => <RootItem key={edge.node.id} node={edge.node} setCategory={props.setCategory}/>)  }
      </div>
    </div>
  )
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
