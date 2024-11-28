import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

// FPCC

function DocHead({ titleArray = [], description }) {
  const _titleArray = [...titleArray, 'FirstVoices']
  const title = _titleArray.join(' | ')

  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content={
          description ||
          'Indigenous Language Revitalization Platform. An online space for Indigenous communities to share and promote language, oral culture, and linguistic history.'
        }
      />
    </Helmet>
  )
}
// PROPTYPES
const { array, string } = PropTypes
DocHead.propTypes = {
  titleArray: array,
  description: string,
}

export default DocHead
