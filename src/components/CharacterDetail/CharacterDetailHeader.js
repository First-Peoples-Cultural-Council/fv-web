import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioButton from 'components/AudioButton'
import CopyButton from 'components/Actions/CopyButton'

function CharacterDetailHeader({ characterData }) {
  return (
    <h1
      data-testid="character-detail-header"
      className="flex font-bold items-center text-5xl text-charcoal-900 mb-8 space-x-11"
    >
      <span>{characterData?.title}</span>
      {characterData?.relatedAudio?.length > 0 && (
        <AudioButton audioArray={characterData?.relatedAudio} />
      )}
      {characterData?.title && <CopyButton textToCopy={characterData?.title} />}
    </h1>
  )
}

// PROPTYPES
const { object } = PropTypes

CharacterDetailHeader.propTypes = {
  characterData: object,
}

export default CharacterDetailHeader
