import { useNavigate, useLocation, useSearchParams } from 'react-router'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  usePage,
  usePageCreate,
  usePageInfoUpdate,
  usePageDelete,
} from 'common/dataHooks/usePages'
import { getCustomPageHref } from 'common/utils/urlHelpers'
import { selectOneMediaDataHelper } from 'common/utils/mediaHelpers'

function PageCrudData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const location = useLocation()
  const backHandler = () => navigate(-1)

  const [searchParams] = useSearchParams()
  const pageSlug = searchParams.get('slug') || null
  const editHeader = new URLSearchParams(location.search).get('editHeader')
    ? new URLSearchParams(location.search).get('editHeader')
    : null

  // retrieve data
  const { data } = usePage({ pageSlug })

  const mediaObject = selectOneMediaDataHelper(
    data?.bannerImage,
    data?.bannerVideo,
  )

  const dataForForm = {
    ...data,
    banner: mediaObject,
    href: getCustomPageHref({
      sitename: data?.site?.slug,
      pageSlug,
    }),
  }

  const { onSubmit: create } = usePageCreate()
  const { onSubmit: update } = usePageInfoUpdate()
  const { onSubmit: deletePage } = usePageDelete()

  const submitHandler = (formData) => {
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
    dataToEdit: dataForForm,
    isWidgetAreaEdit: !!(pageSlug && !editHeader),
    deleteHandler: () => deletePage(pageSlug),
  }
}

export default PageCrudData
