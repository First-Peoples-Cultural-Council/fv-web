// FPCC
import { useSiteStore } from 'context/SiteContext'
import { IMAGE, VIDEO } from 'common/constants'

function HomeData() {
  const { site } = useSiteStore()
  const { bannerImage, bannerVideo, homepageWidgets } = site

  let bannerType = null
  let bannerMedia = null

  if (bannerImage) {
    bannerType = IMAGE
    bannerMedia = bannerImage
  } else if (bannerVideo) {
    bannerType = VIDEO
    bannerMedia = bannerVideo
  }

  return {
    bannerMedia,
    bannerType,
    site,
    widgetData: homepageWidgets,
  }
}

export default HomeData
