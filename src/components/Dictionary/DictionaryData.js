import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import { getPresentationPropertiesForType } from 'common/utils/stringHelpers'
import { DOMAIN, DOMAIN_BOTH, TYPES, KIDS } from 'common/constants'

function DictionaryDataSearch({ searchType, kids }) {
  const { sitename } = useParams()
  const { site } = useSiteStore()
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
  const { data, infiniteScroll, loadRef, isInitialLoading, isError } =
    useSearchLoader({ searchParams: _searchParams })

  const count = data?.pages[0]?.count

  useEffect(() => {
    if (isError) {
      // This should not navigate to the error page. Instead, show the same page but with no results.
    }
  }, [isError])

  const labels = getPresentationPropertiesForType(searchType)

  return {
    isLoading: !site?.title,
    isLoadingEntries: isInitialLoading,
    items: data,
    infiniteScroll,
    labels,
    loadRef,
    sitename,
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    count,
  }
}

// PROPTYPES
const { bool, string } = PropTypes
DictionaryDataSearch.propTypes = {
  searchType: string.isRequired,
  kids: bool,
}

export default DictionaryDataSearch
