import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function LazyLoader({ children, tag, styling, placeholder, forceLoad }) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef()
  const io = useRef()
  const Tag = tag
  const _placeholder = placeholder || null

  useEffect(() => {
    const el = ref && ref?.current
    if (ref.current) {
      io.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0.75) {
              setIsIntersecting(true)
              io.current.unobserve(ref.current)
            }
          })
        },
        { threshold: [0.5, 1] },
      )
      io.current.observe(ref.current)
    }

    return () => {
      io.current.unobserve(el)
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

LazyLoader.defaultProps = {
  tag: 'div',
  forceLoad: false,
}

export default LazyLoader
