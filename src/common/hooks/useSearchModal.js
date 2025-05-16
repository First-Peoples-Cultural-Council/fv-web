import PropTypes from 'prop-types'

// FPCC
import useSearchTerm from 'common/hooks/useSearchTerm'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import {
  DOMAIN,
  DOMAIN_BOTH,
  TYPES,
  TYPE_WORD,
  TYPE_PHRASE,
  VISIBILITY,
  VISIBILITY_PUBLIC,
  VISIBILITY_MEMBERS,
  VISIBILITY_TEAM,
} from 'common/constants'

function useSearchModal({ types, visibility = '', displayValue = '' }) {
  const searchType = types.join()

  const {
    displayedSearchTerm,
    handleSearchTermChange,
    submittedSearchTerm,
    setSubmittedSearchTerm,
  } = useSearchTerm({ displayValue })

  const _searchParams = new URLSearchParams({
    q: submittedSearchTerm,
    [TYPES]: searchType,
    [VISIBILITY]: visibility,
    [DOMAIN]: DOMAIN_BOTH,
  })

  const infiniteQueryResponse = useSearchLoader({
    searchParams: _searchParams,
  })

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSubmittedSearchTerm(displayedSearchTerm)
  }

  return {
    ...infiniteQueryResponse,
    displayedSearchTerm,
    handleSearchTermChange,
    handleSearchSubmit,
  }
}

// PROPTYPES
const { arrayOf, oneOf, string } = PropTypes
useSearchModal.propTypes = {
  types: arrayOf(oneOf([TYPE_WORD, TYPE_PHRASE])),
  visibility: oneOf([VISIBILITY_PUBLIC, VISIBILITY_MEMBERS, VISIBILITY_TEAM]),
  displayValue: string,
}

export default useSearchModal
