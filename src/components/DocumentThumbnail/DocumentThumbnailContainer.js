import React from 'react'
import PropTypes from 'prop-types'
import DocumentThumbnailData from 'components/DocumentThumbnail/DocumentThumbnailData'
import DocumentThumbnailPresentation from 'components/DocumentThumbnail/DocumentThumbnailPresentation'
import { isUUID } from 'common/stringHelpers'

function DocumentThumbnailContainer({ docId }) {
  const { document, isLoading } = DocumentThumbnailData({ docId })
  return isLoading || !isUUID(docId) ? (
    <div className="relative w-48 h-32 bg-white rounded-lg"></div>
  ) : (
    <DocumentThumbnailPresentation document={document} />
  )
}

// PROPTYPES
const { string } = PropTypes
DocumentThumbnailContainer.propTypes = {
  docId: string,
}

export default DocumentThumbnailContainer
