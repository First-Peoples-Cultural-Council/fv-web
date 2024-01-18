import React from 'react'
import PropTypes from 'prop-types'
import DictionaryDetailData from 'components/DictionaryDetail/DictionaryDetailData'
import DictionaryDetailPresentation from 'components/DictionaryDetail/DictionaryDetailPresentation'
import DictionaryDetailPresentationDrawer from 'components/DictionaryDetail/DictionaryDetailPresentationDrawer'
import DictionaryDetailPresentationKids from 'components/DictionaryDetail/DictionaryDetailPresentationKids'
import Loading from 'components/Loading'
import { useParams } from 'react-router-dom'

function DictionaryDetailContainer({ id, sitename, isDrawer, kids }) {
  const { sitename: sitenameParams } = useParams()
  const sitenameToSend = sitename || sitenameParams

  const { actions, entry, isLoading, moreActions, backHandler } =
    DictionaryDetailData({ id, sitename: sitenameToSend })

  return (
    <Loading.Container isLoading={isLoading}>
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
    </Loading.Container>
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
