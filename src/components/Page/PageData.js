import { useParams } from 'react-router'

// FPCC
import { usePage } from 'common/dataHooks/usePages'
import { IMAGE, VIDEO } from 'common/constants'

function PageData({ pageSlug }) {
  const { slug } = useParams()

  const slugToUse = pageSlug || slug

  // Data fetch
  const pageQueryResponse = usePage({
    pageSlug: slugToUse,
  })

  let backgroundType = null
  let background = null

  if (pageQueryResponse?.data?.bannerImage) {
    backgroundType = IMAGE
    background = pageQueryResponse?.data?.bannerImage
  } else if (pageQueryResponse?.data?.bannerVideo) {
    backgroundType = VIDEO
    background = pageQueryResponse?.data?.bannerVideo
  }

  return {
    pageQueryResponse,
    banner: {
      background,
      backgroundType,
      showLogo: slugToUse === 'our-language' || slugToUse === 'our-people',
    },
    widgets: pageQueryResponse?.data?.widgets || [],
    title: pageQueryResponse?.data?.title,
    subtitle: pageQueryResponse?.data?.subtitle,
  }
}

export default PageData
