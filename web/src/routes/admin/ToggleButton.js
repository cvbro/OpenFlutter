import React, {useState} from 'react'
import {graphql, createRefetchContainer, QueryRenderer, commitMutation} from 'react-relay'
import environment from '../../environment'

const mutation = graphql`
mutation ToggleButtonMutation($input: UpdatePackageStatusInput!){
  updatePackageStatus(input: $input) {
    packages {
      id
      status
    }
    errors
  }
}
`

const commit = (environment, payload, onCompleted) => {
  commitMutation(
    environment,
    {
      mutation,
      variables: { input: _.pick(payload, ['ids', 'status']) },
      onCompleted,
    }
  )
}


const ToggleButton = ({node, refetch}) => {

  const status = ['展示中'].includes(node.status) ? 'publish' : 'hide'

  const handleToggle = () => {
    commit(
      environment,
      {
        ids: [node.id],
        status: node.status == '展示中' ? 'reedit' : 'publish'
      },
      refetch
    )
  }

  return (
      <button onClick={handleToggle} className="mr-3 btn-sm btn btn-outline-success" to={`/admin/packages/${node.id}`}>Toggle</button>
  )
}


export default ToggleButton
