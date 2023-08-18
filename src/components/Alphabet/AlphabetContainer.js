import React from 'react'
import PropTypes from 'prop-types'

import AlphabetPresentation from 'components/Alphabet/AlphabetPresentation'
import AlphabetPlaceholder from 'components/Alphabet/AlphabetPlaceholder'
import AlphabetData from 'components/Alphabet/AlphabetData'
import AlphabetPresentationWidget from 'components/Alphabet/AlphabetPresentationWidget'
import Loading from 'components/Loading'

function AlphabetContainer({ widgetView, kids }) {
  const {
    characters,
    isLoading,
    links,
    onCharacterClick,
    onVideoClick,
    selectedData,
    sitename,
    videoIsOpen,
  } = AlphabetData({ widgetView })

  if (widgetView && isLoading) {
    return <AlphabetPlaceholder />
  }

  return widgetView ? (
    <Loading.Container isLoading={isLoading}>
      <AlphabetPresentationWidget
        characters={characters}
        links={links}
        onVideoClick={onVideoClick}
        onCharacterClick={onCharacterClick}
        selectedData={selectedData}
        videoIsOpen={videoIsOpen}
      />
    </Loading.Container>
  ) : (
    <Loading.Container isLoading={isLoading}>
      <AlphabetPresentation
        characters={characters}
        links={links}
        onVideoClick={onVideoClick}
        selectedData={selectedData}
        sitename={sitename}
        videoIsOpen={videoIsOpen}
        kids={kids}
      />
    </Loading.Container>
  )
}

const { bool } = PropTypes

AlphabetContainer.propTypes = {
  widgetView: bool,
  kids: bool,
}

AlphabetContainer.defaultProps = {
  widgetView: false,
  kids: false,
}

export default AlphabetContainer
