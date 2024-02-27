import { useParams } from 'react-router-dom'

// FPCC
import { useGallery } from 'common/dataHooks/useGalleries'

function GalleryData({ id }) {
  const { id: paramsId, sitename } = useParams()
  const galleryId = id || paramsId
  const { data } = useGallery({ id: galleryId })

  return {
    data,
    sitename,
  }
}

export default GalleryData
