import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import api from 'services/api'
import { WORD_OF_THE_DAY } from 'common/constants/paths'

function WidgetWordOfTheDayData() {
  const { sitename } = useParams()

  const queryResponse = useQuery({
    queryKey: [WORD_OF_THE_DAY, sitename],
    queryFn: () => api.wordOfTheDay.get({ sitename }),
    ...{ enabled: !!sitename },
  })
  const word = queryResponse?.data?.[0]?.dictionaryEntry
  const translationArray = word?.translations?.map((trans) => `${trans?.text}`)
  const partOfSpeech = word?.translations?.[0]?.partOfSpeech?.title
  return {
    audio: word?.relatedAudio,
    wordTitle: word?.title,
    queryResponse,
    translations: translationArray?.join('; '),
    partOfSpeech,
    title: 'WORD OF THE DAY',
    url: `${window.location.origin.toString()}/${sitename}/words/${word?.id}`,
    relativeUrl: `/${sitename}/words/${word?.id}`,
    sitename,
    entry: word,
  }
}

export default WidgetWordOfTheDayData
