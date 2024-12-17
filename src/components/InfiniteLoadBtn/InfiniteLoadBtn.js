import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function InfiniteLoadBtn({ infiniteQueryResponse }) {
  return (
    <div data-testid="InfiniteLoadBtn" className="text-center">
      <div ref={infiniteQueryResponse?.loadRef} className="w-full h-5" />
      <button
        data-testid="load-btn"
        type="button"
        className={`${
          !infiniteQueryResponse?.hasNextPage ? 'cursor-text' : ''
        } p-3  text-charcoal-900 font-medium print:hidden`}
        onClick={() => infiniteQueryResponse?.fetchNextPage()}
        disabled={
          !infiniteQueryResponse?.hasNextPage ||
          infiniteQueryResponse?.isFetchingNextPage
        }
      >
        {infiniteQueryResponse?.loadLabel}
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
