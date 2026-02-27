import { useNavigate, useSearchParams } from 'react-router'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  useImportJob,
  useImportJobCreate,
} from 'common/dataHooks/useImportJobs'

function ImportCrudData() {
  const { site } = useSiteStore()

  const navigate = useNavigate()
  const backHandler = () => navigate(-1)

  const [searchParams] = useSearchParams()
  const importJobId = searchParams.get('id') || null

  const queryResponse = useImportJob({ id: importJobId })
  const { mutate: create } = useImportJobCreate()

  const submitHandler = (formData) => create(formData)

  return {
    submitHandler,
    backHandler,
    site,
    queryResponse,
    importJobId,
  }
}

export default ImportCrudData
