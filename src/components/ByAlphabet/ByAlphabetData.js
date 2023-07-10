import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchLoader from 'common/search/useSearchLoader'
import api from 'services/api'
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'
import {
  KIDS,
  STARTS_WITH_CHAR,
  TYPES,
  TYPE_DICTIONARY,
} from 'common/constants'

function ByAlphabetData({ kids }) {
  const { site } = useSiteStore()
  const { uid } = site
  const navigate = useNavigate()
  const { sitename, character } = useParams()
  const [searchParams] = useSearchParams()

  const urlSearchType = searchParams.get(TYPES) || TYPE_DICTIONARY
  const { searchType, setSearchTypeInUrl, getSearchLabel } =
    useSearchBoxNavigation({
      searchType: urlSearchType,
    })

  const _searchParams = new URLSearchParams({
    [TYPES]: searchType,
    [KIDS]: kids,
    [STARTS_WITH_CHAR]: character,
  })

  const { searchResults, infiniteScroll, loadRef, isLoading, isError, error } =
    useSearchLoader({ searchParams: _searchParams })

  const alphabetResponse = useQuery(
    ['alphabet', uid],
    () => api.alphabet.get(uid),
    {
      enabled: !!uid,
    },
  )

  const [currentCharacter, setCurrentCharacter] = useState({})

  useEffect(() => {
    if (
      alphabetResponse?.data &&
      alphabetResponse?.status === 'success' &&
      !alphabetResponse?.isError
    ) {
      const selectedCharacter = alphabetResponse?.data?.characters?.find(
        (char) => char?.title === character,
      )
      if (selectedCharacter?.id !== currentCharacter?.id) {
        setCurrentCharacter(selectedCharacter)
      }
    }
  }, [alphabetResponse?.status, currentCharacter, character])

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  return {
    characters:
      alphabetResponse?.data?.characters?.length > 0
        ? alphabetResponse?.data?.characters
        : [],
    charactersAreLoading: alphabetResponse?.isLoading,
    isLoading: isLoading || isError,
    items: searchResults || {},
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    sitename,
    infiniteScroll,
    loadRef,
    currentCharacter,
    searchType,
    setSearchType: setSearchTypeInUrl,
    entryLabel: getSearchLabel({ searchType }),
  }
}

// PROPTYPES
const { bool } = PropTypes
ByAlphabetData.propTypes = {
  kids: bool,
}

ByAlphabetData.defaultProps = {
  kids: false,
}

export default ByAlphabetData
