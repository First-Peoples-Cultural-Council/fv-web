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
    enabled: !!sitename,
  })

  const entry = queryResponse?.data?.[0]?.dictionaryEntry

  return {
    queryResponse,
    relativeUrl: `/${sitename}/words/${entry?.id}`,
    sitename,
    entry,
  }
}

export default WidgetWordOfTheDayData
