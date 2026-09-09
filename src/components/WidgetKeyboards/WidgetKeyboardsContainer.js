import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetKeyboardsPresentation from 'components/WidgetKeyboards/WidgetKeyboardsPresentation'
import { useSiteStore } from 'context/SiteContext'

function WidgetKeyboardsContainer({ widgetData }) {
  const { site } = useSiteStore()
  const header = `Install the ${site?.title} keyboard to type in your language!`

  return (
    <WidgetKeyboardsPresentation header={header} urls={widgetData?.settings} />
  )
}

const { shape, string } = PropTypes

WidgetKeyboardsContainer.propTypes = {
  widgetData: shape({
    settings: shape({
      macUrl: string,
      windowsUrl: string,
    }),
  }),
}

export default WidgetKeyboardsContainer
