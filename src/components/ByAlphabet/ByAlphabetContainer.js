import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ByAlphabetPresentation from 'components/ByAlphabet/ByAlphabetPresentation'
import ByAlphabetData from 'components/ByAlphabet/ByAlphabetData'
import Loading from 'components/Loading'

function ByAlphabetContainer({ kids = null }) {
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
    selectedTab,
    sitename,
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
        selectedTab={selectedTab}
        sitename={sitename}
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

export default ByAlphabetContainer
