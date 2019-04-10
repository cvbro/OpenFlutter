import React from 'react'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'
import _ from 'lodash'

const FileUploader = ({ multiple=false, accept="*", onChange, files=[]}) => {

  const {getRootProps, getInputProps} = useDropzone({
    accept,
    multiple,
    onDrop: acceptedFiles => onChange && onChange(acceptedFiles) 
  })

  return (
      <span>
      <span {...getRootProps()}>
      <input {...getInputProps()} />
      { _.isEmpty(files) ? <input type='button' value='上传'></input> : <span>{ files.map(file => file.name).join(', ') }</span>}
    </span>
      </span>
  )
}

FileUploader.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  files: PropTypes.array,
}


export default FileUploader
