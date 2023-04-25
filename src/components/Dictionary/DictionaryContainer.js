import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

// FPCC
import DictionaryPresentation from 'components/Dictionary/DictionaryPresentation'
import DictionaryData from 'components/Dictionary/DictionaryData'
import DictionaryDataSearch from 'components/Dictionary/DictionaryDataSearch'
import Loading from 'components/Loading'

function DictionaryContainer({ searchType, kids }) {
  const location = useLocation()
  const searchTerm = new URLSearchParams(location?.search)?.get('q')

  return searchTerm?.length > 0 ? (
    <DictionarySearch searchType={searchType} kids={kids} />
  ) : (
    <DictionaryFull searchType={searchType} kids={kids} />
  )
}

function DictionaryFull({ searchType, kids }) {
  const {
    actions,
    infiniteScroll,
    isLoading,
    isLoadingEntries,
    items,
    labels,
    moreActions,
    onSortByClick,
    sitename,
    sorting,
    loadRef,
  } = DictionaryData({ searchType, kids })
  return (
    <Loading.Container isLoading={isLoading}>
      <DictionaryPresentation
        actions={actions}
        searchType={searchType}
        infiniteScroll={infiniteScroll}
        isLoadingEntries={isLoadingEntries}
        items={items}
        kids={kids}
        labels={labels}
        loadRef={loadRef}
        moreActions={moreActions}
        onSortByClick={onSortByClick}
        sitename={sitename}
        sorting={sorting}
      />
    </Loading.Container>
  )
}

function DictionarySearch({ searchType, kids }) {
  const {
    actions,
    infiniteScroll,
    isLoading,
    isLoadingEntries,
    items,
    labels,
    moreActions,
    sitename,
    loadRef,
  } = DictionaryDataSearch({ searchType })
  return (
    <Loading.Container isLoading={isLoading}>
      <DictionaryPresentation
        actions={actions}
        searchType={searchType}
        infiniteScroll={infiniteScroll}
        isLoadingEntries={isLoadingEntries}
        items={items}
        kids={kids}
        labels={labels}
        loadRef={loadRef}
        moreActions={moreActions}
        sitename={sitename}
      />
    </Loading.Container>
  )
}

// PROPTYPES
const { bool, string } = PropTypes

DictionaryContainer.propTypes = {
  searchType: string,
  kids: bool,
}

DictionaryContainer.defaultProps = {
  searchType: 'WORD_AND_PHRASE',
  kids: false,
}

DictionaryFull.propTypes = {
  searchType: string,
  kids: bool,
}

DictionaryFull.defaultProps = {
  searchType: 'WORD_AND_PHRASE',
  kids: false,
}

DictionarySearch.propTypes = {
  searchType: string,
  kids: bool,
}

DictionarySearch.defaultProps = {
  searchType: 'WORD_AND_PHRASE',
  kids: false,
}

export default DictionaryContainer
