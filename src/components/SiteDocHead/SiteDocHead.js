import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router'

// FPCC
import DocHead from 'components/DocHead'
import { useSiteStore } from 'context/SiteContext'

function SiteDocHead({ titleArray = [], description }) {
  const { pathname } = useLocation()
  const { site } = useSiteStore()

  const isKids = pathname?.startsWith(`/${site?.sitename}/kids`)

  const siteTitle = `${site?.title}${isKids ? ' Kids' : ''}`

  const _titleArray = [...titleArray, siteTitle]

  return (
    site?.title && (
      <DocHead titleArray={_titleArray} description={description} />
    )
  )
}
// PROPTYPES
const { array, string } = PropTypes
SiteDocHead.propTypes = {
  titleArray: array,
  description: string,
}

export default SiteDocHead
