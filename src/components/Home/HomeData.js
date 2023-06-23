// FPCC
import { useSiteStore } from 'context/SiteContext'

function HomeData() {
  const { site } = useSiteStore()
  const { topBackgroundImageId, topBackgroundVideoId } = site

  let backgroundType = null
  let backgroundId = null

  if (topBackgroundImageId) {
    backgroundType = 'gifOrImg'
    backgroundId = topBackgroundImageId
  } else if (topBackgroundVideoId) {
    backgroundType = 'video'
    backgroundId = topBackgroundVideoId
  }

  return {
    backgroundId,
    backgroundType,
    site,
  }
}

export default HomeData
