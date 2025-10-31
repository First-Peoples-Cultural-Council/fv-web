import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import MediaThumbnail from 'components/MediaThumbnail'
import { useModalWithFieldArray } from 'common/hooks/useModalController'
import AddVideoModal from 'components/AddVideoModal'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'
import ValidationError from 'components/Form/ValidationError'
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'

function VideoArrayField({
  label = '',
  nameId,
  helpText,
  control,
  maxItems,
  errors,
}) {
  const {
    fields,
    appendToFormAndClose,
    remove,
    modalOpen,
    openModal,
    closeModal,
  } = useModalWithFieldArray({ control, nameId })

  const {
    fields: videoLinksFields,
    append: appendVideoLinks,
    remove: removeVideoLinks,
  } = useFieldArray({
    control,
    name: 'relatedVideoLinks',
  })

  const totalNumberOfVideos =
    (fields?.length || 0) + (videoLinksFields?.length || 0)

  return (
    <Fragment key={`${nameId}_ArrayField`}>
      <FieldLabel nameId={nameId} text={label} />
      <div data-testid="VideoArrayField" className="space-y-2">
        {fields?.length > 0 && (
          <div>
            <p className="block text-sm font-small text-charcoal-900 italic">
              Uploaded Videos
            </p>
            <div>
              {fields?.map((video, index) => (
                <div
                  key={video?.key}
                  className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 pr-0 space-x-1 mr-2 mb-2"
                >
                  <MediaThumbnail.Video videoObject={video} />
                  <XButton onClickHandler={() => remove(index)} />
                </div>
              ))}
            </div>
          </div>
        )}
        {videoLinksFields?.length > 0 && (
          <div>
            <p className="block text-sm font-small text-charcoal-900 italic">
              Linked Videos
            </p>
            <div>
              {videoLinksFields?.map((mediaLink, index) => (
                <div
                  key={`${mediaLink?.text}`}
                  className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1 mr-2 mb-2"
                >
                  <MediaThumbnail.VideoLink link={mediaLink} />
                  <XButton onClickHandler={() => removeVideoLinks(index)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {totalNumberOfVideos >= maxItems ? (
          ''
        ) : (
          <div>
            <FieldButton label="Add video" onClickHandler={openModal} />
            <AddVideoModal.Container
              isDashboard
              formMedia={fields}
              updateFormMedia={appendToFormAndClose}
              relatedVideoLinks={videoLinksFields}
              appendVideoLinks={appendVideoLinks}
              modalOpen={modalOpen}
              closeModal={closeModal}
              maxItems={maxItems}
            />
          </div>
        )}
        <ValidationError errors={errors} nameId={nameId} />
      </div>
      <HelpText text={helpText} />
    </Fragment>
  )
}

// PROPTYPES
const { number, object, string } = PropTypes
VideoArrayField.propTypes = {
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
  errors: object,
}

export default VideoArrayField
