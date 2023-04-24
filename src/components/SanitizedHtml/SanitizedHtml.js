import React from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'

DOMPurify.addHook('uponSanitizeElement', (node, data) => {
  if (data.tagName === 'iframe') {
    const src = node.getAttribute('src') || ''
    if (!src.match(/youtube.com|youtube-nocookie.com/) ) {
      return node.parentNode?.removeChild(node)
    }
  }
})

const Sanitize = (content) => {
  return DOMPurify.sanitize(content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
  })
}

function SanitizedHtml({ text, className, tagName }) {
  const Tag = tagName
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: Sanitize(text) }} />
}

// PROPTYPES
const { string } = PropTypes
SanitizedHtml.propTypes = {
  text: string,
  className: string,
  tagName: string,
}

SanitizedHtml.defaultProps = {
  text: '',
  tagName: 'div',
}

export default SanitizedHtml
