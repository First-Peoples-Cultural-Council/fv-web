import { useParams } from 'react-router-dom'

// FPCC
import { usePage } from 'common/dataHooks/usePages'
import { IMAGE, VIDEO } from 'common/constants'

function PageData({ pageSlug }) {
  const { slug } = useParams()

  const slugToUse = pageSlug || slug

  // Data fetch
  const pageQueryReturn = usePage({
    pageSlug: slugToUse,
  })

  let backgroundType = null
  let background = null

  if (pageQueryReturn?.data?.bannerImage) {
    backgroundType = IMAGE
    background = pageQueryReturn?.data?.bannerImage
  } else if (pageQueryReturn?.data?.bannerVideo) {
    backgroundType = VIDEO
    background = pageQueryReturn?.data?.bannerVideo
  }

  return {
    pageQueryReturn,
    banner: {
      background,
      backgroundType,
      showLogo: slugToUse === 'our-language' || slugToUse === 'our-people',
    },
    widgets: pageQueryReturn?.data?.widgets || [],
    title: pageQueryReturn?.data?.title,
    subtitle: pageQueryReturn?.data?.subtitle,
  }
}

export default PageData
