import { useNavigate, useParams } from 'react-router'

// Uppy
import '@uppy/core/css/style.min.css'
import '@uppy/dashboard/css/style.min.css'
import '@uppy/image-editor/css/style.min.css'

// FPCC
import { useImportJobCreate } from 'common/dataHooks/useImportJobs'

function ImportCrudData() {
  const { sitename } = useParams()

  const navigate = useNavigate()
  const backHandler = () => navigate(`/${sitename}/dashboard/imports`)

  const { mutate: create } = useImportJobCreate()

  const submitHandler = (formData) => create(formData)

  return {
    submitHandler,
    backHandler,
  }
}

export default ImportCrudData
