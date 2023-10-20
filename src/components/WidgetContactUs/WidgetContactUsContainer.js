import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import WidgetContactUsPresentation from 'components/WidgetContactUs/WidgetContactUsPresentation'
import WidgetContactUsData from 'components/WidgetContactUs/WidgetContactUsData'
import { useUserStore } from 'context/UserContext'

function WidgetContactUsContainer({ widgetData }) {
  const { title, text, textWithFormatting } = widgetData?.settings
  const { siteTitle, links, submitHandler } = WidgetContactUsData({
    widgetData,
  })

  const { user } = useUserStore()

  return (
    <WidgetContactUsPresentation
      title={title}
      subtitle={text}
      siteTitle={siteTitle}
      textWithFormatting={textWithFormatting}
      links={links}
      submitHandler={submitHandler}
      user={user}
    />
  )
}

const { shape, string } = PropTypes
WidgetContactUsContainer.propTypes = {
  widgetData: shape({
    settings: shape({
      textWithFormatting: string,
      title: string,
      urls: string,
      text: string,
    }),
  }),
}

export default WidgetContactUsContainer
