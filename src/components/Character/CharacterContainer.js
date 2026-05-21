import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

// FPCC
import { useCharacter } from 'common/dataHooks/useCharacters'
import CharacterDetail from 'components/CharacterDetail'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function CharacterContainer({ kids = false }) {
  const { id } = useParams()

  const characterQueryResponse = useCharacter({
    id,
  })

  return (
    <LoadOrError queryResponse={characterQueryResponse}>
      <SiteDocHead
        titleArray={[characterQueryResponse?.data?.title || '', 'Alphabet']}
      />
      <div
        id="CharacterContainer"
        className="max-w-2xl py-4 lg:py-6 px-6 lg:px-0 space-y-7 mx-auto"
      >
        <CharacterDetail
          characterData={characterQueryResponse?.data}
          kids={kids}
        />
      </div>
    </LoadOrError>
  )
}

const { bool } = PropTypes

CharacterContainer.propTypes = {
  kids: bool,
}

export default CharacterContainer
