import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'
import MediaCrud from 'components/MediaCrud'
import MediaThumbnail from 'components/MediaThumbnail'
import Modal from 'components/Modal'
import { getFriendlyDocType, isUUID } from 'common/utils/stringHelpers'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'

function AddMedia({ label, nameId, helpText, control, docType }) {
  return (
    <Fragment key={`${nameId}_AddMedia`}>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <Controller
        id={nameId}
        name={nameId}
        defaultValue=""
        control={control}
        render={({ field: { value, onChange } }) => (
          <AddMediaButton value={value} onChange={onChange} docType={docType} />
        )}
      />
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
    </Fragment>
  )
}

function AddMediaButton({ value, onChange, docType }) {
  const [modalOpen, setModalOpen] = useState(false)

  const chooseMediaHandler = (id) => {
    if (isUUID(id[0])) {
      onChange(id[0])
    }
    setModalOpen(false)
  }

  const onAddMediaClick = (event) => {
    event.preventDefault()
    if (value) {
      onChange('')
    } else {
      setModalOpen(true)
    }
  }
  return value ? (
    <div className="mt-1 inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1">
      {docType === AUDIO && <MediaThumbnail.Audio id={value} />}
      {docType === IMAGE && (
        <MediaThumbnail.Image
          id={value}
          imageStyles="object-cover pointer-events-none"
        />
      )}
      {docType === VIDEO && <MediaThumbnail.Video id={value} />}
      <div className="has-tooltip">
        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary -mt-8">
          Remove
        </span>
        <button
          type="button"
          aria-label="Remove"
          // eslint-disable-next-line react/no-unknown-property
          tooltip="Remove"
          className="border p-1 border-transparent inline-flex items-center rounded-lg text-sm font-bold text-fv-charcoal hover:bg-gray-300"
          onClick={(event) => onAddMediaClick(event)}
        >
          {getIcon('Close', 'fill-current h-5 w-5')}
        </button>
      </div>
    </div>
  ) : (
    <Fragment key="AddMediaButton">
      <button
        type="button"
        onClick={(event) => onAddMediaClick(event)}
        className="mt-1 bg-white border-2 border-primary text-primary hover:bg-gray-50 rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
      >
        {getIcon('Add', 'fill-current -ml-1 mr-2 h-5 w-5')}
        <span>{`Add ${getFriendlyDocType({ docType })}`}</span>
      </button>
      {/* Add Modal */}
      <Modal.Presentation
        isOpen={modalOpen}
        closeHandler={() => setModalOpen(false)}
        isDashboard
      >
        <div className="h-4/5-screen w-3/4-screen mx-auto rounded-lg overflow-hidden bg-gray-50 p-4">
          <MediaCrud.Container
            savedMedia={[value]}
            updateSavedMedia={chooseMediaHandler}
            docType={docType}
            maxFiles={1}
          />
        </div>
      </Modal.Presentation>
    </Fragment>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
AddMedia.propTypes = {
  helpText: string,
  label: string,
  docType: string,
  nameId: string.isRequired,
  control: object,
}

AddMedia.defaultProps = {
  docType: IMAGE,
  label: '',
}

AddMediaButton.propTypes = {
  value: string,
  onChange: func,
  docType: string,
}

export default AddMedia
