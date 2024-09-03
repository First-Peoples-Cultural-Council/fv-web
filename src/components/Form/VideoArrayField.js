import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'

// FPCC
import MediaThumbnail from 'components/MediaThumbnail'
import useIdArrayField from 'common/hooks/useIdArrayField'
import { useModalSelector } from 'common/hooks/useModalController'
import AddVideoModal from 'components/AddVideoModal'
import api from 'services/api'
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

  const totalNumberOfVideos =
    (value?.length || 0) + (relatedVideoLinks?.length || 0)

  return (
    <Fragment key={`${nameId}_ArrayField`}>
      <FieldLabel nameId={nameId} text={label} />
      <div data-testid="VideoArrayField" className="space-y-2">
        {value?.length > 0 && (
          <div>
            <p className="block text-sm font-small text-fv-charcoal italic">
              Uploaded Videos
            </p>
            <div>
              {value?.map((docId) => (
                <div
                  key={`${docId}`}
                  className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1 mr-2 mb-2"
                >
                  <MediaThumbnail.Video id={docId} />
                  <XButton onClickHandler={() => removeItem(docId)} />
                </div>
              ))}
            </div>
          </div>
        )}
        {relatedVideoLinks?.length > 0 && (
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

        {totalNumberOfVideos >= maxItems ? (
          ''
        ) : (
          <div>
            <FieldButton label="Add Video" onClickHandler={openModal} />
            <AddVideoModal.Container
              isDashboard
              savedMedia={value}
              updateSavedMedia={selectItem}
              relatedVideoLinks={relatedVideoLinks}
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
