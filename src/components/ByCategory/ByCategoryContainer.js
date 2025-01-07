import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ByCategoryPresentation from 'components/ByCategory/ByCategoryPresentation'
import ByCategoryKids from 'components/ByCategory/ByCategoryKids'
import ByCategoryData from 'components/ByCategory/ByCategoryData'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'
function ByCategoryContainer({ kids = null }) {
  const {
    categoriesQueryResponse,
    currentCategory,
    currentParentCategory,
    searchType,
    setSearchType,
    labels,
    searchInfiniteQueryResponse,
    selectedTab,
    sitename,
    tabs,
  } = ByCategoryData({ kids })
  return (
    <LoadOrError queryResponse={categoriesQueryResponse}>
      <SiteDocHead titleArray={[currentCategory?.title, 'Category']} />
      {kids ? (
        <ByCategoryKids
          categories={categoriesQueryResponse?.data?.results || []}
          currentCategory={currentCategory}
          currentParentCategory={currentParentCategory}
          searchInfiniteQueryResponse={searchInfiniteQueryResponse}
          searchType={searchType}
          sitename={sitename}
        />
      ) : (
        <ByCategoryPresentation
          categories={categoriesQueryResponse?.data?.results || []}
          currentCategory={currentCategory}
          currentParentCategory={currentParentCategory}
          searchInfiniteQueryResponse={searchInfiniteQueryResponse}
          searchType={searchType}
          setSearchType={setSearchType}
          labels={labels}
          selectedTab={selectedTab}
          sitename={sitename}
          tabs={tabs}
        />
      )}
    </LoadOrError>
  )
}

// PROPTYPES
const { bool } = PropTypes
ByCategoryContainer.propTypes = {
  kids: bool,
}

export default ByCategoryContainer
