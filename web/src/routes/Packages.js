import React, { useState } from 'react'
import {graphql, QueryRenderer, createFragmentContainer, createPaginationContainer, createRefetchContainer} from 'react-relay'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'

import environment from '../environment'

import Layout from '../components/Layout'
import PackageList from '../components/PackageList'

const pageQuery = graphql`
query PackagesQuery($first: Int, $after: String, $keyword: String, $categoryId: ID) {
  viewer {
    ...PackageList_viewer @arguments(first: $first, after: $after, keyword: $keyword, categoryId: $categoryId)
  }
}
`

const Packages = ({location, match, history}) => {

  const params = new URLSearchParams(location.search)

  const renderChildren = ({error, props, retry}) => {
    if (!props) {
      return null
    }

    return <PackageList { ...props } />
  }

  return (
    <Layout>
      <QueryRenderer
        environment={environment}
        query={pageQuery}
        variables={{ first: 10, categoryId: params.get('category'), keyword: params.get('keyword') }}
        render={renderChildren}
        />
    </Layout>
  )
}

export default Packages
