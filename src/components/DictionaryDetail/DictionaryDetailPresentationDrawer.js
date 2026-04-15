import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DictionaryDetailPrimary from 'components/DictionaryDetail/DictionaryDetailPrimary'
import DictionaryDetailSecondary from 'components/DictionaryDetail/DictionaryDetailSecondary'
import DictionaryDetailMedia from 'components/DictionaryDetail/DictionaryDetailMedia'

function DictionaryDetailPresentationDrawer({ entry, sitename }) {
  const noMedia = !(
    entry?.relatedImages?.length > 0 ||
    entry?.relatedVideos?.length > 0 ||
    entry?.relatedVideoLinks?.length > 0
  )
  return (
    <div
      data-testid="DictionaryDetailPresentationDrawer"
      className="p-6 space-y-7"
    >
      <DictionaryDetailPrimary entry={entry} sitename={sitename} />
      {noMedia ? null : <DictionaryDetailMedia entry={entry} />}
      <DictionaryDetailSecondary entry={entry} sitename={sitename} />
    </div>
  )
}
// PROPTYPES
const { object, string } = PropTypes
DictionaryDetailPresentationDrawer.propTypes = {
  entry: object,
  sitename: string,
}

export default DictionaryDetailPresentationDrawer
