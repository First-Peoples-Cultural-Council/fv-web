import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function LazyLoader({
  children,
  tag = 'div',
  styling,
  placeholder,
  forceLoad = false,
}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef()
  const io = useRef()
  const Tag = tag
  const _placeholder = placeholder || null

  useEffect(() => {
    const el = ref?.current
    if (el) {
      io.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0.75) {
              setIsIntersecting(true)
              io.current.unobserve(el)
            }
          })
        },
        { threshold: [0.5, 1] },
      )
      io.current.observe(el)
    }

    return () => {
      if (el) {
        io.current.unobserve(el)
      }
    }
  }, [ref])

  if (forceLoad) {
    return (
      <Tag ref={ref} className={styling}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag ref={ref} className={styling}>
      {isIntersecting ? children : _placeholder}
    </Tag>
  )
}

// PROPTYPES
const { bool, node, string } = PropTypes
LazyLoader.propTypes = {
  children: node,
  tag: string,
  styling: string,
  placeholder: node,
  forceLoad: bool,
}

export default LazyLoader
