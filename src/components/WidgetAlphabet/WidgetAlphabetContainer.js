import React from 'react'

import WidgetAlphabetPlaceholder from 'components/WidgetAlphabet/WidgetAlphabetPlaceholder'
import WidgetAlphabetData from 'components/WidgetAlphabet/WidgetAlphabetData'
import WidgetAlphabetPresentation from 'components/WidgetAlphabet/WidgetAlphabetPresentation'
import LoadOrError from 'components/LoadOrError'

function WidgetAlphabetContainer() {
  const {
    queryResponse,
    onCharacterClick,
    selectedCharacterData,
    isDrawerOpen,
    drawerCloseHandler,
  } = WidgetAlphabetData()

  if (queryResponse?.isPending) {
    return <WidgetAlphabetPlaceholder />
  }

  return (
    <LoadOrError queryResponse={queryResponse}>
      <WidgetAlphabetPresentation
        characters={queryResponse?.data?.results || []}
        onCharacterClick={onCharacterClick}
        selectedCharacterData={selectedCharacterData}
        isDrawerOpen={isDrawerOpen}
        drawerCloseHandler={drawerCloseHandler}
      />
    </LoadOrError>
  )
}

export default WidgetAlphabetContainer
