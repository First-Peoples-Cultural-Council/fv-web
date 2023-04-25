import React from 'react'

// FPCC
import ImmersionPresentation from 'components/Immersion/ImmersionPresentation'
import ImmersionData from 'components/Immersion/ImmersionData'
import Loading from 'components/Loading'

function ImmersionContainer() {
  const { actions, isLoading, isLoadingEntries, items } = ImmersionData()
  return (
    <Loading.Container isLoading={isLoading}>
      <ImmersionPresentation
        actions={actions}
        isLoadingEntries={isLoadingEntries}
        items={items}
      />
    </Loading.Container>
  )
}

export default ImmersionContainer
