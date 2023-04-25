import React from 'react'
import PropTypes from 'prop-types'
import DictionaryDetailData from 'components/DictionaryDetail/DictionaryDetailData'
import DictionaryDetailPresentation from 'components/DictionaryDetail/DictionaryDetailPresentation'
import DictionaryDetailPresentationDrawer from 'components/DictionaryDetail/DictionaryDetailPresentationDrawer'
import DictionaryDetailPresentationKids from 'components/DictionaryDetail/DictionaryDetailPresentationKids'
import Loading from 'components/Loading'

function DictionaryDetailContainer({ docId, docType, isDrawer, kids }) {
  const { actions, entry, isLoading, moreActions, sitename, backHandler } =
    DictionaryDetailData({ docId, docType })
  return (
    <Loading.Container isLoading={isLoading}>
      {isDrawer && (
        <DictionaryDetailPresentationDrawer
          actions={actions}
          entry={entry}
          moreActions={moreActions}
          sitename={sitename}
        />
      )}
      {kids && (
        <DictionaryDetailPresentationKids
          entry={entry}
          backHandler={backHandler}
        />
      )}
      {!isDrawer && !kids && (
        <DictionaryDetailPresentation
          actions={actions}
          entry={entry}
          moreActions={moreActions}
          sitename={sitename}
        />
      )}
    </Loading.Container>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
DictionaryDetailContainer.propTypes = {
  docId: string,
  docType: string.isRequired,
  isDrawer: bool,
  kids: bool,
}

export default DictionaryDetailContainer
