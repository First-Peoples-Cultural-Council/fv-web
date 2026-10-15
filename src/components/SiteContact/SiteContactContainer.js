import React from 'react'

// FPCC
import SiteContactPresentation from 'components/SiteContact/SiteContactPresentation'
import SiteContactData from 'components/SiteContact/SiteContactData'
import { useUserStore } from 'context/UserContext'
import LoadOrError from 'components/LoadOrError'

function SiteContactContainer() {
  const { siteTitle, organization, submitHandler, infiniteQueryResponse } =
    SiteContactData()

  const { user } = useUserStore()

  return (
    <LoadOrError queryResponse={infiniteQueryResponse}>
      <SiteContactPresentation
        siteTitle={siteTitle}
        submitHandler={submitHandler}
        organization={organization}
        user={user}
      />
    </LoadOrError>
  )
}

export default SiteContactContainer
