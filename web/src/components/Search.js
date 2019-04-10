import React, { useState } from 'react'
import {withRouter} from 'react-router'
import qs from 'qs'
import _ from 'lodash'

const Search = props => {
  const {location, history, match} = props
  const params = qs.parse(location.search, {ignoreQueryPrefix:true})
  const [keyword, setKeyword] = useState(params['keyword'])


  const handleSearch = () => {
    history.push({
      pathname: match.path,
      search: qs.stringify({...params, keyword: _.isEmpty(keyword) ? null : keyword }),
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
