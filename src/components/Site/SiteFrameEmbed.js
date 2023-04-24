import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'
import Audiobar from 'components/Audiobar'
import Loading from 'components/Loading'

function SiteFrameEmbed({ siteLoading }) {
  return (
    <Fragment>
      <main role="main">
        <Loading.Container isLoading={siteLoading}>
          <Routes>
            <Route path=":widgetId" element={<Widget.Container />} />
          </Routes>
        </Loading.Container>
      </main>
      <Audiobar.Container />
    </Fragment>
  )
}

// PROPTYPES
const { bool } = PropTypes
SiteFrameEmbed.propTypes = {
  siteLoading: bool,
}

export default SiteFrameEmbed
