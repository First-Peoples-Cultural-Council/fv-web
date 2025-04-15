import React, { useEffect } from 'react'

import { useNavigate, useParams, useSearchParams } from 'react-router'

import ErrorHandler from 'components/ErrorHandler'
import LEGACY_SITE_MAPPING from 'common/constants/legacySiteMapping'
import {
  CATEGORIES,
  PHRASES,
  SONGS,
  STORIES,
  WORDS,
} from 'common/constants/paths'
import { isUUID } from 'common/utils/stringHelpers'

function LegacyRedirect() {
  // family and language are also available if desired for more precise matching
  const { dialect, exploreOrKids, type, uuid } = useParams()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  // To help support the following legacy url pattern
  // "/explore/fv/sections/data/salish/halkomelem/halq'eméylem/learn/words?category=4b6b82ae-b08c-41a6-a5dc-c3f1258fc19b"
  const categoryId = searchParams.get('category')

  const isKids = exploreOrKids === 'kids'

  const sitenameMatch = LEGACY_SITE_MAPPING.find(
    (s) => s.oldSitename === dialect,
  )
  const dialectMatch = LEGACY_SITE_MAPPING.find((s) => s.dialect === dialect)
  const caseInsensitiveMatch = LEGACY_SITE_MAPPING.find(
    (s) => s.dialect?.toLowerCase() === dialect?.toLowerCase(),
  )
  const found = sitenameMatch || dialectMatch || caseInsensitiveMatch

  const convertLegacyType = (string) => {
    switch (string) {
      case 'phrase':
      case 'phrases':
      case 'learn_phrases':
        return PHRASES
      case 'song':
      case 'songs':
      case 'learn_songs':
        return SONGS
      case 'story':
      case 'stories':
      case 'learn_stories':
        return STORIES
      case 'word':
      case 'words':
      case 'learn_words':
        return WORDS
      default:
        return null
    }
  }

  useEffect(() => {
    if (!dialect) {
      // e.g '/explore/FV/Workspaces/Data'
      return navigate(`/languages/`, { replace: true })
    }

    if (found) {
      const typePath = convertLegacyType(type)
      const basePath = `/${found.newSiteName}${isKids ? '/kids' : ''}`

      if (isUUID(categoryId)) {
        navigate(`${basePath}/${CATEGORIES}/${categoryId}`, {
          replace: true,
        })
      } else if (typePath) {
        navigate(`${basePath}/${typePath}/${isUUID(uuid) ? uuid : ''}`, {
          replace: true,
        })
      } else {
        navigate(basePath, { replace: true })
      }
    }
  }, [dialect, found])

  // no match
  return (
    <ErrorHandler.Container
      error={{ status: 404, statusText: 'Page not found' }}
    />
  )
}

export default LegacyRedirect
