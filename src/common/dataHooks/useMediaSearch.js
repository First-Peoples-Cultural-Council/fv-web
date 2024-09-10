import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'
import { AUDIO, IMAGE, VIDEO, TYPES, SORT, SORT_CREATED_DESC, MEDIA } from 'common/constants'
import { getPathForMediaType } from 'common/utils/mediaHelpers'

function useMediaSearch({ type }) {
  const navigate = useNavigate()
  const { sitename } = useParams()
  const [searchParams] = useSearchParams()

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
      navigate(`/${sitename}/dashboard/${MEDIA}/${path}?q=${searchInputValue}`)
    } else {
      navigate(`/${sitename}/dashboard/${MEDIA}/${path}`)
    }
  }

  useEffect(() => {
    if (!currentFile && data?.pages?.[0]?.results) {
      const firstFile = data?.pages?.[0]?.results?.[0]
      setCurrentFile(firstFile)
    }
  }, [currentFile, data, type])

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
    media: data,
    searchValue: searchInputValue,
    currentFile,
    setCurrentFile,
    loadLabel: getLoadLabel(),
    typePlural: path,
  }
}

const { oneOf } = PropTypes

useMediaSearch.propTypes = {
  type: oneOf([AUDIO, IMAGE, VIDEO]),
}

export default useMediaSearch
