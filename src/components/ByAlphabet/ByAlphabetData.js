import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchLoader from 'common/search/useSearchLoader'
import api from 'services/api'
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'

function ByAlphabetData({ kids }) {
  const { site } = useSiteStore()
  const { uid } = site
  const navigate = useNavigate()
  const { sitename, character } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const urlSearchType = searchParams.get('docType') || 'WORD_AND_PHRASE'
  const { searchType, setSearchTypeInUrl, getSearchLabel } =
    useSearchBoxNavigation({
      searchType: urlSearchType,
    })
  const sortBy = searchParams.get('sortBy') || 'ENTRY'
  const sortAscending = searchParams.get('sortAscending') || 'true'
  const perPageDefault = 100

  const _searchParams = `docType=${searchType}&kidsOnly=${kids}&perPage=${perPageDefault}&sortBy=${sortBy}&sortAscending=${sortAscending}&alphabetCharacter=${character}`

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

  const onSortByClick = (field) => {
    let newSortAscending = 'true'
    if (sortBy === field && sortAscending === 'true') {
      newSortAscending = 'false'
    }
    setSearchParams({
      docType: searchType,
      perPage: perPageDefault,
      sortBy: field,
      sortAscending: newSortAscending,
    })
  }

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
    onSortByClick,
    sitename,
    sorting: { sortBy, sortAscending },
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
