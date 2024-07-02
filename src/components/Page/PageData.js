import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// FPCC
import { usePage } from 'common/dataHooks/usePages'
import { IMAGE, VIDEO } from 'common/constants'

function PageData({ pageSlug }) {
  const { slug, sitename } = useParams()
  const navigate = useNavigate()

  const slugToUse = pageSlug || slug

  // Data fetch
  const { data, error, isError, isFetched } = usePage({
    pageSlug: slugToUse,
  })

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  let backgroundType = null
  let background = null

  if (data?.bannerImage) {
    backgroundType = IMAGE
    background = data?.bannerImage
  } else if (data?.bannerVideo) {
    backgroundType = VIDEO
    background = data?.bannerVideo
  }

  return {
    notFound: !!(isFetched && data?.length === 0),
    banner: {
      background,
      backgroundType,
      showLogo: slugToUse === 'our-language' || slugToUse === 'our-people',
    },
    widgets: data?.widgets || [],
    title: data?.title,
    subtitle: data?.subtitle,
  }
}

export default PageData
