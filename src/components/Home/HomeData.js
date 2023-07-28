// FPCC
import { useSiteStore } from 'context/SiteContext'
import { IMAGE, VIDEO } from 'common/constants'
import useSongs from 'common/dataHooks/useSongs'
import { useParams } from 'react-router-dom'

function HomeData() {
  const { sitename } = useParams()

  const { data } = useSongs({ sitename })

  console.log({ data })

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
