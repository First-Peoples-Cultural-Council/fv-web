import { useQuery } from '@tanstack/react-query'

// FPCC
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import api from 'services/api'

function DocumentThumbnailData({ docId }) {
  // Data fetch
  const response = useQuery(
    ['document', docId],
    () => api.document.get({ id: docId }),
    {
      enabled: !!docId,
    },
  )
  const { data, isError, isInitialLoading } = response
  const documentDataAdaptor = (dataObject) => {
    const properties = dataObject?.properties ? dataObject.properties : {}
    const doc = {
      id: dataObject?.uid || '',
      type: dataObject?.type || '',
      friendlyType: getFriendlyDocType({ docType: dataObject?.type }) || '',
      title: properties['dc:title'] || '',
    }

    return doc
  }

  return {
    isLoading: isInitialLoading || isError,
    document: data?.title ? documentDataAdaptor(data) : {},
  }
}

export default DocumentThumbnailData
