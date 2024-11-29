import { useEffect } from 'react'

export default function useIntersectionObserver({
  root = null,
  target,
  onIntersect,
  threshold = 0,
  rootMargin = '0px',
  enabled = true,
}) {
  useEffect(() => {
    const el = target?.current
    if (!enabled || !el) {
      return
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root?.current,
        rootMargin,
        threshold,
      },
    )
    observer.observe(el)

    return () => {
      if (el) {
        observer.unobserve(el)
      }
    }
  }, [target, enabled, root, rootMargin, threshold, onIntersect])
}
