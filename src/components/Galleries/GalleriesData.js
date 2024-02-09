import { useParams } from 'react-router-dom'

// FPCC
import { useGalleries } from 'common/dataHooks/useGalleries'

function GalleriesData() {
  const { sitename } = useParams()
  const { data, isInitialLoading } = useGalleries()

  return {
    galleries: data?.results || [],
    isLoading: isInitialLoading,
    sitename,
  }
}

export default GalleriesData
