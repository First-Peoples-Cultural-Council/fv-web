import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioNative from 'components/AudioNative'
import DashboardMediaDetails from 'components/DashboardMediaDetails'
import { AUDIO_PATH } from 'common/constants'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'

function DashboardMediaAudioPresentation({
  infiniteQueryResponse,
  currentFile,
  setCurrentFile,
}) {
  const headerClass =
    'px-6 py-3 text-center text-xs font-medium text-charcoal-900 uppercase tracking-wider'

  const file = {
    ...currentFile,
    speakers: currentFile?.speakers?.map((speaker) => speaker?.name).join(', '),
  }

  return (
    <div id="DashboardMediaAudioPresentation" className="px-3">
      <div className="grid grid-cols-3 w-full bg-white rounded-lg divide-x divide-charcoal-200">
        <main className="col-span-2">
          <section className="p-2 h-full">
            <div>
              <div>
                <table className="w-full table-fixed divide-y divide-charcoal-100">
                  <thead className="bg-charcoal-50">
                    <tr>
                      <th scope="col" className={headerClass}>
                        Audio
                      </th>
                      <th scope="col" className={headerClass}>
                        Title
                      </th>
                      <th scope="col" className={headerClass}>
                        Description
                      </th>
                      <th scope="col" className={headerClass}>
                        Date Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-100">
                    {infiniteQueryResponse?.data?.pages?.[0]?.results?.length &&
                      infiniteQueryResponse?.data?.pages?.map((page) => (
                        <React.Fragment key={page?.pageNumber}>
                          {page.results.map((audioFile) => (
                            <tr
                              key={audioFile?.id}
                              className={`${
                                audioFile?.id === currentFile?.id
                                  ? 'ring-2 ring-blumine-600'
                                  : ''
                              } m-2 rounded-lg relative`}
                              onClick={() => setCurrentFile(audioFile)}
                            >
                              <td
                                className="px-2 py-2 overflow-visible w-80 text-sm text-charcoal-900"
                                aria-label="list"
                              >
                                <AudioNative audioObject={audioFile} />
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-charcoal-900 truncate">
                                {audioFile.title}
                              </td>
                              <td className="px-6 py-4 whitespace-normal text-sm text-charcoal-900 text-left truncate">
                                {audioFile?.description}
                              </td>
                              <td className="px-6 py-4 whitespace-normal text-sm text-charcoal-900 text-left truncate">
                                {audioFile?.created}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
                <InfiniteLoadBtn
                  infiniteQueryResponse={infiniteQueryResponse}
                />
              </div>
            </div>
          </section>
        </main>
        <aside className="col-span-1">
          <DashboardMediaDetails
            mediaTypePath={AUDIO_PATH}
            file={file}
            thumbnail={<AudioNative audioObject={file} />}
          />
        </aside>
      </div>
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes
DashboardMediaAudioPresentation.propTypes = {
  infiniteQueryResponse: object,
  currentFile: object,
  setCurrentFile: func,
}

export default DashboardMediaAudioPresentation
