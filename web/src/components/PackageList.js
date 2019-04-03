import React, {useState} from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Player from 'react-player'
import ProgressBar from '../components/ProgressBar'
const Line = ProgressBar.Line

import Loading from './Loading'
import Error from './Error'

const PackageListItem = ({item}) => {

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
        onMouseOver={()=>setPlaying(true)}
        onMouseOut={()=>setPlaying(false)}
        progressInterval={500}
        onProgress={({played})=> setProgress(played)}
        />
        <Line
          progress={progress}
          options={{strokeWidth: 1}}
          />
      <div className="main-title">{item.name}</div>
      <div className="limit clear">
        <a target='_blank' href={item.pubUrl} className="fl"><i className="fab fa-github" /></a>
        <a target='_blank' href={item.repositoryUrl} className="fl"><i className="fab fa-github" /></a>
      </div>
    </li>
  )
}

const PackageList = ({list}) => (
  <ul className="main-list clear">
    {list.map(item => <PackageListItem key={item.id} item={item} />)}
  </ul>
)

const query = gql`
{
  packages {
    id
    name
    image
    video
    pubUrl
    repositoryUrl
  }
}
`

const WrappedPackageList = () => (
  <Query query={query}>
    {({loading, error, data}) => {

      if (loading) {
        return <p>Loading...</p>
      }


      if (error) {
        return <p>Error...</p>
      }

      return <PackageList list={data.packages} />
    }}
  </Query>
)


export default WrappedPackageList
