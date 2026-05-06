import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router'

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
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
  return queryResponse
}

// CREATE
export function useImportJobCreate() {
  const navigate = useNavigate()
  const { sitename } = useParams()

  const createImportJob = async (formJson) => {
    const formData = new FormData()
    formData.append('title', formJson?.title)
    formData.append('data', formJson?.csvFile?.[0])

    return api.importJobs.create({
      sitename,
      formData,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createImportJob,
    queryKeyToInvalidate: [IMPORT_JOBS, sitename],
    actionWord: 'created',
    type: 'import job',
    onSuccessCallback: (response) => {
      if (response?.id) {
        navigate(`/${sitename}/dashboard/edit/import/${response?.id}/media`)
      }
    },
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
    actionWord: 'submitted for validation',
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
