import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetKeyboardsPresentation from 'components/WidgetKeyboards/WidgetKeyboardsPresentation'
import WidgetKeyboardsData from 'components/WidgetKeyboards/WidgetKeyboardsData'

function WidgetKeyboardsContainer({ widgetData }) {
  const { header, urls } = WidgetKeyboardsData({ widgetData })

  return <WidgetKeyboardsPresentation header={header} urls={urls} />
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
