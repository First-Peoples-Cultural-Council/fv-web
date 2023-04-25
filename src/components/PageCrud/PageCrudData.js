import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useNavigate, useLocation } from 'react-router-dom'

// FPCC
import { DOC_PAGE } from 'common/constants'
import api from 'services/api'
import { useSiteStore } from 'context/SiteContext'
import pageCrudDataAdaptor from 'components/PageCrud/pageCrudDataAdaptor'
import { useNotification } from 'context/NotificationContext'
import { selectOneFormHelper } from 'common/utils/mediaHelpers'

function PageCrudData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()

  const { setNotification } = useNotification()

  const backHandler = () => navigate(-1)

  const _pageId = new URLSearchParams(location.search).get('id')
    ? new URLSearchParams(location.search).get('id')
    : null
  const editHeader = new URLSearchParams(location.search).get('editHeader')
    ? new URLSearchParams(location.search).get('editHeader')
    : null

  let dataToEdit = null

  if (_pageId) {
    const { data } = useQuery(
      [_pageId],
      () => api.document.get({ id: _pageId, properties: '*' }),
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    )

    dataToEdit = pageCrudDataAdaptor({ data, sitename: site?.sitename })
  }

  const formDataAdaptor = (_formData) => {
    const mediaObject = selectOneFormHelper(_formData, 'banner')

    return {
      'dc:title': _formData?.title,
      'dc:description': _formData?.subtitle,
      'fvpage:url': _formData?.url,
      'fvpage:background_top_image': mediaObject?.imageId,
      'fvpage:background_top_video': mediaObject?.videoId,
    }
  }

  const savePage = async (formData) => {
    if (_pageId && dataToEdit) {
      return await api.document.updateAndSetVisibility({
        id: _pageId,
        properties: formDataAdaptor(formData),
        visibility: formData?.visibility,
      })
    }
    return await api.document.createAndSetVisibility({
      parentId: site?.children?.Pages,
      name: formData?.url,
      docType: DOC_PAGE,
      properties: formDataAdaptor(formData),
      visibility: formData?.visibility,
    })
  }

  const { mutate } = useMutation(savePage, {
    onSuccess: (response) => {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! The page has been saved.',
      })
      setTimeout(() => {
        window.location.href = `/${site?.sitename}/dashboard/edit/page?id=${response?.uid}`
      }, 1000)
    },
    onError: () => {
      setNotification({
        type: 'ERROR',
        message:
          'ERROR: There was a problem creating your page. Please try again. If the error persists please contact FirstVoices Support.',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [_pageId] })
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
    isWidgetAreaEdit: !!(_pageId && !editHeader),
  }
}

export default PageCrudData
