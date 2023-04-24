// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'
import { useNotification } from 'context/NotificationContext'

function ContactUsData({ widgetData }) {
  const { site } = useSiteStore()
  const { title, uid } = site
  const { setNotification } = useNotification()

  let links = []
  const linkString = widgetData?.settings?.urls || ''
  if (linkString) {
    links = linkString.split(',')
  }

  const submitHandler = async (formData) => {
    if (formData) {
      sendMessage(formData)
    }
  }

  const sendMessage = async (formData) => {
    try {
      const response = await api.mail.post({
        siteId: uid,
        name: formData.name,
        from: formData.email,
        message: formData.message,
      })

      if (response?.status == 202) {
        setNotification({
          type: 'SUCCESS',
          message: 'Thank you for emailing the Language Team.',
        })
      }
    } catch (error) {
      if (error?.name === 'HTTPError') {
        switch (error?.response?.status) {
          case 400:
            setNotification({
              type: 'ERROR',
              message: `We've encountered the following error: ${error?.message}.`,
            })
            break
          case 429:
            setNotification({
              type: 'ERROR',
              message:
                'We have detected potential SPAM issue. Please try again in a few minutes or contact our Help Desk.',
            })
            break
          default:
            setNotification({
              type: 'ERROR',
              message: 'We have encountered an unexpected error. Please report this to our Help Desk.',
            })
            break
        }
      }
    }
  }

  return {
    submitHandler,
    links,
    siteTitle: title,
  }
}

export default ContactUsData
