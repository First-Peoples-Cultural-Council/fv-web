// import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

// FPCC
// import { DOC_PAGE } from 'common/constants'
// import api from 'services/api'
import { useSiteStore } from 'context/SiteContext'
// import pageCrudDataAdaptor from 'components/PageCrud/pageCrudDataAdaptor'
// import { useNotification } from 'context/NotificationContext'
// import { selectOneFormHelper } from 'common/utils/mediaHelpers'
import {
  usePage,
  usePageCreate,
  usePageUpdate,
  usePageDelete,
} from 'common/dataHooks/usePages'

function PageCrudData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const location = useLocation()
  // const queryClient = useQueryClient()

  // const { setNotification } = useNotification()

  const backHandler = () => navigate(-1)

  const [searchParams] = useSearchParams()
  const pageId = searchParams.get('id') || null
  const pageSlug = searchParams.get('slug') || null
  // const editHeader = searchParams.get('editHeader') || null

  // const pageId = new URLSearchParams(location.search).get('id')
  //   ? new URLSearchParams(location.search).get('id')
  //   : null
  const editHeader = new URLSearchParams(location.search).get('editHeader')
    ? new URLSearchParams(location.search).get('editHeader')
    : null
  console.log({ pageId })
  console.log({ editHeader })

  // let dataToEdit = null

  // need to usePages() here to retrieve the data
  const { data } = usePage({ pageSlug })
  console.log({ data })

  // const { data } = useQuery(
  //   [_pageId],
  //   () => api.document.get({ id: _pageId, properties: '*' }),
  //   {
  //     enabled: !!_pageId,
  //   },
  // )
  const { onSubmit: create } = usePageCreate()
  const { onSubmit: update } = usePageUpdate()
  const { onSubmit: deletePage } = usePageDelete()

  // dataToEdit = pageCrudDataAdaptor({ data, sitename: site?.sitename })

  // const formDataAdaptor = (_formData) => {
  //   const mediaObject = selectOneFormHelper(_formData, 'banner')

  // return {
  //   'dc:title': _formData?.title,
  //   'dc:description': _formData?.subtitle,
  //   'fvpage:url': _formData?.url,
  //   'fvpage:background_top_image': mediaObject?.imageId,
  //   'fvpage:background_top_video': mediaObject?.videoId,
  // }
  // }

  // const savePage = async (formData) => {
  //   if (_pageId && dataToEdit) {
  //     return api.document.updateAndSetVisibility({
  //       id: _pageId,
  //       properties: formDataAdaptor(formData),
  //       visibility: formData?.visibility,
  //     })
  //   }
  //   return api.document.createAndSetVisibility({
  //     parentId: site?.children?.Pages,
  //     name: formData?.url,
  //     docType: DOC_PAGE,
  //     properties: formDataAdaptor(formData),
  //     visibility: formData?.visibility,
  //   })
  // }

  // const { mutate } = useMutation(savePage, {
  //   onSuccess: (response) => {
  //     setNotification({
  //       type: 'SUCCESS',
  //       message: 'Success! The page has been saved.',
  //     })
  //     setTimeout(() => {
  //       window.location.href = `/${site?.sitename}/dashboard/edit/page?id=${response?.uid}`
  //     }, 1000)
  //   },
  //   onError: () => {
  //     setNotification({
  //       type: 'ERROR',
  //       message:
  //         'ERROR: There was a problem creating your page. Please try again. If the error persists please contact FirstVoices Support.',
  //     })
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: [_pageId] })
  //   },
  // })

  // const submitHandler = (formData) => {
  //   const values = { ...formData }
  //   mutate(values)
  // }
  const submitHandler = (formData) => {
    console.log(formData)
    // debugger
    if (pageSlug && data?.slug) {
      update(formData)
    } else {
      create(formData)
    }
  }

  return {
    submitHandler,
    backHandler,
    site,
    dataToEdit: data,
    isWidgetAreaEdit: !!(pageId && !editHeader),
    deleteHandler: () => deletePage(data?.slug),
  }
}

export default PageCrudData
