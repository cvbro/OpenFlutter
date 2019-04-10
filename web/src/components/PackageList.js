import React, {useState} from 'react'
import {withRouter} from 'react-router'
import {graphql, createRefetchContainer} from 'react-relay'

import PackageItem from './PackageItem'

const PackageList = props => {
  const {viewer, relay, location, history, match} = props
  const [videoIndex, setVideoIndex] = useState(-1)
  const [btnIndex, setBtnIndex] = useState(-1)
  const keyword = new URLSearchParams(location.search).get('keyword')

  const getVideoRatioFromSnapshot = (url, callback) => new Promise((resole, reject) => {
    const img = new Image()
    img.src = `${url}?x-oss-process=video/snapshot,t_0,m_fast`
    if (img.complete) {
      resole({width: img.width, height: img.height})
    }else{
      img.onload = () => resole({width: img.width, height: img.height})
    }
  })

  const playerVideo = (e, item, index) => {
    setVideoIndex(index)
    getVideoRatioFromSnapshot(item.video).then(({width,height}) => {
      const k = width / height
      const KK = 1.05; //视频长宽放大1.05倍
      let video = e.parentElement.querySelector('video'), //视频的dom节点
          img = e.parentElement.querySelector('.main-img'), //图片的dom节点
          imgW = img.offsetWidth,//图片的宽度
          imgH = img.offsetHeight,//图片的高度
          imgk = imgW / imgH, //图片宽高比例
          ori = k > imgk ? true : false;  //视频宽高比例跟图片宽高比例对比

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
    }); //视频宽高比例
  }

  const onMouseLeave = (e, item, index) => {
    setBtnIndex(-1)
    setVideoIndex(-1)
  }

  const onMouseEnter = (e, item, index) => setBtnIndex(index)

  const refetch = () => {
    relay.refetch(
      fragmentVariables => {
        return { keyword, after: viewer.packages.pageInfo.endCursor }
      }
    )
  }

  const renderItems = () => {
    return viewer.packages.edges.map((edge, index) => {
      const itemProps = {
        index:index,
        onMouseEnter,
        onMouseLeave, 
        playerVideo,
        btnIndex,
        videoIndex,
        node:edge.node
      }
      return <PackageItem key={edge.node.id} {...itemProps} />
    })
  }

  return (
    <div>
      <ul className="main-list clear">
        {renderItems()}
      </ul >
      <div className="loadMore" onClick={refetch}>加载更多</div>
    </div>
    )
}

const paginationQuery = graphql`
query PackageListPaginationQuery(
  $first: Int!
  $after: String
  $keyword: String
) {
    viewer {
      ...PackageList_viewer @arguments(first: $first, after: $after, keyword: $keyword)
    }
}
`

export default createRefetchContainer(
  withRouter(PackageList),
  graphql`
fragment PackageList_viewer on Viewer
@argumentDefinitions(
  first: {type: "Int"}
  after: {type: "String"}
  keyword: {type: "String"}
  categoryId: {type: "ID"}
) {
  packages(
    first: $first
    after: $after
    keyword: $keyword
    categoryId: $categoryId
  ) @connection(key: "PackageList_packages") {
    edges {
      cursor
      node {
        id
        ...PackageItem_node
      }
    }
    pageInfo{
      endCursor
      startCursor 
    }
  }
}
`,
  paginationQuery
)
