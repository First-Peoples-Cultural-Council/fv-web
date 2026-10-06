import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import api from 'services/api'
import { WORD_OF_THE_DAY } from 'common/constants/paths'
import WidgetWordOfTheDayPresentation from 'components/WidgetWordOfTheDay/WidgetWordOfTheDayPresentation'

function WidgetWordOfTheDayContainer() {
  const { sitename } = useParams()

  const queryResponse = useQuery({
    queryKey: [WORD_OF_THE_DAY, sitename],
    queryFn: () => api.wordOfTheDay.get({ sitename }),
    enabled: !!sitename,
  })

  return (
    <WidgetWordOfTheDayPresentation
      entry={queryResponse?.data?.[0]?.dictionaryEntry}
      queryResponse={queryResponse}
    />
  )
}

export default WidgetWordOfTheDayContainer
