import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaUrl } from 'common/utils/urlHelpers'
import AudioNative from 'components/AudioNative'
import {
  DOC_BOOK,
  DOC_CATEGORY,
  DOC_PHRASE,
  DOC_WORD,
  DOC_AUDIO,
  DOC_IMAGE,
  DOC_SPEAKER,
  DOC_VIDEO,
} from 'common/constants'

function DocumentThumbnailPresentation({ document }) {
  const labelClass =
    'mt-1 ml-1 block text-xs font-medium truncate pointer-events-none'
  const getContents = (type) => {
    switch (type) {
      case DOC_AUDIO:
        return (
          <div className="relative w-72">
            <div className="block w-full overflow-hidden">
              <AudioNative styling="w-full" audioId={document?.id} />
            </div>
            <p className={labelClass}>{document?.title}</p>
          </div>
        )
      case DOC_CATEGORY:
        return (
          <div className="p-1.5 inline-flex text-sm font-medium rounded-lg bg-tertiaryB text-white">
            {document?.title}
          </div>
        )
      case DOC_IMAGE:
        return (
          <div className="relative w-48">
            <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
              <img
                src={getMediaUrl({
                  type: 'gifOrImg',
                  id: document?.id,
                  viewName: 'Small',
                })}
                alt={`${document?.title}`}
                className="object-cover pointer-events-none"
              />
            </div>
            <p className={labelClass}>{document?.title}</p>
          </div>
        )
      case DOC_VIDEO:
        return (
          <div className="relative w-48">
            <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
              <video
                className="object-cover pointer-events-none"
                src={getMediaUrl({
                  type: 'video',
                  id: document?.id,
                  viewName: 'Small',
                })}
                disableRemotePlayback
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className={labelClass}>{document?.title}</p>
          </div>
        )
      case DOC_WORD:
      case DOC_PHRASE:
      case DOC_BOOK:
      case DOC_SPEAKER:
      default:
        return (
          <div className="inline-flex items-center">
            <div className="font-bold text-lg">{document?.title}</div>
          </div>
        )
    }
  }
  return (
    <div data-testid="DocumentThumbnailPresentation" className="mx-auto">
      {getContents(document?.type)}
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
DocumentThumbnailPresentation.propTypes = {
  document: object,
}

export default DocumentThumbnailPresentation
