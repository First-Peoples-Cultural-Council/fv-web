import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetTextConcise from 'components/WidgetTextConcise'

function WidgetContactUs({ widgetData }) {
  const dataForTextWidget = {
    sitename: widgetData?.sitename,
    settings: {
      title: widgetData?.settings?.title || 'Contact',
      text:
        widgetData?.settings?.text ||
        'Please contact us if you have any suggestions or feedback regarding our language content.',
      url: `/${widgetData?.sitename}/contact`,
      urlLabel: 'Contact',
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
