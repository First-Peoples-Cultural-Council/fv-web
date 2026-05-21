import { useNavigate, useParams, useSearchParams } from 'react-router'

// FPCC
import { useImage, useImageUpdate } from 'common/dataHooks/useImages'
import { MEDIA, IMAGE_PATH } from 'common/constants'

function ImageCrudData() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { sitename } = useParams()
  const id = searchParams.get('id')

  const queryResponse = useImage({ id, edit: true })

  const { onSubmit } = useImageUpdate({ id })
  const submitHandler = (formData) => onSubmit(formData)
  const backHandler = () =>
    navigate(`/${sitename}/dashboard/${MEDIA}/${IMAGE_PATH}`)

  return {
    queryResponse,
    submitHandler,
    backHandler,
  }
}

export default ImageCrudData
