import { useCallback, useEffect, useRef } from 'react'

export default function useIntersectionObserver({
  hasNextPage,
  fetchNextPage,
}) {
  const loadRef = useRef(null)

  const intersectionCallback = useCallback(
    (entries) =>
      entries.forEach((entry) => {
        if (entry?.isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      }),
    [hasNextPage, fetchNextPage],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(intersectionCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    })

    if (loadRef?.current) {
      observer.observe(loadRef.current)
    }

    return () => observer.disconnect()
  }, [loadRef, intersectionCallback, fetchNextPage])

  return { loadRef }
}
