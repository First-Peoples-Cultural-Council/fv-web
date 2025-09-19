import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { Link, useParams } from 'react-router'

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
  const { sitename } = useParams()
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
        label="Add gallery"
        onClickHandler={() => setModalOpen(true)}
      />
      {/* Add Modal */}
      <Modal.Presentation
        isOpen={modalOpen}
        closeHandler={() => setModalOpen(false)}
        isDashboard
      >
        <div
          id="AddGalleryModalWrapper"
          className="mx-auto rounded-lg bg-charcoal-50 py-6 mb-20"
        >
          <h2 className="text-2xl leading-6 font-bold text-center text-blumine-800 pb-6">
            Choose a gallery
          </h2>
          {data?.results?.length > 0 ? (
            <div className="h-[80vh] mx-auto space-x-4 space-y-4 overflow-y-scroll size-full">
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
              <Link
                to={`/${sitename}/dashboard/create/gallery`}
                className="inline-url"
              >
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
