import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ByAlphabetPresentation from 'components/ByAlphabet/ByAlphabetPresentation'
import ByAlphabetData from 'components/ByAlphabet/ByAlphabetData'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function ByAlphabetContainer({ kids = null }) {
  const {
    actions,
    characterQueryResponse,
    currentCharacter,
    searchType,
    setSearchType,
    entryLabel,
    searchInfiniteQueryResponse,
    moreActions,
    selectedTab,
    sitename,
    tabs,
  } = ByAlphabetData({ kids })
  return (
    <LoadOrError queryResponse={characterQueryResponse}>
      <SiteDocHead
        titleArray={[currentCharacter?.title, 'Dictionary']}
        description={`Dictionary entries that start with ${currentCharacter?.title}.`}
      />
      <ByAlphabetPresentation
        actions={actions}
        characters={characterQueryResponse?.data?.characters || []}
        currentCharacter={currentCharacter}
        searchType={searchType}
        setSearchType={setSearchType}
        entryLabel={entryLabel}
        searchInfiniteQueryResponse={searchInfiniteQueryResponse}
        kids={kids}
        moreActions={moreActions}
        selectedTab={selectedTab}
        sitename={sitename}
        tabs={tabs}
      />
    </LoadOrError>
  )
}

// PROPTYPES
const { bool } = PropTypes
ByAlphabetContainer.propTypes = {
  kids: bool,
}

export default ByAlphabetContainer
