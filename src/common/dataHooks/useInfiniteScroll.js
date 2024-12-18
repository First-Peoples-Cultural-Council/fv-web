import { useInfiniteQuery } from '@tanstack/react-query'

// FPCC
/**
 * Calls API and provides results - use in conjunction with components/InfiniteLoadBtn or useIntersectionObserver for  infinite scrolling.
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

  return {
    ...infiniteQueryResponse,
    hasResults: Boolean(
      infiniteQueryResponse?.data?.pages !== undefined &&
        infiniteQueryResponse?.data?.pages?.[0]?.results?.length > 0,
    ),
  }
}

export default useInfiniteScroll
