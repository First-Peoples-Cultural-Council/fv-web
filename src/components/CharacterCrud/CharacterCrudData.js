import { useQuery, useQueryClient } from 'react-query'
import { useNavigate, useLocation } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { useSiteStore } from 'context/SiteContext'
import characterCrudDataAdaptor from 'components/CharacterCrud/characterCrudDataAdaptor'
import { useNotification } from 'context/NotificationContext'

function CharacterCrudData() {
  const { site } = useSiteStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()

  const { setNotification } = useNotification()

  const backHandler = () => navigate(-1)

  const characterId = new URLSearchParams(location.search).get('id')
    ? new URLSearchParams(location.search).get('id')
    : null

  if (!characterId) {
    backHandler()
  }

  const { data, isLoading } = useQuery(
    ['character', characterId],
    () => api.document.get({ id: characterId, properties: '*' }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const submitHandler = (formData) => {
    if (characterId && data) {
      updateCharacter(formData)
    }
  }

  const updateCharacter = async (formData) => {
    const response = await api.document.update({
      id: characterId,
      parentRef: formData?.parentId,
      properties: {
        'fvcharacter:related_words': formData?.relatedWords || [],
        'fv:related_assets': formData?.relatedAssets || [],
        'fv:related_audio': formData?.relatedAudio || [],
        'fv:related_pictures': formData?.relatedImages || [],
        'fv:related_videos': formData?.relatedVideos || [],
        'fv:general_note': formData?.generalNote || '',
      },
    })

    if (response?.uid) {
      setNotification({ type: 'SUCCESS', message: 'Success! Your character has been saved.' })
      queryClient.invalidateQueries(['alphabet', site?.id])
      queryClient.invalidateQueries(['character', characterId])
      backHandler()
    } else {
      setNotification({
        type: 'ERROR',
        message: `ERROR: ${response?.status} ${response?.message}. Please try again. If the error persists please contact FirstVoices Support.`,
      })
    }
  }

  return {
    submitHandler,
    backHandler,
    dataToEdit: data ? characterCrudDataAdaptor({ data }) : {},
    isLoading,
  }
}

export default CharacterCrudData
