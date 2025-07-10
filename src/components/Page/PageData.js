import { useParams } from 'react-router'

// FPCC
import { usePage } from 'common/dataHooks/usePages'

function PageData({ pageSlug }) {
  const { slug } = useParams()
  const slugToUse = pageSlug || slug

  const pageQueryResponse = usePage({ pageSlug: slugToUse })

  return {
    pageQueryResponse,
    bannerImage: pageQueryResponse?.data?.bannerImage,
    bannerVideo: pageQueryResponse?.data?.bannerVideo,
    showLogo: slugToUse === 'our-language' || slugToUse === 'our-people',
    widgets: pageQueryResponse?.data?.widgets || [],
    title: pageQueryResponse?.data?.title,
    subtitle: pageQueryResponse?.data?.subtitle,
  }
}

export default PageData
