import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchLoader from 'common/search/useSearchLoader'
import api from 'services/api'

function DictionaryDataSearch({ searchType }) {
  const { sitename } = useParams()
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Search fetch
  const { searchResults, infiniteScroll, loadRef, isLoading, isError, error } = useSearchLoader({
    searchApi: api.search,
    queryKey: 'dictionary',
    siteUid: site?.uid,
    searchParams,
  })

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true }
      )
    }
  }, [isError])

  const labels = getLabels(searchType)

  function getLabels(type) {
    switch (type) {
      case 'WORD':
        return { title: 'WORDS', plural: 'words', url: 'words', color: 'word' }
      case 'PHRASE':
        return {
          title: 'PHRASES',
          plural: 'phrases',
          url: 'phrases',
          color: 'phrase',
        }
      default:
        return {
          title: 'DICTIONARY',
          plural: 'words and phrases',
          url: 'dictionary',
          color: 'word',
        }
    }
  }

  return {
    isLoading: site?.title ? false : true,
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
const { string } = PropTypes
DictionaryDataSearch.propTypes = {
  searchType: string.isRequired,
}

export default DictionaryDataSearch
