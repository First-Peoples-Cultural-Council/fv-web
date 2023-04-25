import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// FPCC
import api from 'services/api'
import { useNotification } from 'context/NotificationContext'
import {
  convertStateToVisibility,
  getFriendlyDocType,
} from 'common/stringHelpers'
import { useSiteStore } from 'context/SiteContext'

function VisibilitySelectData({ id, docState, successCallback }) {
  const { site } = useSiteStore()
  const { setNotification } = useNotification()
  const [docVisibility, setDocVisibility] = useState(null)
  const [t] = useTranslation()

  useEffect(() => {
    if (convertStateToVisibility(docState) !== docVisibility) {
      setDocVisibility(convertStateToVisibility(docState))
    }
  }, [docState])

  const updateVisibility = async (newVisibility) => {
    const response = await api.visibility.update({
      id,
      newVisibility,
    })
    if (response?.uid) {
      setNotification({
        type: 'SUCCESS',
        message: `Success! Your ${getFriendlyDocType(
          response?.type,
        )} is now visible to: ${t(`visibility.${newVisibility}`)}.`,
      })
      setDocVisibility(newVisibility)
      if (successCallback) return successCallback()
    } else {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: There was a problem changing visibility of the document. Please try again. If the error persists please contact FirstVoices Support.',
      })
    }
  }

  const submitHandler = (selectedVisibility) => {
    if (docVisibility !== selectedVisibility)
      updateVisibility(selectedVisibility)
  }

  return {
    submitHandler,
    docVisibility,
    visibilityOptions: site?.visibilityOptions || [],
  }
}

export default VisibilitySelectData
