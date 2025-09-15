import { useState } from 'react'
import PropTypes from 'prop-types'
import Uppy from '@uppy/core'
import XHR from '@uppy/xhr-upload'
import ImageEditor from '@uppy/image-editor'

// Uppy
import '@uppy/core/css/style.min.css'
import '@uppy/dashboard/css/style.min.css'
import '@uppy/image-editor/css/style.min.css'

// FPCC
import GlobalConfiguration from 'src/GlobalConfiguration'
import { getAuthHeaderIfTokenExists } from 'common/utils/authHelpers'
import { getFileExtensions } from 'common/utils/stringHelpers'
import {
  getPathForMediaType,
  getSupportedExtensionsForMediaType,
} from 'common/utils/mediaHelpers'
import { useSiteStore } from 'context/SiteContext'
import { TYPE_DOCUMENT, TYPE_IMAGE, TYPE_VIDEO, SITES } from 'common/constants'

function useCreateUppy({ maxItems, setSelectedMedia, type }) {
  const { site } = useSiteStore()

  const extensionList = getSupportedExtensionsForMediaType(type)
  const mediaTypePath = getPathForMediaType(type)

  const uploadEndpoint = new URL(
    `${SITES}/${site?.sitename}/${mediaTypePath}`,
    GlobalConfiguration.API_URL,
  )

  // IMPORTANT: passing an initializer function to prevent Uppy from being reinstantiated on every render.
  const [uppy] = useState(() =>
    new Uppy({
      id: 'mediaUpload',
      autoProceed: false,
      allowMultipleUploadBatches: true,
      restrictions: {
        maxNumberOfFiles: maxItems,
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
      .use(ImageEditor, {
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
      .use(XHR, {
        endpoint: uploadEndpoint.href,
        fieldName: 'original',
        formData: true,
        headers: getAuthHeaderIfTokenExists(),
        async onAfterResponse(xhr) {
          if (xhr?.status === 201) {
            const parsedResponse = JSON.parse(xhr?.response)
            setSelectedMedia((oldArray) => [...oldArray, parsedResponse])
          }
        },
      })
      .on('file-added', (file) => {
        uppy.setFileMeta(file.id, {
          ...file.meta,
          title: file.name,
        })
      }),
  )

  return uppy
}

// PROPTYPES
const { func, number, oneOf } = PropTypes

useCreateUppy.propTypes = {
  type: oneOf([TYPE_DOCUMENT, TYPE_IMAGE, TYPE_VIDEO]),
  setSelectedMedia: func,
  maxItems: number,
}

export default useCreateUppy
