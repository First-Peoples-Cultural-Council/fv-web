import { useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// FPCC
import api from 'services/api'
import { isUUID } from 'common/utils/stringHelpers'
import { DOC_STORY } from 'common/constants'

function StoryCrudData() {
  const [searchParams] = useSearchParams()
  const activeStep = searchParams.get('step')
    ? parseInt(searchParams.get('step'), 10)
    : 0
  const storyId = searchParams.get('id') || null

  const { data } = useQuery(
    [DOC_STORY, storyId],
    () =>
      api.document.get({
        id: storyId,
        properties: '*',
        contextParameters: 'ancestry,permissions,book',
      }),
    {
      enabled: isUUID(storyId),
    },
  )

  return {
    activeStep: Number(activeStep),
    storyId,
    storyState: data?.state || 'New',
  }
}

export default StoryCrudData
