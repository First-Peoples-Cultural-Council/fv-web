import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { WORD_OF_THE_DAY } from 'common/constants/paths'

function WidgetWordOfTheDayData() {
  const { sitename } = useParams()

  const { data, error, isError } = useQuery(
    [WORD_OF_THE_DAY, sitename],
    () => api.wordOfTheDay.get({ sitename }),
    {
      // The query will not execute until the uid exists
      enabled: !!sitename,
    },
  )
  const word = data?.[0]?.dictionaryEntry
  const translationArray = word?.translations?.map((trans) => `${trans?.text}`)
  const partOfSpeech = word?.translations?.[0]?.partOfSpeech?.title

  return {
    audio: word?.relatedAudio,
    wordTitle: word?.title,
    isError: isError && error && error?.response?.status === 404,
    translations: translationArray?.join('; '),
    partOfSpeech,
    title: 'WORD OF THE DAY',
    url: `${window.location.origin.toString()}/${sitename}/words/${word?.id}`,
    relativeUrl: `/${sitename}/words/${word?.id}`,
  }
}

export default WidgetWordOfTheDayData
