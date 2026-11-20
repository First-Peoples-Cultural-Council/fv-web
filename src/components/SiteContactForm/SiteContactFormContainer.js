import React from 'react'

// FPCC
import SiteContactFormPresentation from 'components/SiteContactForm/SiteContactFormPresentation'
import { useContactUsSendEmail } from 'common/dataHooks/useContactUs'
import { useUserStore } from 'context/UserContext'

function SiteContactFormContainer() {
  const { user } = useUserStore()

  const { onSubmit: sendMail } = useContactUsSendEmail()

  const submitHandler = async (formData) => {
    sendMail(formData)
  }

  return (
    <SiteContactFormPresentation submitHandler={submitHandler} user={user} />
  )
}

export default SiteContactFormContainer
