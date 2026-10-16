import React from 'react'

// FPCC
import SiteContactPresentation from 'components/SiteContact/SiteContactPresentation'
import { useSiteStore } from 'context/SiteContext'
import { useOrganizations } from 'common/dataHooks/useOrganizations'
import LoadOrError from 'components/LoadOrError'

function SiteContactContainer() {
  const { site } = useSiteStore()
  const infiniteQueryResponse = useOrganizations()

  return (
    <LoadOrError queryResponse={infiniteQueryResponse}>
      <SiteContactPresentation
        siteTitle={site?.title}
        organization={infiniteQueryResponse?.data?.pages?.[0]?.results?.[0]}
      />
    </LoadOrError>
  )
}

export default SiteContactContainer
