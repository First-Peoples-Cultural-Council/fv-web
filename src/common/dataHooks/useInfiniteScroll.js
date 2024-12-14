import { useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

// FPCC
import useIntersectionObserver from 'common/hooks/useIntersectionObserver'

/**
 * Calls API and provides results and infinite scroll info.
 */
function useInfiniteScroll({
  queryKey,
  queryFn,
  enabled = true,
  resultAdaptor,
}) {
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
  const infiniteQueryResponse = useInfiniteQuery({
    queryKey,
    queryFn,
    enabled,
    getNextPageParam: (currentPage) => currentPage.next,
    select: (responseData) => ({
      pages: pagesDataAdaptor(responseData.pages),
      pageParams: responseData.pageParams,
    }),
  })

  const getLoadLabel = () => {
    if (infiniteQueryResponse?.isFetchingNextPage) {
      return 'Loading more...'
    }
    if (infiniteQueryResponse?.hasNextPage) {
      return 'Load more'
    }
    return 'End of results.'
  }

  const infiniteScroll = {
    fetchNextPage: infiniteQueryResponse?.fetchNextPage,
    hasNextPage: infiniteQueryResponse?.hasNextPage,
    isFetchingNextPage: infiniteQueryResponse?.isFetchingNextPage,
    loadLabel: getLoadLabel(),
  }

  const loadRef = useRef(null)
  useIntersectionObserver({
    target: loadRef,
    onIntersect: infiniteQueryResponse?.fetchNextPage,
    enabled: infiniteQueryResponse?.hasNextPage,
  })

  return {
    ...infiniteQueryResponse,
    infiniteScroll,
    loadLabel: getLoadLabel(),
    loadRef,
    hasResults: Boolean(
      infiniteQueryResponse?.data?.pages !== undefined &&
        infiniteQueryResponse?.data?.pages?.[0]?.results?.length > 0,
    ),
  }
}

export default useInfiniteScroll
