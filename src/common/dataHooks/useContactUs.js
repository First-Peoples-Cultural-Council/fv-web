import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

// FPCC
import { CONTACT_US } from 'common/constants'
import api from 'services/api'
import { contactUsAdaptor } from 'common/dataAdaptors/contactUsAdaptor'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function useContactUsEmailList() {
  const { sitename } = useParams()
  const response = useQuery({
    queryKey: [CONTACT_US, sitename],
    queryFn: () => api.mail.get({ sitename }),
    ...{ enabled: !!sitename },
  })

  const emailList = response?.data?.[0]?.emailList
  const emailListAsString = emailList
    ?.map((v) => Object.values(v).join(''))
    .join(' - ')

  return { ...response, emailListAsString }
}

export function useContactUsSendEmail() {
  const { sitename } = useParams()

  const sendMail = async (formData) => {
    const properties = contactUsAdaptor({ formData })
    return api.mail.post({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: sendMail,
    redirectTo: ``,
    queryKeyToInvalidate: [CONTACT_US, sitename],
    actionWord: 'sent',
    type: 'email',
  })

  const onSubmit = (formData) => mutation.mutate(formData)

  return { onSubmit }
}
