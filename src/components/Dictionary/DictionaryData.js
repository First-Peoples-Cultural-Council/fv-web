import { useParams, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import { getPresentationPropertiesForType } from 'common/utils/stringHelpers'
import { DOMAIN, DOMAIN_BOTH, TYPES, KIDS } from 'common/constants'

function DictionaryDataSearch({ searchType, kids }) {
  const { sitename } = useParams()
  const [searchParams] = useSearchParams()

  const domain = searchParams.get(DOMAIN) || DOMAIN_BOTH

  const _searchParams = searchParams.get(TYPES)
    ? searchParams
    : new URLSearchParams({
        [DOMAIN]: domain,
        [TYPES]: searchType,
        [KIDS]: kids,
      })

  // Search fetch
  const infiniteQueryResponse = useSearchLoader({
    searchParams: _searchParams,
  })

  const labels = getPresentationPropertiesForType(searchType)

  return {
    infiniteQueryResponse,
    labels,
    sitename,
  }
}

// PROPTYPES
const { bool, string } = PropTypes
DictionaryDataSearch.propTypes = {
  searchType: string.isRequired,
  kids: bool,
}

export default DictionaryDataSearch
