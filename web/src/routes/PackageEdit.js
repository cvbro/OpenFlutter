import React, { useState } from 'react'
import {graphql, commitMutation, QueryRenderer} from 'react-relay'
import {withRouter} from 'react-router'
import environment from '../environment'
import _ from 'lodash'

import FileUploader from '../components/FileUploader'

// class PackageEditMutation extends RelayClassic.Mutation {

//   getMutation() {
//     return RelayClassic.QL`
// mutation PackageEditMutation($input: UpdatePackageInput!) {
//   updatePackage(input: $input){
//     package {
//       name
//     }
//   }
// }
//     `;
//   }

//   getVariables() {
//     const { id, name } = this.props
//     return { id, name};
//   }
// }

const mutation = graphql`
mutation PackageEditMutation($input: UpdatePackageInput!) {
  updatePackage(input: $input){
    package {
      name
    }
  }
}
`;


function commit(
  environment,
  payload
) {
  // Now we just call commitMutation with the appropriate parameters
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: _.pick(payload, ['id', 'name']),
      },
      uploadables: { image: payload.image, video: payload.video }
    },
  );
}


const PackageEdit = ({match: { params: {id} }}) => {

  const [node, setNode] = useState({})

  const handleSubmit = () => {
    commit(environment, { id, name: node.name, image: node.imageFiles[0], video: node.videoFiles[0] })
  }

  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
          query PackageEditQuery($id: ID!) {
            node(id: $id) {
              id
              ... on Package{
                name
              }
            }
          }
      `}
      variables={{id: id}}
      render={({error, props}) => {

        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return (
          <div>
            <h1>Package Edit: {id}</h1>
            <div>
              <label>name:</label>
              <input value={node.name || props.node.name} onChange={e => setNode({...node, name: e.target.value}) } />
            </div>
            <div>
              <label>image:</label>
              <FileUploader files={node.imageFiles} accept="image/*" onChange={imageFiles=>setNode({...node, imageFiles})} />
            </div>
            <div>
              <label>video:</label>
              <FileUploader files={node.videoFiles} accept="video/*" onChange={videoFiles=>setNode({...node, videoFiles})} />
            </div>
            <input type="submit" onClick={handleSubmit} />
          </div>
        );
      }}
      />
  )
}


export default withRouter(PackageEdit)
