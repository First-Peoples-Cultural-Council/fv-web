import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ByCategoryPresentation from 'components/ByCategory/ByCategoryPresentation'
import ByCategoryData from 'components/ByCategory/ByCategoryData'
import Loading from 'components/Loading'
function ByCategoryContainer({ kids }) {
  const {
    actions,
    categories,
    categoriesAreLoading,
    currentCategory,
    currentParentCategory,
    searchType,
    setSearchType,
    entryLabel,
    infiniteScroll,
    loadRef,
    isLoading,
    items,
    moreActions,
    onSortByClick,
    selectedTab,
    sitename,
    sorting,
    tabs,
  } = ByCategoryData({ kids })
  return (
    <Loading.Container isLoading={categoriesAreLoading}>
      <ByCategoryPresentation
        actions={actions}
        categories={categories}
        currentCategory={currentCategory}
        currentParentCategory={currentParentCategory}
        searchType={searchType}
        setSearchType={setSearchType}
        entryLabel={entryLabel}
        infiniteScroll={infiniteScroll}
        loadRef={loadRef}
        isLoading={isLoading}
        items={items}
        kids={kids}
        moreActions={moreActions}
        onSortByClick={onSortByClick}
        selectedTab={selectedTab}
        sitename={sitename}
        sorting={sorting}
        tabs={tabs}
      />
    </Loading.Container>
  )
}

// PROPTYPES
const { bool } = PropTypes
ByCategoryContainer.propTypes = {
  kids: bool,
}

ByCategoryContainer.defaultProps = {
  kids: false,
}

export default ByCategoryContainer
