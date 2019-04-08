import React, { useState, Component } from 'react'

import video1 from '../images/video1.mp4'
import video2 from '../images/video2.mp4'
import video3 from '../images/video3.mp4'
import video4 from '../images/video4.mp4'

import cs from 'classnames'
const PackageListItem = ({ item }) => {

  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <li className="main-item fl">
      <Player
        className="main-img"
        height="475px"
        width="264px"
        url={item.video}
        playing={playing}
        poster={item.image}
        onMouseOver={() => setPlaying(true)}
        onMouseOut={() => setPlaying(false)}
        progressInterval={500}
        onProgress={({ played }) => setProgress(played)}
      />
      <Line
        progress={progress}
        options={{ strokeWidth: 1 }}
      />
      <div className="main-title">{item.name}</div>
      <div className="limit clear">
        <a target='_blank' href={item.pubUrl} className="fl"><i className="fab fa-github" /></a>
        <a target='_blank' href={item.repositoryUrl} className="fl"><i className="fab fa-github" /></a>
      </div>
    </li>
  )
}



function ShowVideo(props) {
  const url = props.url ? props.url : '';
  return <video autoPlay muted loop src={props.url} className={cs({ d_none: url ? false : true })}></video>;
}

function VideoComp(props) {
  const url = props.url ? props.url : '';

  return <ShowVideo url={props.url}></ShowVideo>;

}

function PlayerBtn(props) {
  let {item,index,hasVideo} = props
  hasVideo = hasVideo ? hasVideo : '';
  const playerVideo = function (event, item, index) {
    props.playerVideo && props.playerVideo(event.currentTarget, item, index)
  }
  return <div className={cs({ d_none: hasVideo ? true : false, playerBtn: true })} onClick={ event=>{playerVideo(event, item, index)} }></div>;
}

class PackageList extends Component {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.playerVideo = this.playerVideo.bind(this)
    // this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      videoIndex: -1,
      btnIndex: -1,
      mainList: [
        {
          id: 1,
          title: "这是标题",
          videoWidth: 864,
          videoHeight: 486,
          videoUrl: video1
        },
        {
          id: 2,
          title: "这是标题",
          videoWidth: 864,
          videoHeight: 486,
          videoUrl: video2
        },
        {
          id: 3,
          title: "这是标题",
          videoWidth: 544,
          videoHeight: 960,
          videoUrl: video3
        },
        {
          id: 4,
          title: "这是标题",
          videoWidth: 720,
          videoHeight: 1280,
          videoUrl: video4
        },
        {
          id: 5,
          title: "这是标题",
          videoWidth: 544,
          videoHeight: 960,
          videoUrl: video3
        },
        {
          id: 6,
          title: "这是标题",
          videoWidth: 720,
          videoHeight: 1280,
          videoUrl: video4
        }
      ]
    }

  }
  playerVideo(e, item, index) {
    
    // return
    this.setState({
      videoIndex: index
    })

    let k = item.videoWidth / item.videoHeight; //视频宽高比例
    const KK = 1.05; //视频长宽放大1.05倍
    let video = e.parentElement.querySelector('video'), //视频的dom节点
      img = e.parentElement.querySelector('.main-img'), //图片的dom节点
      imgW = img.offsetWidth,//图片的宽度
      imgH = img.offsetHeight,//图片的高度
      imgk = imgW / imgH, //图片宽高比例
      ori = k > imgk ? true : false;  //视频宽高比例跟图片宽高比例对比
    // video.src = item.videoUrl;
    if (ori) {
      if (k >= 1) {
        video.style.width = imgW * k * KK + "px";
        video.style.height = imgH * KK + "px";
        video.style.background = "#000"
      } else {
        video.style.width = imgW / k * KK + "px";
        video.style.height = imgH * KK + "px";
        e.parentElement.style.overflow = 'hidden';
      }

    } else {
      video.style.width = imgW * KK + "px";
      video.style.height = "auto";
      e.parentElement.style.overflow = 'hidden';
    }

  }
  onMouseLeave(e, item, index) {

    this.setState({
      btnIndex:-1,
      videoIndex: -1
    })
  }
  onMouseEnter(e, item, index) {
    
    this.setState({
      btnIndex: index
    })
  }
  render() {
    return (
      <ul className="main-list clear">
        {
          this.state.mainList.map((item, index) => (
            <li className="main-item fl" key={item.id} >
              <div className="file-box" onMouseEnter={event => { this.onMouseEnter(event, item, index) }} onMouseLeave={event => { this.onMouseLeave(event, item, index) }}>
                <div className="main-img"></div>
                <VideoComp url={this.state.videoIndex == index ? item.videoUrl : ''}></VideoComp>
                <PlayerBtn className="playerBtn" hasVideo={this.state.btnIndex !== index && item.videoUrl} index={index} item={item} playerVideo={this.playerVideo} ></PlayerBtn>
              </div>
              <div className="main-title">{item.title}</div>
              <div className="limit clear">
                <span className="fl"></span>
                <span className="fl"></span>
              </div>
            </li>
          ))
        }
      </ul >
    )
  }
}


export default PackageList
