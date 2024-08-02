import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DictionaryPresentation from 'components/Dictionary/DictionaryPresentation'
import DictionaryData from 'components/Dictionary/DictionaryData'
import Loading from 'components/Loading'
import { TYPE_DICTIONARY } from 'common/constants'

function DictionaryContainer({ searchType = TYPE_DICTIONARY, kids = null }) {
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
    count,
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
        sitename={sitename}
        count={count}
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

export default DictionaryContainer
