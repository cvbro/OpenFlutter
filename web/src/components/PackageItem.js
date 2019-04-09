import React from 'react'
import {graphql, createFragmentContainer} from 'react-relay'
import {Link} from 'react-router-dom'

function ShowVideo(props) {
  const url = props.url ? props.url : '';
  if (props.url) {
    return <video autoPlay muted loop src={props.url} className={url ? '' : 'd_none'}></video>;
  } else {    
    return <video autoPlay muted loop className={url ? '' : 'd_none'}></video>;
  }
}

function PlayerBtn(props) {
  let {item,index,hasVideo} = props
  hasVideo = hasVideo ? hasVideo : '';
  const playerVideo = function (event, item, index) {
    props.playerVideo && props.playerVideo(event.currentTarget, item, index)
  }
  return <div className={hasVideo ? 'd_none playerBtn' : 'playerBtn'} onClick={ event=>{playerVideo(event, item, index)} } ></div>;
}

const VideoComp = props => <ShowVideo url={props.url || ''}></ShowVideo>

const PackageItem = ({index, node, videoIndex, btnIndex, playerVideo, onMouseEnter, onMouseLeave}) => {

  return (
    <li className="main-item fl" key={node.id} >
      <div className="file-box" onMouseEnter={event => { onMouseEnter(event, node, index) }} onMouseLeave={event => { onMouseLeave(event, node, index) }}>
        <div className="main-img" style={{backgroundImage: `url(${node.image})`}}></div>
        <VideoComp url={videoIndex == index ? node.video : ''}></VideoComp>
        <PlayerBtn className="playerBtn" hasVideo={btnIndex !== index && node.video} index={index} item={node} playerVideo={playerVideo} ></PlayerBtn>
      </div>
      <div className="main-title">{node.name} {node.version}</div>
      <div className="limit clear">
        <span className="fl"></span>
        <span className="fl"></span>
      </div>
    </li>
  )
}

export default createFragmentContainer(
  PackageItem,
  graphql`
fragment PackageItem_node on Package {
  id
  name
  version
  image
  video
}
`
)
