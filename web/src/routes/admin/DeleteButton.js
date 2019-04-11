import React, {useState} from 'react'
import {graphql, createRefetchContainer, QueryRenderer, commitMutation} from 'react-relay'
import environment from '../../environment'

const mutation = graphql`
mutation DeleteButtonMutation($input: DeletePackageInput!){
  deletePackage(input: $input) {
    packages {
      id
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


const DeleteButton = ({node, refetch}) => {

  const handleClick = () => {
    commit(
      environment,
      {
        ids: [node.id],
      },
      refetch
    )
  }

  return (
      <button onClick={handleClick} className="btn-sm mr-3 btn btn-outline-danger">Delete</button>
  )
}


export default DeleteButton
