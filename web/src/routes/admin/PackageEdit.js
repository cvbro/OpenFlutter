import React, {useState} from 'react'
import qs from 'qs'
import _ from 'lodash'
import {commitMutation, graphql, QueryRenderer} from 'react-relay'
import Select from 'react-select';
import {HashLink as Link} from 'react-router-hash-link'

import environment from '../../environment'
import FileUploader from '../../components/FileUploader'

const updateMutation = graphql`
mutation PackageEditUpdateMutation($input: UpdatePackageInput!){
  updatePackage(input: $input) {
    package {
      id
      name
      video
      image
    }
  }
}
`

const createMutation = graphql`
mutation PackageEditCreateMutation($input: CreatePackageInput!){
  createPackage(input: $input) {
    package {
      id
      name
      video
      image
    },
    errors
  }
}
`

const commit = (environment, payload, onCompleted) => {

  const mutation = payload.id ? updateMutation : createMutation

  const variables = {
    input: _.pick(payload, ['id', 'name', 'categoryIds'])
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      uploadables: _.pick(payload, ['image', 'video']),
      onCompleted,
    })
}


const Form = props => {

  const {action, viewer} = props

  const categoryOptions = _.flatten(viewer.categories.edges.map(edge => {
    return edge.node.children.map(child => {
      return {value: child.id, label: edge.node.name + ' --- ' +child.name}
    })
  }))

  const record = props.node || {categories: []}

  const [node, setNode] = useState({ categoryIds: [], errors: [], success: false })

  const handleSubmit = () => {

    const payload = {
      id: record.id,
      name: record.name || node.name,
      categoryIds: node.categoryIds.map(option=>option.value)
    }

    if (!_.isEmpty(node.imageFiles)) {
      payload['image'] = node.imageFiles[0]
    }

    if (!_.isEmpty(node.videoFiles)) {
      payload['video'] = node.videoFiles[0]
    }

    commit(environment, payload, response => {
      const data = response['createPackage'] || response['updatePackage']
      if (data['errors']) {
        setNode({...node, errors: data['errors']})
      } else {
        setNode({...node, success: true, errors: []})
      }
    })
  }

  const categoryIds = record.categories.map(cat => cat.id)
  const displaySelectedOptions = _.isEmpty(record.categories) ?
        node.categoryIds :
        _.filter(categoryOptions, option => categoryIds.includes(option.value) )

  return (
    <form onSubmit={handleSubmit}>
      {
        node.success && <div className="alert alert-success">Success</div>
      }
      {
        !_.isEmpty(node.errors) && <div className="alert alert-danger" role="alert">{node.errors.join(', ')}</div>
      }
      <div className="form-group">
        <label htmlFor="inputName">Name:</label>
        <input value={node.name || record.name || ''} onChange={e => setNode({...node, name: e.target.value}) } className="form-control" id="inputName" placeholder="" />
      </div>
      <div className="form-group">
        <label htmlFor="inputImage">Image:</label>
        <FileUploader className="form-control-file" id="inputImage" files={node.imageFiles} accept="image/*" onChange={imageFiles=>setNode({...node, imageFiles})} />
          <small id="emailHelp" className="form-text text-muted">{record.image}</small>
      </div>
      <div className="form-group">
        <label htmlFor="inputVideo">Video:</label>
        <FileUploader className="form-control-file" id="inputVideo" files={node.videoFiles} accept="video/*" onChange={videoFiles=>setNode({...node, videoFiles})} />
          <small id="emailHelp" className="form-text text-muted">{record.video}</small>
      </div>
      <div className="form-group">
        <label htmlFor="inputVideo">Categories:</label>
        <Select
          isSearchable={true}
          isMulti={true}
          value={  displaySelectedOptions }
          onChange={ option => setNode({...node, categoryIds: option }) }
          options={categoryOptions}
          />
      </div>
      <Link to='/admin/#packages' className="btn btn-link">Back</Link>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    )
  }

const query = graphql`
query PackageEditQuery($id: ID!, $withNode: Boolean!) {
  viewer{
    categories {
      edges {
        node {
          id
          name
          children {
            id
            name
          }
        }
      }
    }
  }
  node(id: $id) @include(if: $withNode) {
    id
    ... on Package{
      name
      image
      video
      categories {
        id
        name
      }
    }
  }
}
`

export default props => {

  const id = props.match.params.id

  const variables = id === 'new' ? {withNode:false} : {id, withNode:true}

  return (
    <div className="light height-full">
      <div className="container">
        <h1>Package</h1>
        <QueryRenderer
          environment={environment}
          query={query}
          variables={{id, withNode: id !== 'new'}}
          render={({error, props}) => props && <Form action={ id === 'new' ? 'new' : 'edit' } {...props} />}
          >
        </QueryRenderer>
      </div>
    </div>
  )
}


