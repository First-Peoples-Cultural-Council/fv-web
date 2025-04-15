import { useNavigate, useParams, useSearchParams } from 'react-router'

// FPCC
import { useDocument, useDocumentUpdate } from 'common/dataHooks/useDocuments'
import { MEDIA, DOCUMENT_PATH } from 'common/constants'

function DocumentCrudData() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { sitename } = useParams()
  const id = searchParams.get('id')

  const queryResponse = useDocument({ id, edit: true })

  const { onSubmit } = useDocumentUpdate({ id })
  const submitHandler = (formData) => onSubmit(formData)
  const backHandler = () =>
    navigate(`/${sitename}/dashboard/${MEDIA}/${DOCUMENT_PATH}`)

  return {
    queryResponse,
    submitHandler,
    backHandler,
  }
}

export default DocumentCrudData
