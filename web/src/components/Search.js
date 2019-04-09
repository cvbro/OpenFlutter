import React, { useState } from 'react'
import {withRouter} from 'react-router'

const Search = props => {
  const {location, history, match} = props
  const params = new URLSearchParams(location.search);
  const [keyword, setKeyword] = useState(params.get('keyword'))

  const handleSearch = () => {
    if (!keyword) {
      return history.push({pathname: match.path})
    }
    history.push({
      pathname: match.path,
      search: `?keyword=${keyword}`,
    })
  }

  return (
      <div className="search clear">
      <input type="text" className="fl" placeholder="搜索" onChange={e => setKeyword(e.target.value)} value={keyword || ''}/>
      <span className="fl" onClick={handleSearch}></span>
      </div>
  )
}

export default withRouter(Search)
