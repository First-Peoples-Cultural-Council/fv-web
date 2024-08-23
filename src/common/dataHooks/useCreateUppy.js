import PropTypes from 'prop-types'
import Uppy from '@uppy/core'
import XHR from '@uppy/xhr-upload'
import ImageEditor from '@uppy/image-editor'

// FPCC
import { getAuthHeaderIfTokenExists } from 'common/utils/authHelpers'
import api from 'services/api'
import { getFileExtensions } from 'common/utils/stringHelpers'

// Uppy
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'

function useCreateUppy(
  site,
  maxFiles,
  extensionList,
  friendlyDocType,
  setSelectedMedia,
) {
  const uppy = new Uppy({
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

  uppy.on('file-added', (file) => {
    uppy.setFileMeta(file.id, {
      ...file.meta,
      title: file.name,
    })
  })

  uppy.use(ImageEditor, {
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

  uppy.use(XHR, {
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

  return uppy
}

// PROPTYPES
const { array, func, number, string, object } = PropTypes

useCreateUppy.propTypes = {
  site: object,
  docType: string,
  extensionList: array,
  setSelectedMedia: func,
  maxFiles: number,
}

export default useCreateUppy
