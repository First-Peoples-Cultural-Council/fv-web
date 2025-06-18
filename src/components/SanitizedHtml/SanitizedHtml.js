import React from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'

const LOCAL_DOMAINS = ['firstvoices.com']

DOMPurify.addHook('uponSanitizeElement', (node, data) => {
  if (data.tagName === 'iframe') {
    const src = node.getAttribute('src') || ''
    if (!src.match(/youtube.com|youtube-nocookie.com/)) {
      return node.parentNode?.removeChild(node)
    }
  }

  if (data.tagName === 'a') {
    const href = node.getAttribute('href') || ''

    const isLocal = LOCAL_DOMAINS.some((domain) => href.includes(domain))
    if (!isLocal) {
      node.setAttribute('target', '_blank')
      node.setAttribute('rel', 'noopener noreferrer')
    } else {
      node.setAttribute('target', '_self')
      node.removeAttribute('rel')
    }
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
