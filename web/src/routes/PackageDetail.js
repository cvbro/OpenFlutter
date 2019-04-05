import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const query = gql`
query Package($name: String!) {
    package(name: $name) {
      id
      name
      images
      pubUrl
      repositoryUrl
    }
  }
`

const PackageDetail = ({match}) => {
  return (
    <Query query={query} variables={{ name: match.params.name }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{`Error!: ${error}`}</p>;

        return (
          <h1>{data.package.name}</h1>
        )
      }}
    </Query>
  )
}



export default PackageDetail
