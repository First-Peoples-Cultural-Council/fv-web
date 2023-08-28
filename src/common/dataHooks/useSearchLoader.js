import { useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'
import api from 'services/api'
import {
  SEARCH,
  TYPE_PHRASE,
  TYPE_SONG,
  TYPE_STORY,
  TYPE_WORD,
} from 'common/constants'
import { storySummaryAdaptor, songSummaryAdaptor } from 'common/dataAdaptors'

/**
 * Calls search API and provides search results and infinite scroll info.
 */
function useSearchLoader({ searchParams }) {
  const { sitename } = useParams()
  const searchParamString = searchParams.toString()

  const pagesDataAdaptor = (pages) =>
    pages.map((page, index) => singlePageDataAdaptor(page, index))

  const singlePageDataAdaptor = (page, index) => {
    const formattedEntries = page?.results?.map((result) =>
      resultAdaptor(result),
    )
    return {
      ...page,
      pageNumber: index + 1,
      results: formattedEntries,
    }
  }

  const resultAdaptor = (result) => {
    const baseObject = {
      id: result?.entry?.id,
      title: result?.entry?.title,
      type: result?.type,
      sitename: result?.entry?.site?.slug,
      siteTitle: result?.entry?.site?.title,
      visibility: result?.entry?.visibility,
    }
    switch (result?.type) {
      case TYPE_WORD:
      case TYPE_PHRASE:
        return {
          ...baseObject,
          translations: result?.entry?.translations || [],
          audio: result?.entry?.relatedAudio || [],
          image: result?.entry?.relatedImages?.[0] || null,
        }
      case TYPE_SONG:
        return {
          ...songSummaryAdaptor({ item: result?.entry }),
          ...baseObject,
        }
      case TYPE_STORY:
        return {
          ...storySummaryAdaptor({ item: result?.entry }),
          ...baseObject,
        }
      default:
        return {
          ...baseObject,
          message: 'Unrecognized entry type!',
        }
    }
  }

  // Fetch search results
  const response = useInfiniteQuery(
    [SEARCH, sitename, searchParamString],
    ({ pageParam = 1 }) =>
      api.search.get({
        sitename,
        searchParams: searchParamString,
        pageParam,
      }),
    {
      enabled: !!sitename,
      getNextPageParam: (currentPage) => currentPage.next,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      select: (responseData) => ({
        pages: pagesDataAdaptor(responseData.pages),
        pageParams: responseData.pageParams,
      }),
    },
  )

  const infiniteScroll = {
    fetchNextPage: response?.fetchNextPage,
    hasNextPage: response?.hasNextPage,
    isFetchingNextPage: response?.isFetchingNextPage,
  }

  const loadRef = useRef(null)
  useIntersectionObserver({
    target: loadRef,
    onIntersect: response?.fetchNextPage,
    enabled: response?.hasNextPage,
  })

  return {
    ...response,
    infiniteScroll,
    loadRef,
  }
}

// PROPTYPES
const { obj } = PropTypes
useSearchLoader.propTypes = {
  searchParams: obj,
}

export default useSearchLoader
