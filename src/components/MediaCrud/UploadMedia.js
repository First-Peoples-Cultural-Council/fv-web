import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Uppy from '@uppy/core'
import { Dashboard, useUppy } from '@uppy/react'
import AwsS3 from '@uppy/aws-s3'
import ImageEditor from '@uppy/image-editor'

// FPCC
import api from 'services/api'
import { DOC_AUDIO } from 'common/constants/docTypes'
import UploadAudio from 'components/MediaCrud/UploadAudio'
import { getFileExtensions } from 'common/utils/stringHelpers'

// Uppy
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'

function UploadMedia({
  site,
  docType,
  extensionList,
  setSelectedMedia,
  maxFiles,
}) {
  if (docType === DOC_AUDIO) {
    return (
      <UploadAudio
        site={site}
        extensionList={extensionList}
        setSelectedMedia={setSelectedMedia}
      />
    )
  }

  const uppy = useUppy(() => {
    const _uppy = new Uppy({
      id: 'mediaUpload',
      autoProceed: false,
      allowMultipleUploadBatches: true,
      restrictions: { maxNumberOfFiles: maxFiles },
      // eslint-disable-next-line no-unused-vars
      onBeforeFileAdded: (currentFile, _files) => {
        if (!extensionList.includes(getFileExtensions(currentFile.name))) {
          uppy.info(
            {
              message: `Unsupported file type. Please upload media with the extension ${extensionList.join(
                ', ',
              )}`,
              details:
                'File couldn’t be uploaded because it was of unsupported type.',
            },
            'error',
            5000,
          )
          return false
        }
        return true
      },
    })

    _uppy.use(ImageEditor, {
      id: 'ImageEditor',
      quality: 0.8,
      cropperOptions: {
        aspectRatio: 1,
        viewMode: 1,
        background: false,
        autoCropArea: 1,
        responsive: true,
        croppedCanvasOptions: {},
      },
      actions: {
        revert: true,
        rotate: true,
        granularRotate: true,
        flip: true,
        zoomIn: true,
        zoomOut: true,
        cropSquare: true,
        cropWidescreen: true,
        cropWidescreenVertical: true,
      },
    })

    _uppy.use(AwsS3, {
      getUploadParameters(file) {
        return api.media.getS3Url({ quantity: 1 }).then((data) =>
          // Return an object in the correct shape.
          ({
            url: `${data?.urls?.[0]}`,
            method: 'PUT',
            fields: [],
            // Provide content type header required by S3
            headers: {
              'content-type': file.type,
            },
          }),
        )
      },
    })

    _uppy.on('upload-success', (file) =>
      api.media
        .markComplete({
          filename: file?.name,
          dialectId: site?.uid,
          url: file?.xhrUpload?.endpoint,
          title: file?.meta?.title,
          notes: file?.meta?.notes,
          acknowledgement: file?.meta?.acknowledgement,
        })
        .then((data) =>
          setSelectedMedia((oldArray) => [...oldArray, data?.documentId]),
        ),
    )

    return _uppy
  })

  useEffect(() => () => uppy.close({ reason: 'unmount' }), [uppy])

  return (
    <div id="UploadMedia" className="h-3/4 mt-4">
      <Dashboard
        inline
        uppy={uppy}
        width="100%"
        height="400"
        doneButtonHandler={null}
        fileManagerSelectionType="files"
        showSelectedFiles
        plugins={['ImageEditor']}
        metaFields={[
          { id: 'title', name: 'Title', placeholder: 'Title for the image.' },
          {
            id: 'acknowledgement',
            name: 'Acknowledgement',
            placeholder: 'Who created this media or where did you get it from?',
          },
          {
            id: 'notes',
            name: 'General notes',
            placeholder: 'Any other details regarding this media file.',
          },
        ]}
      />
    </div>
  )
}

// PROPTYPES
const { array, func, number, string, object } = PropTypes

UploadMedia.propTypes = {
  site: object,
  docType: string,
  extensionList: array,
  setSelectedMedia: func,
  maxFiles: number,
}

export default UploadMedia
