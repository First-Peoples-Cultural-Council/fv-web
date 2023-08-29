import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Uppy from '@uppy/core'
import { Dashboard, useUppy } from '@uppy/react'
import XHR from '@uppy/xhr-upload'
import ImageEditor from '@uppy/image-editor'

// FPCC
import { getAuthHeaderIfTokenExists } from 'common/utils/authHelpers'
import api from 'services/api'
import { AUDIO } from 'common/constants'
import UploadAudio from 'components/MediaCrud/UploadAudio'
import {
  getFileExtensions,
  getFriendlyDocType,
} from 'common/utils/stringHelpers'

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
  const friendlyDocType = getFriendlyDocType({ docType, plural: true })

  const uppy = useUppy(() => {
    const _uppy = new Uppy({
      id: 'mediaUpload',
      autoProceed: false,
      allowMultipleUploadBatches: true,
      restrictions: {
        maxNumberOfFiles: maxFiles,
        requiredMetaFields: ['title'],
      },
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

    _uppy.on('file-added', (file) => {
      uppy.setFileMeta(file.id, {
        ...file.meta,
        title: file.name,
      })
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

    _uppy.use(XHR, {
      endpoint: api.media.getUploadEndpoint(site?.sitename, friendlyDocType),
      fieldName: 'original',
      formData: true,
      headers: getAuthHeaderIfTokenExists(),
      getResponseData: (responseText) => {
        const _responseText = JSON.parse(responseText)
        setSelectedMedia((oldArray) => [...oldArray, _responseText?.id])
        return {
          url: _responseText?.url,
        }
      },
    })

    return _uppy
  })

  useEffect(() => () => uppy.close({ reason: 'unmount' }), [uppy])

  if (docType === AUDIO) {
    return (
      <UploadAudio
        site={site}
        extensionList={extensionList}
        setSelectedMedia={setSelectedMedia}
      />
    )
  }

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
          {
            id: 'title',
            name: 'Title',
            placeholder: 'Title for the media file.',
          },
          {
            id: 'description',
            name: 'General description',
            placeholder: 'Description of the media file to be uploaded.',
          },
          {
            id: 'acknowledgement',
            name: 'Acknowledgement',
            placeholder: 'Who created this media or where did you get it from?',
          },
          {
            id: 'excludeFromGames',
            name: 'Exclude from games',
            render({ value, onChange, required, form }, h) {
              return h('input', {
                type: 'checkbox',
                required,
                form,
                onChange: (ev) => onChange(ev.target.checked ? 'on' : ''),
                defaultChecked: value === 'on',
              })
            },
          },
          {
            id: 'excludeFromKids',
            name: 'Exclude from Kids',
            render({ value, onChange, required, form }, h) {
              return h('input', {
                type: 'checkbox',
                required,
                form,
                onChange: (ev) => onChange(ev.target.checked ? 'on' : ''),
                defaultChecked: value === 'on',
              })
            },
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
