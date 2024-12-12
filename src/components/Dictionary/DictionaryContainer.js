import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DictionaryPresentation from 'components/Dictionary/DictionaryPresentation'
import DictionaryData from 'components/Dictionary/DictionaryData'
import { TYPE_DICTIONARY } from 'common/constants'
import SiteDocHead from 'components/SiteDocHead'

function DictionaryContainer({ searchType = TYPE_DICTIONARY, kids = null }) {
  const { actions, infiniteQueryResponse, labels, moreActions, sitename } =
    DictionaryData({ searchType, kids })
  return (
    <>
      <SiteDocHead titleArray={[labels.titlecase]} />
      <DictionaryPresentation
        actions={actions}
        searchType={searchType}
        infiniteQueryResponse={infiniteQueryResponse}
        kids={kids}
        labels={labels}
        moreActions={moreActions}
        sitename={sitename}
      />
    </>
  )
}

// PROPTYPES
const { bool, string } = PropTypes

DictionaryContainer.propTypes = {
  searchType: string,
  kids: bool,
}

export default DictionaryContainer
