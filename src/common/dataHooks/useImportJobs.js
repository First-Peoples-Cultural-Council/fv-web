import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import api from 'services/api'
import { IMPORT_JOBS } from 'common/constants'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { isUUID } from 'common/utils/stringHelpers'

export function useImportJob({ id }) {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [IMPORT_JOBS, sitename, id],
    queryFn: () => api.importJobs.get({ sitename, id }),
    enabled: !!isUUID(id),
  })

  return queryResponse
}

export function useImportJobs({ page }) {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [IMPORT_JOBS, sitename, page],
    queryFn: () =>
      api.importJobs.getAll({
        sitename,
        pageParam: page,
      }),
    placeholderData: keepPreviousData,
  })
  return queryResponse
}

// CREATE
export function useImportJobCreate(options = {}) {
  const { sitename } = useParams()
  const queryClient = useQueryClient()

  const createImportJob = async (formJson) => {
    const formData = new FormData()
    formData.append('title', formJson?.title)
    formData.append('data', formJson?.csvFile?.[0])

    return api.importJobs.create({
      sitename,
      formData,
    })
  }

  const mutation = useMutation({
    mutationFn: createImportJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [IMPORT_JOBS, sitename],
      })
    },
    ...options,
  })

  return mutation
}

// VALIDATE
export function useImportJobValidate() {
  const { sitename } = useParams()

  const validateImportJob = async (id) =>
    api.importJobs.validate({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: validateImportJob,
    queryKeyToInvalidate: [IMPORT_JOBS, sitename],
    actionWord: 'Submitted for validation',
    type: 'import',
  })

  return mutation
}

// DELETE
export function useImportJobDelete() {
  const { sitename } = useParams()
  const deleteImportJob = async (id) =>
    api.importJobs.delete({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteImportJob,
    queryKeyToInvalidate: [IMPORT_JOBS, sitename],
    actionWord: 'cancelled',
    type: 'import',
  })

  return mutation
}
