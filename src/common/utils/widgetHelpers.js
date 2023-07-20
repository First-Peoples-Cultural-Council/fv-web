// Helper function to generate widgets available
// superAdmin flag is supplied to filter the list
import {
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
  WIDGET_TEXTMULTI,
  WIDGET_WOTD,
} from 'common/constants'

export const getEditableWidgetsForUser = (isSuperAdmin) =>
  [
    isSuperAdmin && WIDGET_ALPHABET,
    isSuperAdmin && WIDGET_APPS,
    WIDGET_CONTACT,
    isSuperAdmin && WIDGET_GALLERY,
    //   WIDGET_IFRAME,
    isSuperAdmin && WIDGET_KEYBOARDS,
    WIDGET_LOGO,
    WIDGET_QUOTES,
    isSuperAdmin && WIDGET_STATS,
    WIDGET_TEXT,
    WIDGET_TEXTCONCISE,
    WIDGET_TEXTFULL,
    isSuperAdmin && WIDGET_TEXTICONS,
    //   WIDGET_TEXTMULTI,
    isSuperAdmin && WIDGET_WOTD,
  ].filter(Boolean)

export const isEditableWidgetType = (widgetType) => {
  const editableWidgetTypes = [
    WIDGET_APPS,
    WIDGET_CONTACT,
    WIDGET_GALLERY,
    WIDGET_IFRAME,
    WIDGET_KEYBOARDS,
    WIDGET_LOGO,
    WIDGET_QUOTES,
    WIDGET_TEXT,
    WIDGET_TEXTCONCISE,
    WIDGET_TEXTFULL,
    WIDGET_TEXTICONS,
    WIDGET_TEXTMULTI,
  ]
  return editableWidgetTypes.indexOf(widgetType) !== -1
}

export const getObjectFromSettingsArray = (settingsArray) => {
  const settingsObject = {}
  settingsArray?.forEach((setting) => {
    settingsObject[setting?.key] = setting?.value
  })
  return settingsObject
}
