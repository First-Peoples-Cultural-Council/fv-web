import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ByAlphabetPresentation from 'components/ByAlphabet/ByAlphabetPresentation'
import ByAlphabetKids from 'components/ByAlphabet/ByAlphabetKids'
import ByAlphabetData from 'components/ByAlphabet/ByAlphabetData'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function ByAlphabetContainer({ kids = null }) {
  const {
    characterQueryResponse,
    currentCharacter,
    searchType,
    setSearchType,
    labels,
    searchInfiniteQueryResponse,
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
      {kids ? (
        <ByAlphabetKids
          characters={characterQueryResponse?.data?.characters || []}
          currentCharacter={currentCharacter}
          searchType={searchType}
          searchInfiniteQueryResponse={searchInfiniteQueryResponse}
          sitename={sitename}
        />
      ) : (
        <ByAlphabetPresentation
          characters={characterQueryResponse?.data?.characters || []}
          currentCharacter={currentCharacter}
          searchType={searchType}
          setSearchType={setSearchType}
          labels={labels}
          searchInfiniteQueryResponse={searchInfiniteQueryResponse}
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
ByAlphabetContainer.propTypes = {
  kids: bool,
}

export default ByAlphabetContainer
