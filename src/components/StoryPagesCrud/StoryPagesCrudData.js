import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

// FPCC
import { useStoryUpdatePageOrder } from 'common/dataHooks/useStories'
import {
  useStoryPageCreate,
  useStoryPageUpdate,
  useStoryPageDelete,
} from 'common/dataHooks/useStoryPage'

function StoryPagesCrudData({ storyData }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [pageIds, setPageIds] = useState([])
  const [addPageOpen, setAddPageOpen] = useState(false)

  const storyId = searchParams.get('id') || null

  useEffect(() => {
    if (storyData?.pages) {
      setPageIds(storyData?.pages)
    }
  }, [storyData])

  const { onSubmit: create } = useStoryPageCreate({ storyId })
  const { onSubmit: update } = useStoryPageUpdate({ storyId })
  const { onSubmit: deleteStoryPage } = useStoryPageDelete({ storyId })
  const { onSubmit: updatePageOrder } = useStoryUpdatePageOrder({ storyId })

  const submitHandler = (formData) => {
    if (formData?.id) {
      update(formData)
    } else {
      create(formData)
    }
  }

  const submitPageOrder = (idArray) => {
    const values = [...idArray]
    setPageIds(values)
    updatePageOrder(values)
  }

  return {
    addPageOpen,
    setAddPageOpen,
    goToStep: (step) => setSearchParams({ step, id: storyId }),
    pageIds,
    submitPageOrder,
    pages: storyData?.pagesData,
    submitHandler,
    deleteHandler: (pageId) => deleteStoryPage(pageId),
  }
}

export default StoryPagesCrudData
