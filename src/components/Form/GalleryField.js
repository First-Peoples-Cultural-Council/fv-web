import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'

// FPCC
import Modal from 'components/Modal'
import { isUUID } from 'common/utils/stringHelpers'
import ValidationError from 'components/Form/ValidationError'
import Gallery from 'components/Gallery'
import { useGalleries } from 'common/dataHooks/useGalleries'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function GalleryField({ label, nameId, helpText, control, errors }) {
  return (
    <Fragment key={`${nameId}_GalleryField`}>
      <FieldLabel nameId={nameId} text={label} />
      <Controller
        id={nameId}
        name={nameId}
        defaultValue=""
        control={control}
        render={({ field: { value, onChange } }) => (
          <AddGalleryButton value={value} onChange={onChange} />
        )}
      />
      <HelpText text={helpText} />
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
    <div className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1">
      <Gallery.Container view="thumbnail" id={value} />
      <XButton onClickHandler={() => onChange('')} />
    </div>
  ) : (
    <Fragment key="AddGalleryButton">
      <FieldButton
        label="Add Gallery"
        onClickHandler={() => setModalOpen(true)}
      />
      {/* Add Modal */}
      <Modal.Presentation
        isOpen={modalOpen}
        closeHandler={() => setModalOpen(false)}
        isDashboard
      >
        <div className="h-4/5-screen mx-auto rounded-lg bg-charcoal-50 p-6">
          <h2 className="text-2xl leading-6 font-bold text-center text-blumine-800 mb-6">
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
            <div className="text-xl text-center text-charcoal-900 mb-6">
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
