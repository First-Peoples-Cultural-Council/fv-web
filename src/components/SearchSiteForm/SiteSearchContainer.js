import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import SearchInputContainer from 'components/SearchInput/SearchInputContainer'
import SearchInputContainerMinimal from 'components/SearchInput/SearchInputContainerMinimal'

function SiteSearchContainer({ kids = false, minimal = false }) {
  const { site } = useSiteStore()
  const baseUrl = `/${site.sitename}/search`

  return minimal ? (
    <SearchInputContainerMinimal kids={kids} customBaseUrl={baseUrl} />
  ) : (
    <SearchInputContainer kids={kids} customBaseUrl={baseUrl} />
  )
}

// PROPTYPES
const { bool } = PropTypes
SiteSearchContainer.propTypes = {
  minimal: bool,
  kids: bool,
}

export default SiteSearchContainer
