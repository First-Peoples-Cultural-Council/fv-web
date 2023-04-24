import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'

//FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'

function PageData({ url }) {
  const { site } = useSiteStore()
  const { uid, logoId } = site
  const { pageUrl, sitename } = useParams()
  const navigate = useNavigate()

  const urlToUse = url ? url : pageUrl

  // Data fetch
  const { data, error, isError, isFetched } = useQuery(['pages', uid + urlToUse], () => api.page.get(uid, urlToUse), {
    // The query will not execute until the uid exists
    enabled: !!uid,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true }
      )
    }
  }, [isError])

  let backgroundType = null
  let backgroundId = null

  if (data?.topBackgroundImageId) {
    backgroundType = 'gifOrImg'
    backgroundId = data?.topBackgroundImageId
  } else if (data?.topBackgroundVideoId) {
    backgroundType = 'video'
    backgroundId = data?.topBackgroundVideoId
  }

  return {
    notFound: isFetched && data?.length === 0 ? true : false,
    banner: {
      backgroundId,
      backgroundType,
      logoId: urlToUse === 'our-language' || urlToUse === 'our-people' ? logoId : null,
    },
    widgets: data?.widgets || [],
    title: data?.title,
    subtitle: data?.description,
  }
}

export default PageData
