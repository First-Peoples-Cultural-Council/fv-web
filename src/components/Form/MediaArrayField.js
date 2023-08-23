import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import getIcon from 'common/utils/getIcon'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'
import MediaThumbnail from 'components/MediaThumbnail'
import useIdArrayField from 'common/hooks/useIdArrayField'
import { useModalSelector } from 'common/hooks/useModalController'
import Modal from 'components/Modal'
import MediaCrud from 'components/MediaCrud'

function MediaArrayField({ label, nameId, helpText, control, type, maxItems }) {
  const { value, addItems, removeItem } = useIdArrayField(nameId, control)
  const { modalOpen, openModal, closeModal, selectItem } = useModalSelector(
    addItems,
    removeItem,
  )
  return (
    <Fragment key={`${nameId}_ArrayField`}>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <div className="space-y-2 mt-2">
        <div id="MediaThumbnailGallery">
          {value?.length > 0 &&
            value?.map((docId) => (
              <div
                key={`${docId}`}
                className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1 mr-2 mb-2"
              >
                {type === AUDIO && <MediaThumbnail.Audio id={docId} />}
                {type === IMAGE && (
                  <MediaThumbnail.Image
                    id={docId}
                    imageStyles="object-cover pointer-events-none"
                  />
                )}
                {type === VIDEO && <MediaThumbnail.Video id={docId} />}
                <div className="has-tooltip">
                  <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary text-xs -mt-8">
                    Remove
                  </span>
                  <button
                    type="button"
                    aria-label="Remove"
                    className="-mr-1.5 border p-1 border-transparent inline-flex items-center rounded-lg text-sm font-bold text-fv-charcoal hover:bg-gray-300"
                    onClick={() => removeItem(docId)}
                  >
                    {getIcon('Close', 'fill-current h-5 w-5')}
                  </button>
                </div>
              </div>
            ))}
        </div>
        {value?.length >= maxItems ? (
          ''
        ) : (
          <div>
            <button
              type="button"
              onClick={openModal}
              className="bg-white border-2 border-primary text-primary hover:bg-gray-50 rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
            >
              {getIcon('Add', 'fill-current -ml-1 mr-2 h-5 w-5')}
              <span>{`Add ${getFriendlyDocType({ type })}`}</span>
            </button>
            <Modal.Presentation
              isOpen={modalOpen}
              closeHandler={closeModal}
              isDashboard
            >
              <div className="h-9/10-screen w-3/4-screen mx-auto rounded-lg overflow-hidden bg-gray-50">
                <div className="h-full p-4">
                  <MediaCrud.Container
                    savedMedia={value}
                    updateSavedMedia={selectItem}
                    docType={type}
                  />
                </div>
              </div>
            </Modal.Presentation>
          </div>
        )}
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
    </Fragment>
  )
}

// PROPTYPES
const { object, number, string } = PropTypes
MediaArrayField.propTypes = {
  helpText: string,
  label: string,
  type: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
}

MediaArrayField.defaultProps = {
  type: IMAGE,
  label: '',
  maxItems: 3,
}

export default MediaArrayField
