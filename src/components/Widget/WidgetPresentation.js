import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import {
  WIDGET_ALPHABET,
  WIDGET_APPS,
  WIDGET_CONTACT,
  WIDGET_GALLERY,
  WIDGET_IFRAME,
  WIDGET_IMAGE,
  WIDGET_KEYBOARDS,
  WIDGET_LOGO,
  WIDGET_QUOTES,
  WIDGET_STATS,
  WIDGET_TEXT,
  WIDGET_TEXTCONCISE,
  WIDGET_TEXTFULL,
  WIDGET_TEXTICONS,
  WIDGET_VIDEO,
  WIDGET_WOTD,
} from 'common/constants'

import Alphabet from 'components/Alphabet'
import WidgetApps from 'components/WidgetApps'
import WidgetContactUs from 'components/WidgetContactUs'
import Gallery from 'components/Gallery'
import WidgetIframe from 'components/WidgetIframe'
import WidgetImageVideo from 'components/WidgetImageVideo'
import WidgetKeyboards from 'components/WidgetKeyboards'
import WidgetLogo from 'components/WidgetLogo'
import WidgetQuotes from 'components/WidgetQuotes'
import WidgetText from 'components/WidgetText'
import WidgetTextConcise from 'components/WidgetTextConcise'
import WidgetTextFull from 'components/WidgetTextFull'
import WidgetTextIcons from 'components/WidgetTextIcons'
import WidgetStats from 'components/WidgetStats'
import WidgetWordOfTheDay from 'components/WidgetWordOfTheDay'

function WidgetPresentation({ data, type }) {
  switch (type) {
    case WIDGET_ALPHABET:
      return <Alphabet.Container widgetView />

    case WIDGET_APPS:
      return <WidgetApps.Presentation />

    case WIDGET_CONTACT:
      return <WidgetContactUs.Container widgetData={data} />

    case WIDGET_GALLERY:
      return <Gallery.Container id={data?.settings?.galleryId} view="widget" />

    case WIDGET_IFRAME:
      return <WidgetIframe.Presentation widgetData={data} />

    case WIDGET_IMAGE:
      return <WidgetImageVideo.Presentation widgetData={data} />

    case WIDGET_KEYBOARDS:
      return <WidgetKeyboards.Container widgetData={data} />

    case WIDGET_LOGO:
      return <WidgetLogo.Presentation widgetData={data} />

    case WIDGET_QUOTES:
      return <WidgetQuotes.Presentation widgetData={data} />

    case WIDGET_STATS:
      return <WidgetStats.Container widgetData={data} />

    case WIDGET_TEXT:
      return <WidgetText.Presentation widgetData={data} />

    case WIDGET_TEXTCONCISE:
      return <WidgetTextConcise.Presentation widgetData={data} />

    case WIDGET_TEXTFULL:
      return <WidgetTextFull.Presentation widgetData={data} />

    case WIDGET_TEXTICONS:
      return <WidgetTextIcons.Presentation widgetData={data} />

    case WIDGET_VIDEO:
      return <WidgetImageVideo.Presentation widgetData={data} />

    case WIDGET_WOTD:
      return <WidgetWordOfTheDay.Container />

    default:
      return ''
  }
}
// PROPTYPES
const { object } = PropTypes

WidgetPresentation.propTypes = {
  data: object,
  type: PropTypes.oneOf([
    WIDGET_ALPHABET,
    WIDGET_APPS,
    WIDGET_CONTACT,
    WIDGET_GALLERY,
    WIDGET_IFRAME,
    WIDGET_KEYBOARDS,
    WIDGET_LOGO,
    WIDGET_QUOTES,
    WIDGET_STATS,
    WIDGET_TEXT,
    WIDGET_TEXTCONCISE,
    WIDGET_TEXTFULL,
    WIDGET_TEXTICONS,
    WIDGET_WOTD,
  ]),
}

export default WidgetPresentation
