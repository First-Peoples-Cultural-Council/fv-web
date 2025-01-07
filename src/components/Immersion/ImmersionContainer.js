import React from 'react'

// FPCC
import ImmersionPresentation from 'components/Immersion/ImmersionPresentation'
import { useImmersionLabels } from 'common/dataHooks/useImmersionLabels'
import SiteDocHead from 'components/SiteDocHead'

function ImmersionContainer() {
  const queryResponse = useImmersionLabels()
  return (
    <>
      <SiteDocHead titleArray={['Immersion Mode']} />
      <ImmersionPresentation queryResponse={queryResponse} />
    </>
  )
}

export default ImmersionContainer
