import { useEffect } from 'react'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchLoader from 'common/search/useSearchLoader'
import api from 'services/api'

function DictionaryData({ searchType, kids }) {
  const { site } = useSiteStore()
  const { sitename } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const domain = searchParams.get('domain') || 'BOTH'
  const sortBy = searchParams.get('sortBy') || 'ENTRY'
  const sortAscending = searchParams.get('sortAscending') || 'true'

  const _searchParams = searchParams?.toString()
    ? searchParams
    : new URLSearchParams({
        domain,
        docType: searchType,
        kidsOnly: kids,
        sortBy: 'ENTRY',
        sortAscending: true,
      })

  // Dictionary fetch
  const { searchResults, infiniteScroll, loadRef, isLoading, isError, error } =
    useSearchLoader({
      searchApi: api.dictionary,
      queryKey: 'dictionary',
      siteUid: site?.uid,
      searchParams: _searchParams,
    })

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  const labels = getLabels(searchType)

  function getLabels(type) {
    switch (type) {
      case 'WORD':
        return {
          title: 'WORDS',
          entryLabel: 'word',
          plural: 'words',
          url: 'words',
          color: 'word',
        }
      case 'PHRASE':
        return {
          title: 'PHRASES',
          entryLabel: 'phrase',
          plural: 'phrases',
          url: 'phrases',
          color: 'phrase',
        }
      default:
        return {
          title: 'DICTIONARY',
          entryLabel: 'word / phrase',
          plural: 'words and phrases',
          url: 'dictionary',
          color: 'word',
        }
    }
  }

  /*
  Table sorting
  */
  const onSortByClick = (field) => {
    const newSortBy = field
    let newSortAscending = 'true'
    if (sortBy === field && sortAscending === 'true') {
      newSortAscending = 'false'
    }
    setSearchParams({
      domain,
      docType: searchType,
      sortBy: newSortBy,
      sortAscending: newSortAscending,
    })
  }

  return {
    isLoading: !site?.title,
    isLoadingEntries: isLoading,
    items: searchResults,
    infiniteScroll,
    onSortByClick,
    sitename,
    sorting: { sortBy, sortAscending },
    labels,
    loadRef,
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
  }
}

// PROPTYPES
const { string } = PropTypes
DictionaryData.propTypes = {
  searchType: string.isRequired,
}

export default DictionaryData
