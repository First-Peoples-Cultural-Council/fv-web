import { useNavigate, useLocation } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { homeCrudDataAdaptor } from 'components/HomeCrud/homeCrudDataAdaptor'
import { useSiteUpdateBanner } from 'common/dataHooks/useSites'

function HomeCrudData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const location = useLocation()

  const backHandler = () => navigate(`/${site?.sitename}/dashboard/edit/home`)

  const editHeader = new URLSearchParams(location.search).get('editHeader')
    ? new URLSearchParams(location.search).get('editHeader')
    : null
  const dataToEdit = homeCrudDataAdaptor({ data: site })

  const { onSubmit: updateSite } = useSiteUpdateBanner()

  const submitHandler = (formData) => {
    const values = { ...formData }
    updateSite(values)
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
