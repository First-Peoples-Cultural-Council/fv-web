import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import { getPresentationPropertiesForType } from 'common/utils/stringHelpers'
import { DOMAIN, DOMAIN_BOTH, TYPES, KIDS } from 'common/constants'

function DictionaryDataSearch({ searchType, kids }) {
  const { sitename } = useParams()
  const { site } = useSiteStore()
  const navigate = useNavigate()
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
  const { searchResults, infiniteScroll, loadRef, isLoading, isError, error } =
    useSearchLoader({ searchParams: _searchParams })

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  const labels = getPresentationPropertiesForType(searchType)

  return {
    isLoading: !site?.title,
    isLoadingEntries: isLoading,
    items: searchResults,
    infiniteScroll,
    labels,
    loadRef,
    sitename,
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
  }
}

// PROPTYPES
const { bool, string } = PropTypes
DictionaryDataSearch.propTypes = {
  searchType: string.isRequired,
  kids: bool,
}

export default DictionaryDataSearch
