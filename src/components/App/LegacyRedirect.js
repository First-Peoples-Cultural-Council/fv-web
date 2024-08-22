import React from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import ErrorHandler from 'components/ErrorHandler'
import LEGACY_SITE_MAPPING from 'common/constants/legacySiteMapping'
import { isUUID } from 'common/utils/stringHelpers'

function LegacyRedirect() {
  // family and language are also available if desired for more precise matching
  const { dialect, exploreOrKids, type, uuid } = useParams()
  const navigate = useNavigate()

  if (!dialect) {
    // old explore languages page
    return navigate(`/languages/`, { replace: true })
  }

  const isKids = exploreOrKids === 'kids'

  const bestMatch = LEGACY_SITE_MAPPING.find((s) => s.oldSitename === dialect)
  const backupMatch = LEGACY_SITE_MAPPING.find((s) => s.dialect === dialect)
  const found = bestMatch || backupMatch

  if (found) {
    if (type) {
      return navigate(
        `/${found.newSiteName}/${isKids ? 'kids/' : ''}${type}/${
          isUUID(uuid) ? uuid : ''
        }`,
        {
          replace: true,
        },
      )
    }
    return navigate(`/${found.newSiteName}/${isKids ? 'kids/' : ''}`, {
      replace: true,
    })
  }

  // no match
  return (
    <ErrorHandler.Container
      error={{ status: 404, statusText: 'Page not found' }}
    />
  )
}

export default LegacyRedirect
