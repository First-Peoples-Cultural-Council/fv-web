import { useParams } from 'react-router-dom'

// FPCC
import { useGallery } from 'common/dataHooks/useGalleries'

function GalleryData({ widgetData }) {
  const { id, sitename } = useParams()
  const galleryId = widgetData?.settings?.galleryId || id
  const { data } = useGallery({ id: galleryId })

  return {
    data,
    sitename,
    widgetView: !!widgetData?.settings?.galleryId,
  }
}

export default GalleryData
