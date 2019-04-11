import React, {useState} from 'react'
import {graphql, createRefetchContainer, QueryRenderer, commitMutation} from 'react-relay'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import environment from '../../environment'
import _ from 'lodash'

import ToggleButton from './ToggleButton'
import DeleteButton from './DeleteButton'

const Item = ({node, selected, onSelect, refetch}) => {

  const showDeleteButton = '展示中' == node.status ? false : true

  const showToggleButton = (node.image && node.video && node.categories.length > 0 && ['待处理', '展示中'].includes(node.status)) ? true : false

  const showEditButton = ['待处理'].includes(node.status) ? true : false

  return (
    <tr>
      <th scope="row">
        <input type="checkbox" onChange={()=> onSelect(node.id)} checked={selected ? true : false} />
      </th>
      <td>{node.name}</td>
      <td>{ node.image ? <a href={node.image}><i className="fa fa-check" aria-hidden="true"/></a> : <i className="fa fa-times" aria-hidden="true"/> }</td>
      <td>{ node.video ? <a href={node.video}><i className="fa fa-check" aria-hidden="true"/></a> : <i className="fa fa-times" aria-hidden="true"/> }</td>
      <td>{ node.categories.map(cat => cat.name).join(', ') }</td>
      <td>{ node.status }</td>
      <td>{ node.errorMessages }</td>
      <td>
        { showDeleteButton && <DeleteButton refetch={refetch} node={node} />}
        { showEditButton && <Link className="btn-sm btn btn-outline-warning mr-3" to={`/admin/packages/${node.id}`}>Edit</Link> }
        { showToggleButton && <ToggleButton refetch={refetch} node={node}/> }
      </td>
    </tr>
  )
}

const PackageTable = props => {

  const [params, setParams] = useState({})
  const [selected, setSelected] = useState(new Set())

  const {viewer, relay} = props

  const handleItemSelect = id => {
    const set = _.clone(selected)
    set.has(id) ? set.delete(id) : set.add(id)
    setSelected(set)
  }

  const renderItems = () => {
    if (!viewer.packages) {
      return null
    }
    return viewer.packages.edges.map(edge => <Item refetch={relay.refetch} onSelect={handleItemSelect} selected={selected.has(edge.node.id)} key={edge.node.id} node={edge.node} />)
  }

  const selectAll = selected.size == viewer.packages.edges.length

  const toggleSelectAll = () => {
    if (!selectAll) {
      setSelected(new Set(viewer.packages.edges.map(edge=>edge.node.id)))
    } else {
      setSelected(new Set())
    }
  }

  const handleSearch = () => relay.refetch(fragmentVariables=> ({keyword: params.keyword}))


  return (
    <div>
      <div className="row table-button">
        <div className="col-md-8">
          <Link className="btn btn-outline-primary" to="/admin/packages/new">New</Link>
          <button className="btn btn-outline-info" onClick={() => relay.refetch()} >Refetch</button>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <input value={params.keyword || ''} onChange={e => setParams({...params, keyword: e.target.value})} type="text" className="form-control" placeholder="" />
              <div className="input-group-append">
                <button onClick={handleSearch} className="btn btn-outline-info" type="button">Search</button>
              </div>
          </div>
        </div>
      </div>
      <div className="row">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" onChange={toggleSelectAll} checked={selectAll} />
              </th>
              <th scope="col">name</th>
              <th scope="col">Image</th>
              <th scope="col">Video</th>
              <th scope="col">Category</th>
              <th scope="col">State</th>
              <th scope="col">Error Message</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderItems()}
          </tbody>
        </table>
      </div>
    </div>
  )
}


const paginationQuery = graphql`
query PackageTablePaginationQuery(
  $first: Int!
  $after: String
  $keyword: String
) {
    viewer {
      ...PackageTable_viewer @arguments(first: $first, after: $after, keyword: $keyword)
    }
}
`

const RefetchContainer = createRefetchContainer(
  PackageTable,
  graphql`
fragment PackageTable_viewer on Viewer
@argumentDefinitions(
  first: {type: "Int"}
  after: {type: "String"}
  keyword: {type: "String"}
  categoryId: {type: "ID"}
) {
  packages(
    first: $first
    after: $after
    keyword: $keyword
    categoryId: $categoryId
  ) @connection(key: "PackageTable_packages") {
    edges {
      cursor
      node {
        id
        name
        image
        video
        status
        categories {
          name
        }
        errorMessages
      }
    }
    pageInfo{
      endCursor
      startCursor 
    }
  }
}
`,
  paginationQuery
)

const pageQuery = graphql`
query PackageTableQuery($first: Int, $after: String, $keyword: String, $categoryId: ID) {
  viewer {
    ...PackageTable_viewer @arguments(first: $first, after: $after, keyword: $keyword)
  }
}
`

export default () => {

  const renderChildren = ({error, props, retry}) => {
    if (!props) {
      return null
    }
    return <RefetchContainer { ...props } />
  }

  return (
    <QueryRenderer
      environment={environment}
      query={pageQuery}
      variables={{ first: 10}}
      render={renderChildren}
      />
  )
}
