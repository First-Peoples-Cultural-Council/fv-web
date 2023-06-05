import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'

// FPCC
import api from 'services/api'

function LandingPageData() {
  const { sitename } = useParams()
  const navigate = useNavigate()

  const { data, error, isError } = useQuery(
    ['landingPage'],
    () => api.landingPage.getPage(),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  // const { data: testData } = useQuery(['sites'], () => api.site.get())
  // console.log({ testData })
  const landingPageUid = data?.entries?.[0]?.uid

  // const rssFeed =
  //   'https://firstvoices.atlassian.net/wiki/createrssfeed.action?types=blogpost&blogpostSubTypes=attachment&spaces=conf_all&title=FirstVoices+Blog+RSS+Feed&labelString%3D&excludedSpaceKeys%3D&sort=modified&maxResults=10&timeSpan=1000&showContent=true&confirm=Create+RSS+Feed'

  // const MAX_ARTICLES = 3
  // const [articles, setArticles] = useState()
  // useEffect(() => {
  //   const loadArticles = api.blog.get(rssFeed)
  // })

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  return {
    landingPageUid,
  }
}

export default LandingPageData
