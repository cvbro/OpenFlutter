import React, { Component, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import Dropzone, { useDropzone } from 'react-dropzone'

import PackageImporter from '../components/PackageImporter'
import GoBack from '../components/GoBack'

const mutation = gql`
mutation($image: File, $video: File) {
  updatePackage(input: {id: 1, image: $image, video: $video}) {
    package {
      id
      name
      image
      video
    }
  }
}
`

const VideoUploader = ({onAccepted, files}) => {

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'video/*',
    multiple: false,
    onDrop: acceptedFiles => onAccepted(acceptedFiles) 
  })

  return (
    <span>
      <span {...getRootProps()}>
        <input {...getInputProps()} />
        {files ? <span>{ files.map(file => file.name).join(', ') }</span> : <input type='button' value='上传'></input>}
      </span>
    </span>
  )
}

const ImageUploader = ({updateUser}) => {
  const [files, setFiles] = useState([]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFiles => {
      updateUser({
        variables: {
          image: acceptedFiles[0]
        }
      })
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    }
  })

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          />
      </div>
    </div>
  ))

  return (
    <span>
      <span {...getRootProps()}>
        <input {...getInputProps()} />
        <input type='button' value='上传'></input>
      </span>
      <span style={thumbsContainer}>
        {thumbs}
      </span>
    </span>
  )
}

const PackageForm = () => {

  const [record, setRecord] = useState({})

  console.log(record)


  return (
    <Mutation
      mutation={mutation}
      context={{ hasUpload: true }}
      onCompleted={data => console.log(data) }
      >
      {(updatePackage, { loading }) => (
        <section>
          <div>
            <PackageImporter onCompleted={record=>setRecord(record)} onError={()=> setRecord({})} />
          </div>
          <div>
            <label>pub url:</label>
            <span>{record.pubUrl}</span>
          </div>
          <div>
            <label>repository url:</label>
            <span>{record.repositoryUrl}</span>
          </div>
          <div>
            <label>image:</label>
            <ImageUploader updateUser={updatePackage} />
          </div>
          <div>
            <label>video:</label>
            <VideoUploader onAccepted={video_files => setRecord({ ...record, video_files })} files={record.video_files } />
          </div>
          <input type='submit' onClick={()=>updatePackage({variables: { image: record.image_file, video: record.video_files[0] }})} />
          <GoBack />
        </section>
      )}
    </Mutation>
  )
}

export default class NewPackage extends Component {

  render() {
    return (
      <main style={container}>
        <article>
          <h1>new package</h1>
          <PackageForm />
        </article>
      </main>
    )
  }
}

const container = {
  minWidth: '1200px',
  maxWidth: '1400px',
  margin: '0 auto'
}

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
