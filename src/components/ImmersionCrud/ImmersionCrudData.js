import { useQueryClient } from '@tanstack/react-query'

// FPCC
import api from 'services/api'
import { useNotification } from 'context/NotificationContext'
import { useSiteStore } from 'context/SiteContext'
import { DOC_LABEL } from 'common/constants'

function ImmersionCrudData({ label }) {
  const { site } = useSiteStore()
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const submitHandler = (formData) => {
    if (label?.id) {
      updateLabel(formData)
    } else {
      createLabel(formData)
    }
  }

  const createLabel = async (formData) => {
    const response = await api.document.create({
      parentId: site?.children?.['Label Dictionary'],
      name: formData?.transKey,
      docType: DOC_LABEL,
      properties: {
        'dc:title': formData?.immersionLabel,
        'fvlabel:labelKey': formData?.transKey,
        'fv:related_audio': formData?.relatedAudio,
      },
    })
    if (response?.uid) {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! A new immersion label has been created.',
      })
      queryClient.invalidateQueries(['immersion', site?.id])
      setTimeout(() => {
        window.location.href = `/${site?.sitename}/dashboard/edit/immersion`
      }, 1000)
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: There was a problem creating a new immersion label. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  const updateLabel = async (formData) => {
    const response = await api.document.update({
      id: label?.id,
      properties: {
        'dc:title': formData?.immersionLabel,
        'fv:related_audio': formData?.relatedAudio,
      },
    })
    if (response?.uid) {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! Your immersion label has been saved.',
      })
      queryClient.invalidateQueries(['immersion', site?.id])
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: The changes to your immersion label have not been saved. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  return {
    submitHandler,
    site,
    dataToEdit: label,
  }
}

export default ImmersionCrudData
