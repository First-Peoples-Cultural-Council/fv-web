import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'

function InfiniteLoadBtn({ infiniteQueryResponse }) {
  const { loadRef } = useIntersectionObserver({
    hasNextPage: infiniteQueryResponse?.hasNextPage,
    fetchNextPage: infiniteQueryResponse?.fetchNextPage,
  })

  const getLoadLabel = () => {
    if (infiniteQueryResponse?.isFetchingNextPage) {
      return 'Loading more...'
    }
    if (infiniteQueryResponse?.hasNextPage) {
      return 'Load more'
    }
    return 'End of results.'
  }
  return (
    <div data-testid="InfiniteLoadBtn" className="text-center w-full">
      <div ref={loadRef} className="w-full h-10" />
      <button
        data-testid="load-btn"
        type="button"
        className={`${
          !infiniteQueryResponse?.hasNextPage ? 'cursor-text' : ''
        } p-3 mx-auto text-charcoal-900 font-medium print:hidden`}
        onClick={() => infiniteQueryResponse?.fetchNextPage()}
        disabled={
          !infiniteQueryResponse?.hasNextPage ||
          infiniteQueryResponse?.isFetchingNextPage
        }
      >
        {getLoadLabel()}
      </button>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes
InfiniteLoadBtn.propTypes = {
  infiniteQueryResponse: object,
}

export default InfiniteLoadBtn