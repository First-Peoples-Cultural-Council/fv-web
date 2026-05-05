import { useNavigate, useParams, useSearchParams } from 'react-router'
import { useState } from 'react'
import Uppy from '@uppy/core'
import XHR from '@uppy/xhr-upload'

// Uppy
import '@uppy/core/css/style.min.css'
import '@uppy/dashboard/css/style.min.css'
import '@uppy/image-editor/css/style.min.css'

// FPCC
import GlobalConfiguration from 'src/GlobalConfiguration'
import { getAuthHeaderIfTokenExists } from 'common/utils/authHelpers'
import { useSiteStore } from 'context/SiteContext'
import {
  IMPORT_JOBS,
  SITES,
  SUPPORTED_IMPORT_MEDIA_EXTENSIONS,
} from 'common/constants'
import {
  useImportJob,
  useImportJobCreate,
} from 'common/dataHooks/useImportJobs'

function ImportCrudData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  const navigate = useNavigate()
  const backHandler = () => navigate(`/${sitename}/dashboard/imports`)

  const [searchParams] = useSearchParams()
  const importJobId = searchParams.get('id') || null

  const queryResponse = useImportJob({ id: importJobId })
  const { mutate: create } = useImportJobCreate()

  const submitHandler = (formData) => create(formData)

  const uploadEndpoint = new URL(
    `${SITES}/${sitename}/${IMPORT_JOBS}/${importJobId}/media/`,
    GlobalConfiguration.API_URL,
  )

  const allowedFileTypes = SUPPORTED_IMPORT_MEDIA_EXTENSIONS.map(
    (extension) => `.${extension}`,
  )

  // IMPORTANT: passing an initializer function to prevent Uppy from being reinstantiated on every render.
  const [uppy] = useState(() =>
    new Uppy({
      id: 'mediaUpload',
      autoProceed: false,
      allowMultipleUploadBatches: true,
      restrictions: {
        allowedFileTypes: allowedFileTypes,
      },
    })
      .on('upload-error', (file, error, xhr) => {
        if (xhr) {
          const parsedResponse = JSON.parse(xhr?.response)
          const serverMessage = parsedResponse?.[0]
            ? parsedResponse?.[0]
            : `Server-side validation failed: ${xhr?.responseText}`

          // Display the message in the Uppy UI
          uppy.info(serverMessage, 'error', 6000)
        }
      })
      .use(XHR, {
        endpoint: uploadEndpoint.href,
        fieldName: 'file',
        formData: true,
        headers: getAuthHeaderIfTokenExists(),
        async getResponseData(xhr) {
          if (xhr.status >= 200 && xhr.status < 300) {
            return { ok: true, status: xhr.status }
          }
          return { ok: false, status: xhr.status }
        },
      }),
  )

  return {
    submitHandler,
    backHandler,
    site,
    queryResponse,
    importJobId,
    uppy,
  }
}

export default ImportCrudData
