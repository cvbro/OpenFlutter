import React from 'react'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'
import _ from 'lodash'

const FileUploader = ({ className, multiple=false, accept="*", onChange, files=[]}) => {

  const {getRootProps, getInputProps} = useDropzone({
    accept,
    multiple,
    onDrop: acceptedFiles => onChange && onChange(acceptedFiles) 
  })

  return (
      <div {...getRootProps()}>
      <input {...getInputProps()} />
      { _.isEmpty(files) ? <input type='button' value='浏览...'></input> : <span>{ files.map(file => file.name).join(', ') }</span>}
    </div>
  )
}

FileUploader.propTypes = {
  className: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  files: PropTypes.array,
}


export default FileUploader
