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
    characterQueryReturn,
    currentCharacter,
    searchType,
    setSearchType,
    entryLabel,
    searchQueryReturn,
    moreActions,
    selectedTab,
    sitename,
    tabs,
  } = ByAlphabetData({ kids })
  return (
    <LoadOrError queryReturn={characterQueryReturn}>
      <SiteDocHead
        titleArray={[currentCharacter?.title, 'Dictionary']}
        description={`Dictionary entries that start with ${currentCharacter?.title}.`}
      />
      <ByAlphabetPresentation
        actions={actions}
        characters={characterQueryReturn?.data?.characters || []}
        currentCharacter={currentCharacter}
        searchType={searchType}
        setSearchType={setSearchType}
        entryLabel={entryLabel}
        infiniteScroll={searchQueryReturn?.infiniteScroll}
        loadRef={searchQueryReturn?.loadRef}
        isLoading={searchQueryReturn?.isPending}
        items={searchQueryReturn?.data || {}}
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
