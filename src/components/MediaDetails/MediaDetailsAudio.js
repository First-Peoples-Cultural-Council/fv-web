import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

// FPCC
import { useUserStore } from 'context/UserContext'
import getIcon from 'common/utils/getIcon'
import AudioNative from 'components/AudioNative'
import { isDisplayablePropMedia } from 'common/utils/mediaHelpers'
import { atLeastEditor } from 'common/constants/roles'
import { isAtLeastRole } from 'common/utils/membershipHelpers'

function MediaDetailsAudio({ file }) {
  const { sitename } = useParams()
  const { user } = useUserStore()
  const isEditor = isAtLeastRole({ user, sitename, role: atLeastEditor })

  return (
    <div id="MediaDetailsAudio" className="mpb-16 space-y-6 sticky top-0">
      <div className="flex justify-center space-x-2">
        <a href={file?.downloadLink} className="flex-1 btn-outlined">
          {getIcon('Download', 'btn-icon')}
          <span>Download</span>
        </a>
        {isEditor && (
          <Link
            to={`/${sitename}/dashboard/edit/audio?id=${file?.id}`}
            data-testid="EntryDrawerEdit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-contained bg-secondary"
          >
            {getIcon('Pencil', 'btn-icon')}
            <span>Edit</span>
          </Link>
        )}
      </div>
      <div>
        <div className="block w-full rounded-lg overflow-hidden">
          <AudioNative styling="w-full" audioObject={file} />
        </div>
        <div className="mt-4 flex items-start">
          <div>
            <h2 className="text-lg font-medium text-fv-charcoal">
              <span className="sr-only">Details for </span>
              {file?.filename}
            </h2>
            <p className="text-sm font-medium text-fv-charcoal-light">
              {file?.title}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-fv-charcoal">Information</h3>
        <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
          {file?.id &&
            Object.keys(file).map((key) => {
              if (isDisplayablePropMedia(key, file[key])) {
                return (
                  <div
                    key={key}
                    className="py-3 flex justify-between text-sm font-medium"
                  >
                    <dt className="text-fv-charcoal-light capitalize">
                      {key === 'mimeType' ? 'File type' : key}
                    </dt>
                    <dd className="text-fv-charcoal max-w-1/2 truncate">
                      {file[key]}
                    </dd>
                  </div>
                )
              }
              return null
            })}
        </dl>
        {file?.speakers.length > 0 && (
          <dl className="mt-2 border-b border-gray-200 divide-y divide-gray-200">
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-fv-charcoal-light">Speakers</dt>
              <dd className="text-fv-charcoal">
                {file?.speakers?.map((speaker) => speaker?.name).join(', ')}
              </dd>
            </div>
          </dl>
        )}
      </div>
      <div>
        <h3 className="font-medium text-fv-charcoal">Description</h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-fv-charcoal-light italic">
            {file?.description}
          </p>
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes
MediaDetailsAudio.propTypes = {
  file: object,
}

export default MediaDetailsAudio
