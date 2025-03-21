import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioNative from 'components/AudioNative'
import MediaDetails from 'components/MediaDetails'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'

function DashboardMediaAudioPresentation({ infiniteQueryResponse }) {
  const headerClass =
    'px-6 py-3 text-center text-xs font-medium text-charcoal-900 uppercase tracking-wider'

  return (
    <div
      id="DashboardMediaAudioPresentation"
      className="grid grid-cols-3 w-full"
    >
      <main className="col-span-2 pt-4 mx-2">
        <section className="p-2 h-full" aria-labelledby="results-header">
          <h1
            id="results-header"
            className="capitalize flex text-2xl font-bold text-charcoal-900 mb-4"
          >
            Audio
          </h1>
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-charcoal-100">
                  {infiniteQueryResponse?.data?.pages?.[0]?.results?.length &&
                    infiniteQueryResponse?.data?.pages?.map((page) => (
                      <React.Fragment key={page?.pageNumber}>
                        {page.results.map((audioFile) => (
                          <tr
                            key={audioFile?.id}
                            className={`${
                              audioFile?.id ===
                              infiniteQueryResponse?.currentFile?.id
                                ? 'ring-2 ring-offset-2 ring-blumine-800'
                                : ''
                            } rounded-lg relative`}
                            onClick={() =>
                              infiniteQueryResponse?.setCurrentFile(audioFile)
                            }
                          >
                            <td
                              className="px-2 py-2 overflow-visible w-80 text-sm text-charcoal-900"
                              aria-label="list"
                            >
                              <AudioNative
                                styling="w-full "
                                audioObject={audioFile}
                              />
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-charcoal-900 truncate">
                              {audioFile.title}
                            </td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-charcoal-900 text-left truncate">
                              {audioFile?.description}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
              <InfiniteLoadBtn infiniteQueryResponse={infiniteQueryResponse} />
            </div>
          </div>
        </section>
      </main>
      <aside className="col-span-1 bg-white p-8 border-1 border-charcoal-100">
        <MediaDetails.Audio file={infiniteQueryResponse?.currentFile} />
      </aside>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes
DashboardMediaAudioPresentation.propTypes = {
  infiniteQueryResponse: object,
}

export default DashboardMediaAudioPresentation
