import React from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import ErrorHandler from 'components/ErrorHandler'
import LEGACY_SITE_MAPPING from 'common/constants/legacySiteMapping'

function LegacyRedirect() {
  // family and language are also available if desired for more precise matching
  const { dialect } = useParams()
  const navigate = useNavigate()

  // best match
  let found = LEGACY_SITE_MAPPING.find((s) => s.oldSitename === dialect)
  if (found) {
    navigate(`/${found.newSiteName}/`, { replace: true })
    return null
  }

  // second best
  found = LEGACY_SITE_MAPPING.find((s) => s.dialect === dialect)
  if (found) {
    navigate(`/${found.newSiteName}/`, { replace: true })
    return null
  }

  // no match
  return (
    <ErrorHandler.Container
      error={{ status: 404, statusText: 'Page not found' }}
    />
  )
}

export default LegacyRedirect
