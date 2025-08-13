import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function PaginationControlsPresentation({
  hasNextPage,
  isPlaceholderData,
  numberOfPages,
  page,
  setPage,
}) {
  return numberOfPages <= 1 ? (
    ''
  ) : (
    <div id="PaginationControlsPresentation" className="mx-auto max-w-lg mt-5">
      <nav className="flex items-center justify-center space-x-2">
        <button
          data-testid="prev-page-btn"
          type="button"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="btn-tertiary btn-md-icon bg-charcoal-100"
        >
          {getIcon('ChevronLeft')}
          <span className="sr-only">Previous page</span>
        </button>

        {/* Page Numbers */}
        {[...Array(numberOfPages)].map((_page, index) => {
          const btnStyling =
            page === index + 1
              ? 'btn-tertiary btn-sm-icon'
              : 'btn-tertiary btn-sm-icon bg-charcoal-100'
          return (
            <button
              key={index}
              data-testid={`page-${index + 1}-btn`}
              type="button"
              onClick={() => setPage(index + 1)}
              aria-current="page"
              className={btnStyling}
            >
              {index + 1}
            </button>
          )
        })}

        <button
          data-testid="next-page-btn"
          type="button"
          onClick={() => {
            if (!isPlaceholderData && hasNextPage) {
              setPage((old) => old + 1)
            }
          }}
          // Disable the Next Page button until we know a next page is available
          // See https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries for info on placeholder data
          disabled={isPlaceholderData || !hasNextPage}
          className="btn-tertiary btn-md-icon bg-charcoal-100"
        >
          {getIcon('ChevronRight')}
          <span className="sr-only">Next page</span>
        </button>
      </nav>
    </div>
  )
}
// PROPTYPES
const { bool, func, number } = PropTypes
PaginationControlsPresentation.propTypes = {
  numberOfPages: number,
  isPlaceholderData: bool,
  hasNextPage: bool,
  page: number,
  setPage: func,
}

export default PaginationControlsPresentation
