import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC

import useSearchLoader from 'common/dataHooks/useSearchLoader'

function SongsAndStoriesData({ searchType, kids }) {
  const { sitename } = useParams()

  const _searchParams = `types=${searchType}&kids=${kids}`

  const { data, infiniteScroll, loadRef, isInitialLoading } = useSearchLoader({
    searchParams: _searchParams,
  })

  return {
    items: data || {},
    isLoading: isInitialLoading,
    infiniteScroll,
    sitename,
    loadRef,
  }
}

// PROPTYPES
const { string, bool } = PropTypes
SongsAndStoriesData.propTypes = {
  searchType: string.isRequired,
  kids: bool,
}

export default SongsAndStoriesData
