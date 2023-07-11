import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useAlphabet from 'common/dataHooks/useAlphabet'
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'
import {
  KIDS,
  STARTS_WITH_CHAR,
  TYPES,
  TYPE_DICTIONARY,
} from 'common/constants'

function ByAlphabetData({ kids }) {
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

  const { data, infiniteScroll, loadRef, isLoading, isError, error } =
    useSearchLoader({ searchParams: _searchParams })

  const alphabetResponse = useAlphabet()

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
    items: data || {},
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
