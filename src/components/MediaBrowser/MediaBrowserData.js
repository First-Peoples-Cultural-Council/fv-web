import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import mediaDataAdaptor from 'common/utils/mediaDataAdaptor'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'

function MediaBrowserData({ docType }) {
  const { site } = useSiteStore()
  const { search } = useLocation()
  const { sitename } = useParams()
  const navigate = useNavigate()

  // Extract search term from URL search params
  const searchParamsQuery = new URLSearchParams(search).get('q')
    ? new URLSearchParams(search).get('q')
    : ''
  // Friendly Doc Type Label to use in document search
  const friendlyDocTypeLabel = getFriendlyDocType({
    docType,
    plural: true,
  })

  const loadRef = useRef(null)
  const [currentFile, setCurrentFile] = useState() // Used for the sidebar to display the current selected file
  const [searchTerm, setSearchTerm] = useState(searchParamsQuery)
  const [searchInputValue, setSearchInputValue] = useState(searchParamsQuery)

  const handleTextFieldChange = (event) => {
    event.preventDefault()
    setSearchInputValue(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSearchTerm(searchInputValue)
    if (searchInputValue) {
      navigate(
        `/${sitename}/dashboard/media/browser?type=${friendlyDocTypeLabel}&q=${searchInputValue}`,
      )
    } else {
      navigate(
        `/${sitename}/dashboard/media/browser?type=${friendlyDocTypeLabel}`,
      )
    }
  }

  // Data fetch
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isInitialLoading,
  } = useInfiniteQuery(
    [`${docType}-search`, searchTerm],
    ({ pageParam = 1 }) =>
      api.media.get({
        sitename: site?.sitename,
        docType: friendlyDocTypeLabel,
        pageParam,
      }),
    {
      // The query will not execute until the siteId exists
      enabled: !!site?.uid,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  useEffect(() => {
    if (!currentFile && data?.pages?.[0]?.results) {
      const firstFile = mediaDataAdaptor({
        type: docType,
        data: data?.pages?.[0]?.results?.[0],
      })
      setCurrentFile(firstFile)
    }
  }, [currentFile, data, docType])

  const infiniteScroll = { fetchNextPage, hasNextPage, isFetchingNextPage }
  useIntersectionObserver({
    target: loadRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
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
    friendlyDocTypeLabel,
  }
}

const { oneOf } = PropTypes

MediaBrowserData.propTypes = {
  docType: oneOf([AUDIO, IMAGE, VIDEO]),
}

export default MediaBrowserData
