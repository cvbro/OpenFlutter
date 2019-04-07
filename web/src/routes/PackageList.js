import React, { useState } from 'react'
import {graphql, QueryRenderer, createFragmentContainer, createPaginationContainer, createRefetchContainer} from 'react-relay'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'

import environment from '../environment'

const PackageItem = ({node}) => {
  return (
    <li><Link to={`/packages/edit/${node.id}`}>{node.name}</Link></li>
  )
}

const FragmentPackageItem = createFragmentContainer(
  PackageItem,
  graphql`
  fragment PackageList_node on Package {
    id
    name
    image
    video
  }
  `
)

const PackageList = ({viewer, relay, location, history, match}) => {

  const params = new URLSearchParams(location.search);

  const [keyword, setKeyword] = useState(params.get('keyword'))

  const _loadMore = () => {
    relay.refetch(
      fragmentVariables => {
        return { keyword, after: viewer.packages.pageInfo.endCursor }
      }
    )
  }

  const _search = () => {

    if (!keyword) {
      return history.push({pathname: match.path})
    }

    history.push({
      pathname: match.path,
      search: `?keyword=${keyword}`,
    })
  }
  
  return (
    <div>
      <input type="search" onChange={e => setKeyword(e.target.value)} value={keyword || ''} />
        <button onClick={() => _search()}>Search</button>
      <div>Package list</div>
      {viewer.packages.edges.map(edge => <FragmentPackageItem key={edge.node.id} node={edge.node} />)}
      <button onClick={() => _loadMore()}>Load More</button>
      </div>
      )
}

const PackageListWithRouter = withRouter(PackageList)

const RefetchContainer = createRefetchContainer(
  PackageListWithRouter,
  graphql`
      fragment PackageList_viewer on Viewer
      @argumentDefinitions(
        first: {type: "Int"}
        after: {type: "String"}
        keyword: {type: "String"}
      ) {
        packages(
          first: $first
          after: $after
          keyword: $keyword
        ) @connection(key: "PackageList_packages") {
          edges {
            cursor
            node {
              id
              ...PackageList_node
            }
          }
          pageInfo{
            endCursor
            startCursor 
          }
        }
      }
  `,
  graphql`
      query PackageListPaginationQuery(
        $first: Int!
        $after: String
        $keyword: String
      ) {
          viewer {
            ...PackageList_viewer @arguments(first: $first, after: $after, keyword: $keyword)
          }
      }
  `
)


const PackageListPage = ({location, match, history}) => {

  const params = new URLSearchParams(location.search);

  return (
<QueryRenderer
  environment={environment}
  query={graphql`
  query PackageListQuery($first: Int, $after: String, $keyword: String) {
  viewer {
  ...PackageList_viewer @arguments(first: $first, after: $after, keyword: $keyword)
  }
  }
  `}
  variables={{ first: 1, keyword: params.get('keyword') }}
  render={({error, props, retry}) => {

  if (!props) {
  return <p>Loading</p>
  }

  return (
    <RefetchContainer { ...props } />
  )
}}
/>
)

}

export default PackageListPage
