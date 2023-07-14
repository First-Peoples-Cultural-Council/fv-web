import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'

// FPCC
import api from 'services/api'
import { NOTIFICATION_TIME } from 'common/constants'
import { useSiteStore, useSiteDispatch } from 'context/SiteContext'
import { useNotification } from 'context/NotificationContext'
import { selectOneFormHelper } from 'common/utils/mediaHelpers'
import homeCrudDataAdaptor from 'components/HomeCrud/homeCrudDataAdaptor'

function HomeCrudData() {
  const { site } = useSiteStore()
  const siteDispatch = useSiteDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()

  const { setNotification } = useNotification()

  const backHandler = () => navigate(`/${site?.sitename}/dashboard/edit/home`)

  const editHeader = new URLSearchParams(location.search).get('editHeader')
    ? new URLSearchParams(location.search).get('editHeader')
    : null

  const dataToEdit = homeCrudDataAdaptor({ data: site })

  const updateSite = async (formData) => {
    const mediaObject = selectOneFormHelper(formData, 'banner')
    return api.document.update({
      id: site?.uid,
      properties: {
        'fvdialect:logo': formData?.logoId,
        'fvdialect:background_top_image': mediaObject?.imageId,
        'fvdialect:background_top_video': mediaObject?.videoId,
      },
    })
  }

  const { mutate } = useMutation(updateSite, {
    // When mutate is called:
    onMutate: async (formData) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['site', site?.sitename] })
      // Snapshot the previous value
      const previousSiteData = queryClient.getQueryData([
        'site',
        site?.sitename,
      ])
      // Optimistically update to the new value
      if (previousSiteData) {
        // Updating image and video id for the original form
        const mediaObject = selectOneFormHelper(formData, 'banner')
        siteDispatch({
          type: 'SET',
          data: {
            ...previousSiteData,
            logoId: formData?.logoId,
            topBackgroundImageId: mediaObject?.imageId,
            topBackgroundVideoId: mediaObject?.videoId,
          },
        })
      }
      return { previousSiteData }
    },
    onSuccess: () => {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! Your logo and banner have been set.',
      })
      setTimeout(() => {
        navigate(`/${site?.sitename}/dashboard/edit/home`)
      }, NOTIFICATION_TIME)
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousSiteData) {
        siteDispatch({
          type: 'SET',
          data: {
            ...context?.previousSiteData,
          },
        })
      }
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: Your logo and banner have not been set. Please try again. If the error persists please contact FirstVoices Support.',
      })
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['site', site?.sitename] })
    },
  })

  const submitHandler = (formData) => {
    const values = { ...formData }
    mutate(values)
  }

  return {
    submitHandler,
    backHandler,
    site,
    dataToEdit,
    isWidgetAreaEdit: !editHeader,
  }
}

export default HomeCrudData
