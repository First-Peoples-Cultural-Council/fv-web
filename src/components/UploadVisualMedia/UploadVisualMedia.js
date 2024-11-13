import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Dashboard } from '@uppy/react'

// Uppy
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'

// FPCC
import useCreateUppy from 'common/dataHooks/useCreateUppy'
import { TYPE_IMAGE, TYPE_VIDEO } from 'common/constants'
import { useSiteStore } from 'context/SiteContext'

function UploadVisualMedia({ type, maxItems, setSelectedMedia }) {
  const { site } = useSiteStore()

  const [uppy] = useState(useCreateUppy(site, maxItems, setSelectedMedia, type))

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

  // NB Exercise caution if updating these fields. The label vs id and value can be confusing due to reverse framing of data in UI
  const imageMetaFields = [
    ...baseMetaFields,
    {
      id: 'excludeFromGames',
      name: 'Include in games?',
      render({ value, onChange, required, form }, h) {
        return h('input', {
          value,
          type: 'checkbox',
          required,
          form,
          onChange: (ev) => onChange(ev.target.checked ? 'false' : 'true'),
          defaultChecked: value !== 'true',
        })
      },
    },
    {
      id: 'excludeFromKids',
      name: 'Include on the Kids site?',
      render({ value, onChange, required, form }, h) {
        return h('input', {
          value,
          type: 'checkbox',
          required,
          form,
          onChange: (ev) => onChange(ev.target.checked ? 'false' : 'true'),
          defaultChecked: value !== 'true',
        })
      },
    },
  ]

  return (
    <div id="UploadVisualMedia" className="h-full p-4">
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
const { func, number, oneOf } = PropTypes

UploadVisualMedia.propTypes = {
  type: oneOf([TYPE_IMAGE, TYPE_VIDEO]),
  setSelectedMedia: func,
  maxItems: number,
}

export default UploadVisualMedia
