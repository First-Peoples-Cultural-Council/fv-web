import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetAppsPresentation from 'components/WidgetApps/WidgetAppsPresentation'
import WidgetAppsData from 'components/WidgetApps/WidgetAppsData'

function WidgetAppsContainer({ widgetData }) {
  const { header, logoId, subtitle, urls } = WidgetAppsData({ widgetData })

  return <WidgetAppsPresentation header={header} logoId={logoId} subtitle={subtitle} urls={urls} />
}

const { shape, string } = PropTypes
WidgetAppsContainer.propTypes = {
  widgetData: shape({
    settings: shape({
      iosUrl: string,
      androidUrl: string,
    }),
  }),
}

export default WidgetAppsContainer
