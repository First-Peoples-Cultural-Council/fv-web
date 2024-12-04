import React from 'react'
import PropTypes from 'prop-types'
import DictionaryDetailData from 'components/DictionaryDetail/DictionaryDetailData'
import DictionaryDetailPresentation from 'components/DictionaryDetail/DictionaryDetailPresentation'
import DictionaryDetailPresentationDrawer from 'components/DictionaryDetail/DictionaryDetailPresentationDrawer'
import DictionaryDetailPresentationKids from 'components/DictionaryDetail/DictionaryDetailPresentationKids'
import LoadOrError from 'components/LoadOrError'
import { useParams } from 'react-router-dom'

function DictionaryDetailContainer({ id, sitename, isDrawer, kids }) {
  const { sitename: sitenameParams } = useParams()
  const sitenameToSend = sitename || sitenameParams

  const {
    actions,
    backHandler,
    dictionaryEntryQueryReturn,
    entry,
    moreActions,
  } = DictionaryDetailData({ id, sitename: sitenameToSend })

  return (
    <LoadOrError queryReturn={dictionaryEntryQueryReturn}>
      {isDrawer && (
        <DictionaryDetailPresentationDrawer
          actions={actions}
          entry={entry}
          moreActions={moreActions}
          sitename={sitenameToSend}
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
          sitename={sitenameToSend}
        />
      )}
    </LoadOrError>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
DictionaryDetailContainer.propTypes = {
  id: string,
  sitename: string,
  isDrawer: bool,
  kids: bool,
}

export default DictionaryDetailContainer
