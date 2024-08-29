import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'
import MediaThumbnail from 'components/MediaThumbnail'
import useIdArrayField from 'common/hooks/useIdArrayField'
import { useModalSelector } from 'common/hooks/useModalController'
import AddMediaModal from 'components/AddMediaModal'
import api from 'services/api'
import XButton from 'components/Form/XButton'
import FieldButton from 'components/Form/FieldButton'
import ValidationError from 'components/Form/ValidationError'

function MediaArrayField({
  label = '',
  nameId,
  helpText,
  control,
  type = IMAGE,
  maxItems = 3,
  errors,
}) {
  const { value, addItems, removeItem } = useIdArrayField(nameId, control)
  const { modalOpen, openModal, closeModal, selectItem } = useModalSelector(
    addItems,
    removeItem,
  )

  const {
    fields,
    append: appendVideoLinks,
    remove: removeVideoLinks,
  } = useFieldArray({
    control,
    name: 'relatedVideoLinks',
  })

  const [relatedVideoLinks, setRelatedVideoLinks] = useState(fields)

  useEffect(() => {
    setRelatedVideoLinks(fields)

    const getThumbnailFromLink = ({ link, index }) => {
      if (link.toLowerCase().includes('youtu')) {
        const updatedRelatedVideoLinks = [...relatedVideoLinks]
        const id = link.match(
          /(?:^(?:https?:\/\/)?|^)(?:www.)?(?:(?:(?:(?:youtube\.com\/watch\?v=)|(?:youtu\.be\/))(.{11}?)))/,
        )[1]
        updatedRelatedVideoLinks[
          index
        ].thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
        setRelatedVideoLinks(updatedRelatedVideoLinks)
      }
      if (link.toLowerCase().includes('vimeo')) {
        const response = api.vimeoThumbnail.get(link)
        response.then((data) => {
          const updatedRelatedVideoLinks = [...relatedVideoLinks]
          updatedRelatedVideoLinks[index].thumbnail = data?.thumbnail_url
          setRelatedVideoLinks(updatedRelatedVideoLinks)
        })
      }
    }

    const updatedRelatedVideoLinks = [...relatedVideoLinks]
    updatedRelatedVideoLinks.forEach((item, index) => {
      if (!item.thumbnail) {
        getThumbnailFromLink({ link: item.text, index })
      }
    })
  }, [control, fields, relatedVideoLinks])

  return (
    <Fragment key={`${nameId}_ArrayField`}>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <div data-testid="MediaArrayField" className="space-y-2 mt-2">
        {type === VIDEO && value?.length > 0 && (
          <p className="block text-sm font-small text-fv-charcoal italic">
            Uploaded Videos
          </p>
        )}
        <div>
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
                <XButton onClickHandler={() => removeItem(docId)} />
              </div>
            ))}
        </div>
        {type === VIDEO && relatedVideoLinks?.length > 0 && (
          <div>
            <p className="block text-sm font-small text-fv-charcoal italic">
              Linked Videos
            </p>
            <div>
              {relatedVideoLinks?.map((mediaLink, index) => (
                <div
                  key={`${mediaLink?.text}`}
                  className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1 mr-2 mb-2"
                >
                  <MediaThumbnail.VideoLink link={mediaLink?.thumbnail} />
                  <XButton onClickHandler={() => removeVideoLinks(index)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {value?.length >= maxItems ||
        (type === VIDEO &&
          (value?.length || 0) + (relatedVideoLinks?.length || 0) >=
            maxItems) ? (
          ''
        ) : (
          <div>
            <FieldButton
              label={`Add ${getFriendlyDocType({ docType: type })}`}
              onClickHandler={openModal}
            />
            <AddMediaModal.Container
              isDashboard
              savedMedia={value}
              updateSavedMedia={selectItem}
              type={type}
              relatedVideoLinks={relatedVideoLinks}
              appendVideoLinks={appendVideoLinks}
              modalOpen={modalOpen}
              closeModal={closeModal}
              maxFiles={maxItems}
            />
          </div>
        )}
        <ValidationError errors={errors} nameId={nameId} />
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
    </Fragment>
  )
}

// PROPTYPES
const { number, object, string } = PropTypes
MediaArrayField.propTypes = {
  helpText: string,
  label: string,
  type: string,
  nameId: string.isRequired,
  control: object,
  maxItems: number,
  errors: object,
}

export default MediaArrayField
