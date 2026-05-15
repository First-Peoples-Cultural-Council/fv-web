import React from 'react'
import PropTypes from 'prop-types'

import AlphabetPresentation from 'components/Alphabet/AlphabetPresentation'
import AlphabetData from 'components/Alphabet/AlphabetData'
import LoadOrError from 'components/LoadOrError'

function AlphabetContainer({ kids = null }) {
  const { queryResponse, selectedData, sitename, drawerOpen, setDrawerOpen } =
    AlphabetData()

  return (
    <LoadOrError queryResponse={queryResponse}>
      <AlphabetPresentation
        characters={queryResponse?.data?.results || []}
        links={queryResponse?.data?.relatedLinks || []}
        selectedData={selectedData}
        sitename={sitename}
        kids={kids}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </LoadOrError>
  )
}

const { bool } = PropTypes

AlphabetContainer.propTypes = {
  widgetView: bool,
  kids: bool,
}

export default AlphabetContainer
