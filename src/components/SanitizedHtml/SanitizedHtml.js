import React from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'

DOMPurify.addHook('uponSanitizeElement', (node, data) => {
  if (data.tagName === 'iframe') {
    const src = node.getAttribute('src') || ''
    if (!src.match(/youtube.com|youtube-nocookie.com/)) {
      return node.parentNode?.removeChild(node)
    }
  }

  if (data.tagName === 'a') {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

const Sanitize = (content) =>
  DOMPurify.sanitize(content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: [
      'allow',
      'allowfullscreen',
      'frameborder',
      'scrolling',
      'target',
      'rel',
    ],
  })

function SanitizedHtml({ htmlString = '', className, tagName = 'div' }) {
  const Tag = tagName
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: Sanitize(htmlString) }}
    />
  )
}

// PROPTYPES
const { string } = PropTypes
SanitizedHtml.propTypes = {
  htmlString: string,
  className: string,
  tagName: string,
}

export default SanitizedHtml
