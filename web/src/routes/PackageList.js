import React from 'react'
import {graphql, QueryRenderer, createFragmentContainer} from 'react-relay'
import {Link} from 'react-router-dom'

import environment from '../environment'

const PackageItem = ({item}) => {

  return (
      <li><Link to={`/packages/edit/${item.id}`}>{item.name}</Link></li>
  )
}

const FragmentPackageItem = createFragmentContainer(
  PackageItem,
  graphql`
  fragment PackageList_item on Package {
    id
    name
    image
    video
  }
  `
)

const PackageList = () => {
  return (
      <QueryRenderer
    environment={environment}
    query={graphql`
          query PackageListQuery {
            packages {
              edges {
                node {
                  id
                  ...PackageList_item
                }
              }
            }
          }
        `}
    variables={{}}
    render={({error, props}) => {
      if (error) {
        return <div>Error!</div>;
      }
      if (!props) {
        return <div>Loading...</div>;
      }

      return (
          <div>
          <div>Package list</div>
          {props.packages.edges.map(e => <FragmentPackageItem key={e.node.id} item={e.node} />)}
        </div>
      );
    }}
      />
  );
}

export default PackageList
