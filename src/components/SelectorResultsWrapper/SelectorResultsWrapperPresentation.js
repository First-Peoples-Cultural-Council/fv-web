import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'

function SelectorResultsWrapperPresentation({
  hasResults,
  resultsSection,
  isLoading,
  loadRef,
}) {
  return (
    <Loading.Container
      data-testid="SelectorResultsWrapperPresentation"
      isLoading={isLoading}
    >
      {hasResults && (
        <div>
          {resultsSection}
          <div ref={loadRef} className="w-full h-10" />
        </div>
      )}
      {!hasResults && (
        <div className="w-full min-h-screen flex col-span-1 md:col-span-3 xl:col-span-4">
          <div className="mx-6 mt-4 text-lg text-center md:mx-auto md:mt-20">
            Sorry, there are no results for this search.
          </div>
        </div>
      )}
    </Loading.Container>
  )
}

// PROPTYPES
const { bool, node, object } = PropTypes
SelectorResultsWrapperPresentation.propTypes = {
  hasResults: bool,
  resultsSection: node,
  isLoading: bool,
  loadRef: object,
}

export default SelectorResultsWrapperPresentation
