import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'
import {
  TYPE_AUDIO,
  AUDIO_PATH,
  TYPES,
  SORT,
  SORT_CREATED_DESC,
} from 'common/constants'

function DashboardMediaAudioData() {
  const navigate = useNavigate()
  const { sitename } = useParams()
  const [searchParams] = useSearchParams()

  const searchParamsQuery = searchParams.get('q') || ''
  const [currentFile, setCurrentFile] = useState() // Used for the sidebar to display the current selected file
  const [searchTerm, setSearchTerm] = useState(searchParamsQuery)
  const [searchInputValue, setSearchInputValue] = useState(searchParamsQuery)

  // Add search Term
  const _searchParams = new URLSearchParams({
    q: searchTerm,
    [TYPES]: TYPE_AUDIO,
    [SORT]: searchTerm ? null : SORT_CREATED_DESC,
  })

  const { data, infiniteScroll, loadRef, isInitialLoading } = useSearchLoader({
    searchParams: _searchParams,
  })

  const handleTextFieldChange = (event) => {
    event.preventDefault()
    setSearchInputValue(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSearchTerm(searchInputValue)
    if (searchInputValue) {
      navigate(
        `/${sitename}/dashboard/media/${AUDIO_PATH}?q=${searchInputValue}`,
      )
    } else {
      navigate(`/${sitename}/dashboard/media/${AUDIO_PATH}`)
    }
  }

  useEffect(() => {
    if (!currentFile && data?.pages?.[0]?.results) {
      const firstFile = data?.pages?.[0]?.results?.[0]
      setCurrentFile(firstFile)
    }
  }, [currentFile, data])

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
    isLoadingEntries: isInitialLoading,
    loadRef,
    audio: data,
    searchValue: searchInputValue,
    currentFile,
    setCurrentFile,
    loadLabel: getLoadLabel(),
  }
}

export default DashboardMediaAudioData
