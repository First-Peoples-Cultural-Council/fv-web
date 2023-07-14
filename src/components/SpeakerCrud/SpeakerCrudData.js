import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { useNotification } from 'context/NotificationContext'
import { useSiteStore } from 'context/SiteContext'
import speakerCrudDataAdaptor from 'components/SpeakerCrud/speakerCrudDataAdaptor'
import { DOC_SPEAKER } from 'common/constants'

function SpeakerCrudData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const backHandler = () => navigate(-1)

  const speakerId = new URLSearchParams(location.search).get('id')
    ? new URLSearchParams(location.search).get('id')
    : null

  let dataToEdit = null
  const { data } = useQuery(
    ['speaker', speakerId],
    () => api.document.get({ id: speakerId, properties: '*' }),
    {
      enabled: !!speakerId,
      refetchOnReconnect: false,
    },
  )
  dataToEdit = speakerCrudDataAdaptor({ data })

  const submitHandler = (formData) => {
    if (speakerId && dataToEdit) {
      updateSpeaker(formData)
    } else {
      createSpeaker(formData)
    }
  }

  const createSpeaker = async (formData) => {
    const response = await api.document.create({
      parentId: site?.children?.Contributors,
      name: formData?.name,
      docType: DOC_SPEAKER,
      properties: {
        'dc:title': formData?.name,
        'dc:description': formData?.bio,
      },
    })
    if (response?.uid) {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! A new speaker has been created.',
      })
      setTimeout(() => {
        window.location.href = `/${site?.sitename}/dashboard/edit/speakers`
      }, 1000)
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: There was a problem creating a new speaker. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  const updateSpeaker = async (formData) => {
    const response = await api.document.update({
      id: speakerId,
      properties: {
        'dc:title': formData?.name,
        'dc:description': formData?.bio,
      },
    })
    if (response?.uid) {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! Your speaker has been saved.',
      })
      queryClient.invalidateQueries(['speakers', site?.id])
      queryClient.invalidateQueries(['speaker', speakerId])
      backHandler()
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: The changes to your speaker have not been saved. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  return {
    submitHandler,
    backHandler,
    site,
    dataToEdit,
  }
}

export default SpeakerCrudData
