import React from 'react'

import About from 'common/widgetIcons/About'
import Alphabet from 'common/icons/Alphabet'
import Apps from 'common/widgetIcons/Apps'
import Calendar from 'common/widgetIcons/Calendar'
import Camera from 'common/widgetIcons/Camera'
import Default from 'common/icons/Categories'
import ImageText from 'common/widgetIcons/ImageText'
import Keyboard from 'common/widgetIcons/Keyboard'
import Location from 'common/widgetIcons/Location'
import Lines from 'common/widgetIcons/Lines'
import Quotation from 'common/icons/Quotation'
import Mail from 'common/icons/Mail'
import Statistics from 'common/widgetIcons/Statistics'
import TextBlock from 'common/widgetIcons/TextBlock'

const recognisedCategories = {
  WIDGET_ALPHABET: Alphabet,
  WIDGET_APPS: Apps,
  WIDGET_CONTACT: Mail,
  WIDGET_GALLERY: Camera,
  WIDGET_IFRAME: Location,
  WIDGET_KEYBOARDS: Keyboard,
  WIDGET_LOGO: About,
  WIDGET_QUOTES: Quotation,
  WIDGET_STATS: Statistics,
  WIDGET_TEXT: ImageText,
  WIDGET_TEXTCONCISE: Lines,
  WIDGET_TEXTFULL: TextBlock,
  WIDGET_TEXTICONS: ImageText,
  WIDGET_WOTD: Calendar,
}

function useWidgetIcon(widgetType, iconStyling) {
  const styling = iconStyling || 'fill-current h-12 w-12'
  const iconFile = recognisedCategories[widgetType]
  const Icon = iconFile || Default
  return <Icon styling={styling} />
}
export default useWidgetIcon
