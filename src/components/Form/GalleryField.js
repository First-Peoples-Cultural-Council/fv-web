import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import { isUUID } from 'common/utils/stringHelpers'
import ValidationError from 'components/Form/ValidationError'
import Gallery from 'components/Gallery'
import { useGalleries } from 'common/dataHooks/useGalleries'

function GalleryField({ label, nameId, helpText, control, errors }) {
  return (
    <Fragment key={`${nameId}_GalleryField`}>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <Controller
        id={nameId}
        name={nameId}
        defaultValue=""
        control={control}
        render={({ field: { value, onChange } }) => (
          <AddGalleryButton value={value} onChange={onChange} />
        )}
      />
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}

function AddGalleryButton({ value, onChange }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { data } = useGalleries()

  const chooseGalleryHandler = (id) => {
    if (isUUID(id)) {
      onChange(id)
    }
    setModalOpen(false)
  }

  return value ? (
    <div className="mt-1 inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1">
      <Gallery.Container view="thumbnail" id={value} />
      <div className="has-tooltip">
        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary -mt-8">
          Remove
        </span>
        <button
          type="button"
          data-testid="GalleryField-btn-remove"
          aria-label="Remove"
          className="border p-1 border-transparent inline-flex items-center rounded-lg text-sm font-bold text-fv-charcoal hover:bg-gray-300"
          onClick={() => onChange('')}
        >
          {getIcon('Close', 'fill-current h-5 w-5')}
        </button>
      </div>
    </div>
  ) : (
    <Fragment key="AddGalleryButton">
      <button
        type="button"
        data-testid="GalleryField-btn-add"
        onClick={() => setModalOpen(true)}
        className="mt-1 btn-outlined"
      >
        {getIcon('Add', 'btn-icon')}
        <span>Add Gallery</span>
      </button>
      {/* Add Modal */}
      <Modal.Presentation
        isOpen={modalOpen}
        closeHandler={() => setModalOpen(false)}
        isDashboard
      >
        <div className="h-4/5-screen mx-auto rounded-lg bg-gray-50 p-6">
          <h2 className="text-2xl leading-6 font-bold text-center text-primary mb-6">
            Choose a gallery
          </h2>
          {data?.results?.length > 0 ? (
            <div className="mx-auto space-x-4 space-y-4">
              {data?.results?.map((gallery) => (
                <button
                  key={gallery?.id}
                  data-testid={`${gallery?.id}-choose`}
                  type="button"
                  onClick={() => chooseGalleryHandler(gallery?.id)}
                >
                  <span className="sr-only">{gallery?.titleTranslation}</span>
                  <Gallery.PresentationThumbnail data={gallery} />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-xl text-center text-fv-charcoal mb-6">
              There are currently no galleries on your site. You can create a
              gallery{' '}
              <Link to="../gallery" className="inline-url">
                here
              </Link>
              .
            </div>
          )}
        </div>
      </Modal.Presentation>
    </Fragment>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
GalleryField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  errors: object,
}

AddGalleryButton.propTypes = {
  value: string,
  onChange: func,
}

export default GalleryField
