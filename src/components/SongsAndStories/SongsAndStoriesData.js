import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC

import useSearchLoader from 'common/dataHooks/useSearchLoader'
import { useEffect } from 'react'

function SongsAndStoriesData({ searchType, kids }) {
  const { sitename } = useParams()

  const _searchParams = `types=${searchType}&kids=${kids}`

  const { data, infiniteScroll, loadRef, isInitialLoading, isError } =
    useSearchLoader({
      searchParams: _searchParams,
    })

  useEffect(() => {
    if (isError) {
      // This should not navigate to the error page. Instead, show the same page but with no results.
    }
  }, [isError])

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
