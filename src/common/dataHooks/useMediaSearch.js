import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useInfiniteQuery } from '@tanstack/react-query'

// FPCC
import useLoader from 'common/hooks/useLoader'
import api from 'services/api'
import { searchResponseAdaptor } from 'common/dataAdaptors'
import {
  AUDIO,
  IMAGE,
  VIDEO,
  TYPES,
  SEARCH,
  SHARED_MEDIA,
  SORT,
  SORT_CREATED_DESC,
} from 'common/constants'
import { getPathForMediaType } from 'common/utils/mediaHelpers'

function useMediaSearch({ type, library }) {
  const { sitename } = useParams()
  const siteToSearch = library === SHARED_MEDIA ? SHARED_MEDIA : sitename
  const [searchParams, setSearchParams] = useSearchParams()

  const path = getPathForMediaType(type)

  const searchParamsQuery = searchParams.get('q') || ''
  const [currentFile, setCurrentFile] = useState() // Used for the sidebar to display the current selected file
  const [searchTerm, setSearchTerm] = useState(searchParamsQuery)
  const [searchInputValue, setSearchInputValue] = useState(searchParamsQuery)

  // Add search Term
  const _searchParams = new URLSearchParams({
    q: searchTerm,
    [TYPES]: type,
    [SORT]: searchTerm ? null : SORT_CREATED_DESC,
  })

  const searchParamString = _searchParams.toString()

  // Fetch search results
  const response = useInfiniteQuery({
    queryKey: [SEARCH, siteToSearch, searchParamString],
    queryFn: ({ pageParam = 1 }) =>
      api.search.get({
        sitename: siteToSearch,
        searchParams: searchParamString,
        pageParam,
      }),
    getNextPageParam: (currentPage) => currentPage.next,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: (responseData) => ({
      pages: searchResponseAdaptor(responseData),
      pageParams: responseData.pageParams,
    }),
  })

  const { infiniteScroll, loadRef } = useLoader({ response })

  const handleTextFieldChange = (event) => {
    event.preventDefault()
    setSearchInputValue(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSearchTerm(searchInputValue)
  }

  const handleSearchSubmitWithUrlSync = (event) => {
    handleSearchSubmit(event)
    setSearchParams({ q: searchInputValue })
  }

  useEffect(() => {
    if (!currentFile && response?.data?.pages?.[0]?.results) {
      const firstFile = response?.data?.pages?.[0]?.results?.[0]
      setCurrentFile(firstFile)
    }
  }, [currentFile, response?.data, type])

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
    handleSearchSubmitWithUrlSync,
    handleTextFieldChange,
    infiniteScroll,
    isLoadingEntries: response?.isLoading,
    loadRef,
    media: response?.data,
    searchValue: searchInputValue,
    currentFile,
    setCurrentFile,
    loadLabel: getLoadLabel(),
    typePlural: path,
  }
}

const { oneOf, string } = PropTypes

useMediaSearch.propTypes = {
  type: oneOf([AUDIO, IMAGE, VIDEO]),
  library: string,
}

export default useMediaSearch
