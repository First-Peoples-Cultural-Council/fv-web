import { useNavigate, useSearchParams } from 'react-router'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  usePage,
  usePageCreate,
  usePageInfoUpdate,
  usePageDelete,
} from 'common/dataHooks/usePages'

function PageCrudData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const backHandler = () => navigate(-1)

  const [searchParams] = useSearchParams()
  const pageSlug = searchParams.get('slug') || null
  const editHeader = searchParams.get('editHeader') || null

  // retrieve data
  const queryResponse = usePage({ pageSlug })

  const { onSubmit: create } = usePageCreate()
  const { onSubmit: update } = usePageInfoUpdate()
  const { onSubmit: deletePage } = usePageDelete()

  const submitHandler = (formData) => {
    if (pageSlug && queryResponse?.data?.slug) {
      update(formData)
    } else {
      create(formData)
    }
  }

  return {
    submitHandler,
    backHandler,
    site,
    queryResponse,
    isWidgetAreaEdit: !!(pageSlug && !editHeader),
    deleteHandler: () => deletePage(pageSlug),
  }
}

export default PageCrudData
