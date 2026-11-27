import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import { FIRSTVOICESLINK } from 'common/constants'

function LinkButton({ url, urlLabel, styling = 'btn-primary btn-lg' }) {
  const isValidUrl = URL.canParse(url)
  const label = urlLabel || 'Learn more'

  //   If partial url create relative link
  if (!isValidUrl) {
    return (
      <Link to={url} className={styling}>
        {label}
      </Link>
    )
  }

  //   If complete FirstVoices url convert it to a relative link
  if (url.includes(FIRSTVOICESLINK)) {
    const _url = new URL(url)
    return (
      <Link
        to={`${_url?.pathname || ''}${_url?.search || ''}`}
        className={styling}
      >
        {label}
      </Link>
    )
  }

  // For other valid urls open in a new tab
  return (
    <a href={url} target="_blank" rel="noreferrer noopener" className={styling}>
      {label}
    </a>
  )
}

// PROPTYPES
const { string } = PropTypes
LinkButton.propTypes = {
  url: string,
  urlLabel: string,
  styling: string,
}

export default LinkButton
