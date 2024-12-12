import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import { useCharacters } from 'common/dataHooks/useCharacters'
import useSearchType from 'common/hooks/useSearchType'
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
  const { searchType, setSearchTypeInUrl, getSearchTypeLabel } = useSearchType({
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

  const characterQueryResponse = useCharacters()

  const [currentCharacter, setCurrentCharacter] = useState({})

  useEffect(() => {
    if (
      characterQueryResponse?.data &&
      !characterQueryResponse?.isPending &&
      !characterQueryResponse?.isError
    ) {
      const selectedCharacter = characterQueryResponse?.data?.characters?.find(
        (char) => char?.title === character,
      )
      if (selectedCharacter?.id !== currentCharacter?.id) {
        setCurrentCharacter(selectedCharacter)
      }
    }
  }, [currentCharacter, character, characterQueryResponse])

  return {
    characterQueryResponse,
    searchInfiniteQueryResponse,
    sitename,
    currentCharacter,
    searchType,
    setSearchType: setSearchTypeInUrl,
    entryLabel: getSearchTypeLabel({ searchType }),
  }
}

// PROPTYPES
const { bool } = PropTypes
ByAlphabetData.propTypes = {
  kids: bool,
}

export default ByAlphabetData
