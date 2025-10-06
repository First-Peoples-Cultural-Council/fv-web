import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import PropTypes from 'prop-types'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import { useCharacters } from 'common/dataHooks/useCharacters'
import useSearchType from 'common/hooks/useSearchType'
import { getPresentationPropertiesForType } from 'common/utils/stringHelpers'
import {
  CHAR,
  KIDS,
  STARTS_WITH_CHAR,
  TYPES,
  TYPE_DICTIONARY,
} from 'common/constants'

function ByAlphabetData({ kids = null }) {
  const { sitename } = useParams()
  const [searchParams] = useSearchParams()

  const urlSearchType = searchParams.get(TYPES) || TYPE_DICTIONARY
  const character = searchParams.get(CHAR)
  const { searchType, setSearchTypeInUrl } = useSearchType({
    initialSearchType: urlSearchType,
  })

  const _searchParams = new URLSearchParams({
    [TYPES]: searchType,
    [KIDS]: kids,
    [STARTS_WITH_CHAR]: character,
  })

  const searchInfiniteQueryResponse = useSearchLoader({
    searchParams: _searchParams,
  })

  const charactersQueryResponse = useCharacters()

  const [currentCharacter, setCurrentCharacter] = useState({})

  useEffect(() => {
    if (
      charactersQueryResponse?.data &&
      !charactersQueryResponse?.isPending &&
      !charactersQueryResponse?.isError
    ) {
      const selectedCharacter = charactersQueryResponse?.data?.results?.find(
        (char) => char?.title === character,
      )
      if (selectedCharacter?.id !== currentCharacter?.id) {
        setCurrentCharacter(selectedCharacter)
      }
    }
  }, [currentCharacter, character, charactersQueryResponse])

  return {
    charactersQueryResponse,
    searchInfiniteQueryResponse,
    sitename,
    currentCharacter,
    searchType,
    setSearchType: setSearchTypeInUrl,
    labels: getPresentationPropertiesForType(searchType),
  }
}

// PROPTYPES
const { bool } = PropTypes
ByAlphabetData.propTypes = {
  kids: bool,
}

export default ByAlphabetData
