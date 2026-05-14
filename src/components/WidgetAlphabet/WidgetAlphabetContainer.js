import React from 'react'

import WidgetAlphabetPlaceholder from 'components/WidgetAlphabet/WidgetAlphabetPlaceholder'
import WidgetAlphabetData from 'components/WidgetAlphabet/WidgetAlphabetData'
import WidgetAlphabetPresentation from 'components/WidgetAlphabet/WidgetAlphabetPresentation'
import LoadOrError from 'components/LoadOrError'

function WidgetAlphabetContainer() {
  const { queryResponse, onCharacterClick, selectedCharacterDetails } =
    WidgetAlphabetData()

  if (queryResponse?.isPending) {
    return <WidgetAlphabetPlaceholder />
  }

  return (
    <LoadOrError queryResponse={queryResponse}>
      <WidgetAlphabetPresentation
        characters={queryResponse?.data?.results || []}
        onCharacterClick={onCharacterClick}
        selectedCharacterDetails={selectedCharacterDetails}
      />
    </LoadOrError>
  )
}

export default WidgetAlphabetContainer
