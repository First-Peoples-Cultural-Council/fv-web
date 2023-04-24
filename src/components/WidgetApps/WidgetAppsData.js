// FPCC
import { useSiteStore } from 'context/SiteContext'

function WidgetAppsData({ widgetData }) {
  const { site } = useSiteStore()

  return {
    header: `Download the ${site?.title} Dictionary App!`,
    logoId: site?.logoId,
    subtitle: `Browse words and phrases in the dictionary, practice with flashcards, bookmark content and more with the ${site?.title} mobile app! Available for iPhone, iPad and Android.`,
    urls: widgetData?.settings,
  }
}

export default WidgetAppsData
