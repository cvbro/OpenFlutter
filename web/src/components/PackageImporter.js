import React, { Component, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const mutation = gql`
mutation($url: String!) {
  importPackage(input: {url: $url}) {
    package {
      id
      name
      image
      pubUrl
      repositoryUrl
    }
  }
}
`

const PackageImporter = ({importPackage, onError, onCompleted}) => {
  const [name, setName] = useState('')

  return (
    <Mutation
      mutation={mutation}
      onCompleted={data => onCompleted(data.importPackage.package) }
      onError={onError}
      >
      {(importPackage, { loading, error }) => (
        <span>
          <label>url: https://pub.flutter-io.cn/packages/</label>
          <input value={name} onChange={event=>setName(event.target.value)}/>
            <input type='button' disable={loading.toString()} value={'导入'} onClick={_ => importPackage({
                variables: {
                  url: `https://pub.flutter-io.cn/packages/${name}`
                }
              })} />
              { loading && <span>loading...</span> }
              { error && <span>{error.message}</span> }
        </span>
      )}
    </Mutation>
  )
}


export default PackageImporter
