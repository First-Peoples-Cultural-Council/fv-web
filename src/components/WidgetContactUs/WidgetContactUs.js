import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetTextConcise from 'components/WidgetTextConcise'

function WidgetContactUs({ widgetData }) {
  const dataForTextWidget = {
    sitename: widgetData?.sitename,
    settings: {
      title: widgetData?.settings?.title,
      text: widgetData?.settings?.text,
      url: `/${widgetData?.sitename}/contact`,
      urlLabel: 'Contact us',
    },
  }

  return (
    <section id="WidgetContactUs">
      <WidgetTextConcise.Presentation widgetData={dataForTextWidget} />
    </section>
  )
}

const { shape, string } = PropTypes
WidgetContactUs.propTypes = {
  widgetData: shape({
    settings: shape({
      title: string,
      text: string,
    }),
  }),
}

export default WidgetContactUs
