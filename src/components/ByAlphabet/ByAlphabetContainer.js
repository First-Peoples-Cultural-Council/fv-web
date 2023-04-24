import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ByAlphabetPresentation from 'components/ByAlphabet/ByAlphabetPresentation'
import ByAlphabetData from 'components/ByAlphabet/ByAlphabetData'
import Loading from 'components/Loading'

function ByAlphabetContainer({ kids }) {
  const {
    actions,
    characters,
    charactersAreLoading,
    currentCharacter,
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
  } = ByAlphabetData({ kids })
  return (
    <Loading.Container isLoading={charactersAreLoading}>
      <ByAlphabetPresentation
        actions={actions}
        characters={characters}
        currentCharacter={currentCharacter}
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
ByAlphabetContainer.propTypes = {
  kids: bool,
}

ByAlphabetContainer.defaultProps = {
  kids: false,
}

export default ByAlphabetContainer
