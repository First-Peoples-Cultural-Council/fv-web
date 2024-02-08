import { useNavigate, useSearchParams } from 'react-router-dom'

// FPCC
import {
  useGallery,
  useGalleryCreate,
  useGalleryUpdate,
  useGalleryDelete,
} from 'common/dataHooks/useGalleries'

function GalleryCrudData() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const backHandler = () => navigate(-1)

  const galleryId = searchParams.get('id')

  // Fetch Data
  const { data, isInitialLoading } = useGallery({ id: galleryId })

  const { onSubmit: createGallery } = useGalleryCreate()
  const { onSubmit: updateGallery } = useGalleryUpdate()
  const { onSubmit: deleteGallery } = useGalleryDelete()

  const submitHandler = (formData) => {
    if (galleryId && data) {
      updateGallery(formData)
    } else {
      createGallery(formData)
    }
  }

  return {
    submitHandler,
    backHandler,
    dataToEdit: data,
    deleteHandler: () => deleteGallery(data?.id),
    isLoading: isInitialLoading,
  }
}

export default GalleryCrudData
