// FPCC
import { useSiteStore } from 'context/SiteContext'

function ImmersionCrudData({ label }) {
  const { site } = useSiteStore()

  return {
    submitHandler: () => {},
    site,
    dataToEdit: label,
  }
}

export default ImmersionCrudData
