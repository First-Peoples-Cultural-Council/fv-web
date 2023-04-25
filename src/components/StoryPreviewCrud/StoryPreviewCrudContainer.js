import React from 'react'
import { useSearchParams } from 'react-router-dom'

// FPCC
import StoryPreviewCrud from 'components/StoryPreviewCrud'
import StoryData from 'components/Story/StoryData'
import Loading from 'components/Loading'

function StoryPreviewCrudContainer() {
  const [searchParams] = useSearchParams()

  const storyId = searchParams.get('id') || null
  const { sitename, entry, isLoading } = StoryData({ docId: storyId })

  return (
    <Loading.Container isLoading={isLoading}>
      <StoryPreviewCrud.Presentation
        sitename={sitename}
        storyId={storyId}
        entry={entry}
      />
    </Loading.Container>
  )
}

export default StoryPreviewCrudContainer
