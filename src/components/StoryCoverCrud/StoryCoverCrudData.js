import { useQuery, useQueryClient } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import useWysiwygState from 'common/useWysiwygState'

// FPCC
import api from 'services/api'
import { useNotification } from 'context/NotificationContext'
import { useSiteStore } from 'context/SiteContext'
import storyCrudDataAdaptor from 'components/StoryCoverCrud/storyCoverDataAdaptor'
import { DOC_STORY } from 'common/constants'
import { isUUID } from 'common/stringHelpers'
import { selectOneFormHelper } from 'common/utils/mediaHelpers'

function StoryCoverCrudData() {
  const { site } = useSiteStore()
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()
  const [searchParams, setSearchParams] = useSearchParams()
  const { getJsonFromWysiwygState } = useWysiwygState()

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
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )
  const dataToEdit = storyCrudDataAdaptor({ data })

  const submitHandler = (formData) => {
    if (storyId && dataToEdit) {
      updateCover(formData)
    } else {
      createCover(formData)
    }
  }

  const formDataAdaptor = (_formData) => {
    const intro = _formData?.intro?.getCurrentContent()
      ? getJsonFromWysiwygState(_formData?.intro?.getCurrentContent())
      : ''
    const introTranslation = _formData?.introTranslation?.getCurrentContent()
      ? getJsonFromWysiwygState(
          _formData?.introTranslation?.getCurrentContent(),
        )
      : ''
    const mediaObject = selectOneFormHelper(_formData, 'cover')

    return {
      'dc:title': _formData?.title,
      'fvbook:author_name': _formData?.author,
      'fvbook:intro': intro,
      'fvbook:intro_translation': introTranslation,
      'fvbook:title_literal_translation': _formData?.titleTranslation,
      'fvbook:type': 'story',
      'fvbook:pages': _formData?.pageOrder || [],
      'fv:acknowledgements': _formData?.acknowledgements,
      'fv:notes': _formData?.notes,
      'fv:related_audio': _formData?.audio,
      'fv:related_pictures': isUUID(mediaObject?.imageId)
        ? [mediaObject?.imageId]
        : [],
      'fv:related_videos': isUUID(mediaObject?.videoId)
        ? [mediaObject?.videoId]
        : [],
      'fvaudience:children': _formData?.kidFriendly === 'true',
    }
  }

  const createCover = async (formData) => {
    const response = await api.document.create({
      parentId: site?.children?.['Stories & Songs'],
      name: formData?.title,
      docType: DOC_STORY,
      properties: formDataAdaptor(formData),
    })
    if (response?.uid) {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! A new story has been created.',
      })
      setSearchParams({ step: 1, id: response?.uid })
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: There was a problem creating a new story. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  const updateCover = async (formData) => {
    const response = await api.document.update({
      id: storyId,
      properties: formDataAdaptor(formData),
    })
    if (response?.uid) {
      if (formData?.visibility !== dataToEdit?.visibility) {
        api.visibility.update({
          id: storyId,
          newVisibility: formData?.visibility,
        })
      }
      setNotification({
        type: 'SUCCESS',
        message: 'Success! Your story has been saved.',
      })
      queryClient.invalidateQueries([DOC_STORY, storyId])
      setSearchParams({ step: 1, id: storyId })
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: The changes to your story have not been saved. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  return {
    dataToEdit,
    submitHandler,
  }
}

export default StoryCoverCrudData
