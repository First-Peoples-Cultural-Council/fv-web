import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useInfiniteQuery } from 'react-query'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import mediaDataAdaptor from 'common/utils/mediaDataAdaptor'
import { DOC_AUDIO, DOC_IMAGE, DOC_VIDEO } from 'common/constants'

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
    isLoading,
  } = useInfiniteQuery(
    [`${docType}-search`, searchTerm],
    ({ pageParam = 0 }) =>
      api.media.get({
        siteId: site?.uid,
        searchTerm,
        type: docType,
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
    if (!currentFile && data?.pages?.[0]?.entries) {
      const firstFile = mediaDataAdaptor({
        type: docType,
        data: data?.pages?.[0]?.entries?.[0],
      })
      setCurrentFile(firstFile)
    }
  }, [data])

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
    isLoading: isLoading || isError,
    isLoadingEntries: isLoading,
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
  docType: oneOf([DOC_AUDIO, DOC_IMAGE, DOC_VIDEO]),
}

export default MediaBrowserData
