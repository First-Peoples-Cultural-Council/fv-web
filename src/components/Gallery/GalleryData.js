import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

// FPCC
import api from 'services/api'

function GalleryData({ widgetData }) {
  const { id, sitename } = useParams()
  const galleryId = widgetData?.settings?.galleryId || id
  const { data } = useQuery(['gallery', galleryId], () => api.gallery.get(galleryId), {
    // The query will not execute until the galleryId exists
    enabled: !!galleryId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const galleryDataAdaptor = (rawData) => {
    const properties = rawData?.properties
    return {
      id: galleryId,
      title: properties?.['dc:title'],
      description: properties?.['dc:description'],
      images: rawData?.contextParameters?.gallery?.related_pictures,
    }
  }

  return {
    data: galleryDataAdaptor(data),
    sitename,
    widgetView: widgetData?.settings?.galleryId ? true : false,
  }
}

export default GalleryData
