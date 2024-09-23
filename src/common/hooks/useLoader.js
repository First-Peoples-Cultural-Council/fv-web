import { useRef } from 'react'
import PropTypes from 'prop-types'

// FPCC
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'

function useLoader({ response }) {
  const getLoadLabel = () => {
    if (response?.isFetchingNextPage) {
      return 'Loading more...'
    }
    if (response?.hasNextPage) {
      return 'Load more'
    }
    return 'End of results.'
  }

  const infiniteScroll = {
    fetchNextPage: response?.fetchNextPage,
    hasNextPage: response?.hasNextPage,
    isFetchingNextPage: response?.isFetchingNextPage,
    loadLabel: getLoadLabel(),
  }

  const loadRef = useRef(null)
  useIntersectionObserver({
    target: loadRef,
    onIntersect: response?.fetchNextPage,
    enabled: response?.hasNextPage,
  })

  return {
    infiniteScroll,
    loadRef,
  }
}

// PROPTYPES
const { obj } = PropTypes
useLoader.propTypes = {
  searchParams: obj,
}

export default useLoader
