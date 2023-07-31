import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { PEOPLE } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function usePerson({ id }) {
  const { sitename } = useParams()
  const response = useQuery(
    [PEOPLE, sitename, id],
    () => api.people.get({ sitename, id }),
    { enabled: !!id },
  )
  return response
}

export function usePeople() {
  const { sitename } = useParams()
  const response = useQuery(
    [PEOPLE, sitename],
    () => api.people.getAll({ sitename }),
    { enabled: !!sitename },
  )
  return response
}

export function usePersonCreate() {
  const { sitename } = useParams()

  const createPerson = async (formData) => {
    const properties = {
      name: formData?.name || null,
      bio: formData?.bio || null,
    }
    return api.people.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createPerson,
    redirectTo: `/${sitename}/dashboard/edit/speakers`,
    queryKey: [PEOPLE, sitename],
  })

  const onSubmit = (event) => {
    event.preventDefault()
    mutation.mutate(new FormData(event.target))
  }
  return { onSubmit }
}

export function usePersonUpdate() {
  const { sitename } = useParams()

  const updatePerson = async (formData) => {
    const properties = {
      name: formData?.name || null,
      bio: formData?.bio || null,
    }
    return api.people.update({
      id: formData?.id,
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updatePerson,
    redirectTo: `/${sitename}/dashboard/edit/speakers`,
    queryKey: [PEOPLE, sitename],
  })

  const onSubmit = (event) => {
    event.preventDefault()
    mutation.mutate(new FormData(event.target))
  }
  return { onSubmit }
}
