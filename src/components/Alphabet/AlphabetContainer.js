import React from 'react'
import PropTypes from 'prop-types'

import AlphabetPresentation from 'components/Alphabet/AlphabetPresentation'
import AlphabetPlaceholder from 'components/Alphabet/AlphabetPlaceholder'
import AlphabetData from 'components/Alphabet/AlphabetData'
import AlphabetPresentationWidget from 'components/Alphabet/AlphabetPresentationWidget'
import LoadOrError from 'components/LoadOrError'

function AlphabetContainer({ widgetView = false, kids = null }) {
  const {
    characters,
    characterQueryReturn,
    links,
    onCharacterClick,
    onVideoClick,
    selectedData,
    sitename,
    videoIsOpen,
  } = AlphabetData()

  if (widgetView && characterQueryReturn?.isPending) {
    return <AlphabetPlaceholder />
  }

  return (
    <LoadOrError queryReturn={characterQueryReturn}>
      {widgetView ? (
        <AlphabetPresentationWidget
          characters={characters}
          links={links}
          onVideoClick={onVideoClick}
          onCharacterClick={onCharacterClick}
          selectedData={selectedData}
          videoIsOpen={videoIsOpen}
        />
      ) : (
        <AlphabetPresentation
          characters={characters}
          links={links}
          onVideoClick={onVideoClick}
          selectedData={selectedData}
          sitename={sitename}
          videoIsOpen={videoIsOpen}
          kids={kids}
        />
      )}
    </LoadOrError>
  )
}

const { bool } = PropTypes

AlphabetContainer.propTypes = {
  widgetView: bool,
  kids: bool,
}

export default AlphabetContainer
