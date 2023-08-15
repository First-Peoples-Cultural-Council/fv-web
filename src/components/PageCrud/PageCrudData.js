import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
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
  const backHandler = () => navigate(-1)

  const [searchParams] = useSearchParams()
  const pageId = searchParams.get('id') || null
  const pageSlug = searchParams.get('slug') || null
  const editHeader = new URLSearchParams(location.search).get('editHeader')
    ? new URLSearchParams(location.search).get('editHeader')
    : null

  // retrieve data
  const { data } = usePage({ pageSlug })

  const { onSubmit: create } = usePageCreate()
  const { onSubmit: update } = usePageUpdate()
  const { onSubmit: deletePage } = usePageDelete()

  const submitHandler = (formData) => {
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
