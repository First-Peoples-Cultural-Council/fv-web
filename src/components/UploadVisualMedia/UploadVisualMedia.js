import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Dashboard } from '@uppy/react'

// FPCC
import useCreateUppy from 'common/dataHooks/useCreateUppy'
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import { TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'

// Uppy
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'

function UploadVisualMedia({
  site,
  type,
  maxFiles,
  extensionList,
  setSelectedMedia,
}) {
  const friendlyDocType = getFriendlyDocType({ type, plural: true })

  const [uppy] = useState(
    useCreateUppy(
      site,
      maxFiles,
      extensionList,
      friendlyDocType,
      setSelectedMedia,
    ),
  )

  useEffect(() => () => uppy.close({ reason: 'unmount' }), [uppy])

  const baseMetaFields = [
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
  ]

  const imageMetaFields = [
    ...baseMetaFields,
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
  ]

  return (
    <div id="UploadVisualMedia" className="h-3/4 mt-4">
      <Dashboard
        inline
        uppy={uppy}
        width="100%"
        height="400"
        doneButtonHandler={null}
        fileManagerSelectionType="files"
        showSelectedFiles
        plugins={['ImageEditor']}
        metaFields={type === TYPE_IMAGE ? imageMetaFields : baseMetaFields}
      />
    </div>
  )
}

// PROPTYPES
const { array, func, number, oneOf, object } = PropTypes

UploadVisualMedia.propTypes = {
  site: object,
  type: oneOf([TYPE_IMAGE, TYPE_VIDEO]),
  extensionList: array,
  setSelectedMedia: func,
  maxFiles: number,
}

export default UploadVisualMedia
