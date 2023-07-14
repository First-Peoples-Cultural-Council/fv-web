import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'

function WidgetWordOfTheDayData() {
  const { site } = useSiteStore()
  const { uid } = site
  const { sitename } = useParams()

  const { data, error, isError } = useQuery(
    ['wotd', uid],
    () => api.widget.getWordOfTheDay({ siteId: uid }),
    {
      // The query will not execute until the uid exists
      enabled: !!uid,
    },
  )

  let partOfSpeech = ''
  const audio = []

  if (data?.partOfSpeech) {
    partOfSpeech = `Part of Speech: ${data?.partOfSpeech}`
  }

  if (data?.relatedAudio?.length > 0) {
    data?.relatedAudio?.forEach((element) => {
      audio.push(element.id)
    })
  }

  return {
    audio,
    hasShare: true,
    heading: data?.title,
    isError: isError && error && error?.response?.status === 404,
    subheading: data?.translations ? data?.translations.join('; ') : '',
    metadata: [partOfSpeech],
    title: 'WORD OF THE DAY',
    url: `${window.location.origin.toString()}/${sitename}/words/${data?.id}`,
    relativeUrl: `/${sitename}/words/${data?.id}`,
  }
}

export default WidgetWordOfTheDayData
