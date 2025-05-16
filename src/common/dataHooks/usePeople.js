import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import { PEOPLE } from 'common/constants'
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import useInfiniteScroll from 'common/dataHooks/useInfiniteScroll'

export function usePerson({ id }) {
  const { sitename } = useParams()
  const response = useQuery({
    queryKey: [PEOPLE, sitename, id],
    queryFn: () => api.people.get({ sitename, id }),
    ...{ enabled: !!id },
  })
  return response
}

export function usePeople() {
  const { sitename } = useParams()
  const infiniteQueryResponse = useInfiniteScroll({
    queryKey: [PEOPLE, sitename],
    queryFn: ({ pageParam = 1 }) =>
      api.people.getAll({
        sitename,
        pageParam,
      }),
  })
  return infiniteQueryResponse
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
    queryKeyToInvalidate: [PEOPLE, sitename],
    actionWord: 'created',
    type: 'speaker',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
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
    queryKeyToInvalidate: [PEOPLE, sitename],
    actionWord: 'updated',
    type: 'speaker',
  })

  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}

export function usePersonDelete() {
  const { sitename } = useParams()
  const deletePerson = async (id) =>
    api.people.delete({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deletePerson,
    redirectTo: `/${sitename}/dashboard/edit/speakers`,
    queryKeyToInvalidate: [PEOPLE, sitename],
    actionWord: 'deleted',
    type: 'speaker',
  })
  const onSubmit = (formData) => {
    mutation.mutate(formData)
  }
  return { onSubmit }
}
