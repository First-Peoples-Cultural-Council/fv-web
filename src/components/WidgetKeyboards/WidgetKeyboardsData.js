// FPCC
import { useSiteStore } from 'context/SiteContext'

function WidgetKeyboardsData({ widgetData }) {
  const { site } = useSiteStore()

  return {
    header: `Install the ${site?.title} keyboard to type in your language!`,
    urls: widgetData?.settings,
  }
}

export default WidgetKeyboardsData
