import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadOrError from 'components/LoadOrError'

function SelectorResultsWrapperPresentation({
  infiniteQueryResponse,
  resultsSection,
}) {
  return (
    <LoadOrError
      data-testid="SelectorResultsWrapperPresentation"
      queryResponse={infiniteQueryResponse}
      height="h-96"
    >
      {infiniteQueryResponse?.data?.hasResults && <div>{resultsSection}</div>}
      {!infiniteQueryResponse?.data?.hasResults && (
        <div className="w-full min-h-screen flex col-span-1 md:col-span-3 xl:col-span-4">
          <div className="mx-6 mt-4 text-lg text-center md:mx-auto md:mt-20">
            Sorry, there are no results for this search.
          </div>
        </div>
      )}
    </LoadOrError>
  )
}

// PROPTYPES
const { node, object } = PropTypes
SelectorResultsWrapperPresentation.propTypes = {
  resultsSection: node,
  infiniteQueryResponse: object,
}

export default SelectorResultsWrapperPresentation
