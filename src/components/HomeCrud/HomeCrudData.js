import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useSiteUpdateBanner } from 'common/dataHooks/useSites'

function HomeCrudData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editHeader = searchParams.get('editHeader') || null

  const { onSubmit: updateSite } = useSiteUpdateBanner()

  const submitHandler = (formData) => {
    const values = { ...formData }
    updateSite(values)
  }

  return {
    submitHandler,
    backHandler: () => navigate(`/${site?.sitename}/dashboard/edit/home`),
    site,
    dataToEdit: site,
    isWidgetAreaEdit: !editHeader,
  }
}

export default HomeCrudData
