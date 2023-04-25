import { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSearchParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { useNotification } from 'context/NotificationContext'
import {
  storyPagesDataAdaptor,
  pageOrderDataAdaptor,
  pageFormDataAdaptor,
} from 'components/StoryPagesCrud/storyPagesDataAdaptor'
import { DOC_STORY, DOC_STORYPAGE } from 'common/constants'
import { isUUID } from 'common/stringHelpers'

function StoryPagesCrudData() {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()
  const [searchParams, setSearchParams] = useSearchParams()
  const [pageIds, setPageIds] = useState([])
  const [addPageOpen, setAddPageOpen] = useState(false)

  const storyId = searchParams.get('id') || null

  const { data, refetch, isLoading, error } = useQuery(
    [DOC_STORY, storyId],
    () =>
      api.document.get({
        id: storyId,
        properties: '*',
        contextParameters: 'ancestry,permissions,book',
      }),
    {
      enabled: isUUID(storyId),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  useEffect(() => {
    if (isLoading === false && error === null) {
      const pageOrder = pageOrderDataAdaptor({ data })
      setPageIds(pageOrder)
      if (pageOrder?.length < 1) {
        setAddPageOpen(true)
      }
    }
  }, [data, isLoading, error])

  const formattedPageData = storyPagesDataAdaptor({ data })

  const submitHandler = (formData) => {
    if (formData?.id) {
      updatePage(formData)
    } else {
      createPage(formData)
    }
  }

  const createPage = async (formData) => {
    const pageNumber =
      pageIds?.length > 0 ? `${pageIds?.length + 1}`.padStart(5, '0') : '00001'
    const properties = {
      ...pageFormDataAdaptor({ formData }),
      'fvbookentry:sort_map': pageNumber,
    }

    const createdResponse = await api.document.create({
      parentId: storyId,
      name: `PAGE_${pageNumber}`,
      docType: DOC_STORYPAGE,
      properties,
    })

    if (createdResponse?.uid) {
      const newPageOrder = [...pageIds, createdResponse.uid]
      const reorderedResponse = await savePageOrder(newPageOrder)

      if (reorderedResponse?.uid) {
        setNotification({
          type: 'SUCCESS',
          message: 'Success! A new story page has been created.',
        })
        setAddPageOpen(false)
        queryClient.invalidateQueries(['StoryPages', storyId])
        refetch()
        return
      }
    }

    setNotification({
      type: 'ERROR',
      message:
        'ERROR: There was a problem creating a new story page. Please try again. If the error persists please contact FirstVoices Support.',
    })
  }

  const updatePage = async (formData) => {
    const response = await api.document.update({
      id: formData?.id,
      properties: pageFormDataAdaptor({ formData }),
    })
    if (response?.uid) {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! Your story page has been saved.',
      })
      queryClient.invalidateQueries(['StoryPages', storyId])
      refetch()
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: The changes to your story page have not been saved. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  const savePageOrder = async (ids) => {
    setPageIds(ids)
    return await api.document.update({
      id: storyId,
      properties: {
        'fvbook:pages': ids,
      },
    })
  }

  const { mutate } = useMutation(savePageOrder, {
    onSuccess: () => {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! Your page order has been saved.',
      })
    },
    onError: () => {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: There was a problem saving your page order. Please try again. If the error persists please contact FirstVoices Support.',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries([DOC_STORY, storyId])
      refetch()
    },
  })

  const updatePageOrder = (idArray) => {
    const values = [...idArray]
    mutate(values)
  }

  return {
    addPageOpen,
    setAddPageOpen,
    goToStep: (step) => setSearchParams({ step, id: storyId }),
    pageIds,
    setPageIds: updatePageOrder,
    pages: formattedPageData,
    submitHandler,
  }
}

export default StoryPagesCrudData
