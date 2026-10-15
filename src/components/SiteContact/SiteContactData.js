// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useContactUsSendEmail } from 'common/dataHooks/useContactUs'
import { useOrganizations } from 'common/dataHooks/useOrganizations'

function SiteContactData() {
  const { site } = useSiteStore()
  const { title } = site

  const infiniteQueryResponse = useOrganizations()

  const { onSubmit: sendMail } = useContactUsSendEmail()

  const submitHandler = async (formData) => {
    sendMail(formData)
  }

  return {
    submitHandler,
    siteTitle: title,
    organization: infiniteQueryResponse?.data?.pages?.[0]?.results?.[0],
    infiniteQueryResponse,
  }
}

export default SiteContactData
