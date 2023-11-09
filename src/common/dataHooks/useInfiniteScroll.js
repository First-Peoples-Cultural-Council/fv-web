import { useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

// FPCC
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'
import { useSiteStore } from 'context/SiteContext'

/**
 * Calls API and provides results and infinite scroll info.
 */
function useInfiniteScroll({ queryKey, queryFn, resultAdaptor }) {
  const { site } = useSiteStore()

  const pagesDataAdaptor = (pages) =>
    pages.map((page, index) => singlePageDataAdaptor(page, index))

  const singlePageDataAdaptor = (page, index) => {
    const formattedResult = page?.results?.map((result) =>
      resultAdaptor ? resultAdaptor(result) : result,
    )
    return {
      ...page,
      pageNumber: index + 1,
      results: formattedResult,
    }
  }

  // Fetch search results
  const response = useInfiniteQuery({
    queryKey,
    queryFn,
    enabled: !!site?.sitename,
    getNextPageParam: (currentPage) => currentPage.next,
    select: (responseData) => ({
      pages: pagesDataAdaptor(responseData.pages),
      pageParams: responseData.pageParams,
    }),
  })

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

export default useInfiniteScroll
