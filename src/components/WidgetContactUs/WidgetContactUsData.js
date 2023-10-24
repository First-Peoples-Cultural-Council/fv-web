// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useContactUsSendEmail } from 'common/dataHooks/useContactUs'

function ContactUsData({ widgetData }) {
  const { site } = useSiteStore()
  const { title } = site

  let links = []
  const linkString = widgetData?.settings?.urls || ''
  if (linkString) {
    links = linkString.split(',')
  }

  const { onSubmit: sendMail } = useContactUsSendEmail()

  const submitHandler = async (formData) => {
    sendMail(formData)
  }

  return {
    submitHandler,
    links,
    siteTitle: title,
  }
}

export default ContactUsData
