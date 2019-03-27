import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Loading from './Loading'
import Error from './Error'

const PackageListItem = ({item}) => (
  <li className="main-item fl">
    <div className="main-img"></div>
    <div className="main-title">{item.name}</div>
    <div className="limit clear">
      <span className="fl"></span>
      <span className="fl"><i class="fab fa-github"></i></span>
    </div>
  </li>
)

const PackageList = ({list}) => (
  <ul className="main-list clear">
    {list.map(item => <PackageListItem key={item.id} item={item} />)}
  </ul>
)

const query = gql`
{
  packages {
    id
    name
    pubUrl
    repositoryUrl
  }
}
`

const WrappedPackageList = () => (
  <Query query={query}>
    {({loading, error, data}) => {

      if (loading) {
        return <p>Loading...</p>
      }


      if (error) {
        return <p>Error...</p>
      }

      return <PackageList list={data.packages} />
    }}
  </Query>
)


export default WrappedPackageList
