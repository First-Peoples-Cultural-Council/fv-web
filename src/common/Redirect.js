import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'

function Redirect({ url }) {
  useEffect(() => {
    window.location.replace(url)
  }, [])

  return <Loading.Container isLoading />
}

// PROPTYPES
const { string } = PropTypes
Redirect.propTypes = {
  url: string,
}

export default Redirect
