import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

// FPCC
import { CONTACT_US } from 'common/constants'
import api from 'services/api'
import { contactUsAdaptor } from 'common/dataAdaptors/contactUsAdaptor'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function useContactUs() {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [CONTACT_US, sitename],
    queryFn: () => api.contactUs.get({ sitename }),
    select: (data) => ({
      ...data,
      emailListAsString: data?.[0]?.emailList
        ?.map((v) => Object.values(v).join(''))
        .join(' - '),
    }),
    enabled: !!sitename,
  })

  return queryResponse
}

export function useContactUsSendEmail() {
  const { sitename } = useParams()

  const sendMail = async (formData) => {
    const properties = contactUsAdaptor({ formData })
    return api.contactUs.post({
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
