// FPCC
import { useSiteStore } from 'context/SiteContext'

function HomeData() {
  const { site } = useSiteStore()
  const { title, uid, logoId, topBackgroundImageId, topBackgroundVideoId } = site

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
    title,
    logoId,
    siteId: uid,
  }
}

export default HomeData
