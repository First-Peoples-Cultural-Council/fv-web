import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router'

// FPCC
import api from 'services/api'
import { EXPORT_JOBS } from 'common/constants'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { isUUID } from 'common/utils/stringHelpers'

export function useExportJob({ id }) {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [EXPORT_JOBS, sitename, id],
    queryFn: () => api.exportJobs.get({ sitename, id }),
    enabled: !!isUUID(id),
  })

  return queryResponse
}

export function useExportJobs({ page }) {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [EXPORT_JOBS, sitename, page],
    queryFn: () =>
      api.exportJobs.getAll({
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
export function useExportJobCreate() {
  const navigate = useNavigate()
  const { sitename } = useParams()

  const createImportJob = async (formJson) => {
    const searchParamString = formJson.toString()

    return api.exportJobs.create({
      sitename,
      searchParams: searchParamString,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createImportJob,
    queryKeyToInvalidate: [EXPORT_JOBS, sitename],
    actionWord: 'created',
    type: 'export job',
    onSuccessCallback: (response) => {
      if (response?.id) {
        navigate(`/${sitename}/dashboard/edit/export/${response?.id}`)
      }
    },
  })

  return mutation
}

// DELETE
export function useExportJobDelete() {
  const { sitename } = useParams()
  const deleteImportJob = async (id) =>
    api.exportJobs.delete({
      id,
      sitename,
    })

  const mutation = useMutationWithNotification({
    mutationFn: deleteImportJob,
    queryKeyToInvalidate: [EXPORT_JOBS, sitename],
    actionWord: 'deleted',
    type: 'export',
  })

  return mutation
}
