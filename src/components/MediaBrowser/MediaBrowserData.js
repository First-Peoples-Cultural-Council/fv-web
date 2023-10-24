import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'
import { AUDIO, IMAGE, VIDEO, TYPES, TYPE_MEDIA } from 'common/constants'
import useSearchBoxNavigation from 'common/hooks/useSearchBoxNavigation'

function MediaBrowserData({ docType }) {
  const navigate = useNavigate()
  const { sitename } = useParams()
  const [searchParams] = useSearchParams()

  const urlSearchType = searchParams.get(TYPES) || TYPE_MEDIA

  // eslint-disable-next-line no-unused-vars
  const { searchType, setSearchTypeInUrl, getSearchTypeLabel } =
    useSearchBoxNavigation({
      initialSearchType: urlSearchType,
    })

  const searchParamsQuery = searchParams.get('q') || ''
  const [currentFile, setCurrentFile] = useState() // Used for the sidebar to display the current selected file
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState(searchParamsQuery)
  const [searchInputValue, setSearchInputValue] = useState(searchParamsQuery)

  // Add search Term
  const _searchParams = new URLSearchParams({
    [TYPES]: searchType,
  })

  const { data, infiniteScroll, loadRef, isInitialLoading, isError } =
    useSearchLoader({ searchParams: _searchParams })

  const handleTextFieldChange = (event) => {
    event.preventDefault()
    setSearchInputValue(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSearchTerm(searchInputValue)
    if (searchInputValue) {
      navigate(
        `/${sitename}/dashboard/media/browser?type=${docType}&q=${searchInputValue}`,
      )
    } else {
      navigate(`/${sitename}/dashboard/media/browser?type=${docType}`)
    }
  }

  useEffect(() => {
    if (!currentFile && data?.pages?.[0]?.results) {
      const firstFile = data?.pages?.[0]?.results?.[0]
      setCurrentFile(firstFile)
    }
  }, [currentFile, data, docType])

  useIntersectionObserver({
    target: loadRef,
    onIntersect: infiniteScroll?.fetchNextPage,
    enabled: infiniteScroll?.hasNextPage,
  })

  const getLoadLabel = () => {
    if (infiniteScroll?.isFetchingNextPage) {
      return 'Loading more...'
    }
    if (infiniteScroll?.hasNextPage) {
      return 'Load more'
    }
    return 'End of results.'
  }

  return {
    handleSearchSubmit,
    handleTextFieldChange,
    infiniteScroll,
    isLoading: isInitialLoading || isError,
    isLoadingEntries: isInitialLoading,
    loadRef,
    media: data,
    searchValue: searchInputValue,
    currentFile,
    setCurrentFile,
    loadLabel: getLoadLabel(),
  }
}

const { oneOf } = PropTypes

MediaBrowserData.propTypes = {
  docType: oneOf([AUDIO, IMAGE, VIDEO]),
}

export default MediaBrowserData
