import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'

// FPCC
import { getMediaUrl, makePlural } from 'common/utils/urlHelpers'
import getIcon from 'common/utils/getIcon'
import AudioMinimal from 'components/AudioMinimal'
import ActionsMenu from 'components/ActionsMenu'
import ImageWithLightbox from 'components/ImageWithLightbox'

function DictionaryDetailPresentationDrawer({
  actions,
  moreActions,
  entry,
  sitename,
}) {
  const lableStyling =
    'text-left font-medium text-lg uppercase text-fv-charcoal'
  const contentStyling = 'text-sm text-fv-charcoal sm:mt-0 sm:ml-6'
  const noMedia = !(entry?.images?.length > 0 || entry?.videos?.length > 0)
  const shortTitle = entry?.title.length < 16
  return (
    <div data-testid="DictionaryDetailPresentationDrawer">
      <div id="WordDetails" className="px-6">
        <section>
          <div className="py-3 flex items-center">
            <div
              className={`font-bold ${shortTitle ? 'text-4xl' : 'text-2xl'}`}
            >
              {entry?.title}
            </div>
            <div className="ml-5">
              <ActionsMenu.Presentation
                docId={entry?.id}
                docTitle={entry?.title}
                docType={entry?.type}
                docVisibility={entry?.visibility}
                actions={actions}
                moreActions={moreActions}
                withLabels
                withConfirmation
              />
            </div>
            {entry?.visibility === 'public' || !entry?.visibility
              ? ''
              : getIcon(
                  entry?.visibility,
                  'fill-current text-secondary-dark h-6 w-6 ml-3 mb-1',
                )}
          </div>

          {/* Translations/Definitions */}
          {entry?.translations?.length > 0 && (
            <div className="py-3">
              <ol
                className={`${
                  entry?.translations?.length === 1
                    ? 'list-none'
                    : 'list-decimal'
                } list-inside ${shortTitle ? 'text-xl ' : 'md:text-lg'}`}
              >
                {entry?.translations?.map((translation) => (
                  <li key={translation} className="p-0.5">
                    {translation?.translation}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {/* Audio */}
          {entry?.audio?.length > 0 && (
            <div className="py-3">
              {entry?.audio?.map((audioFile) => (
                <AudioMinimal.Container
                  key={audioFile.uid}
                  icons={{
                    Play: getIcon(
                      'Play',
                      `fill-current h-6 w-6 md:w-4 md:h-4 ${
                        audioFile?.speaker?.length > 0 ? 'mr-2' : ''
                      }`,
                    ),
                    Stop: getIcon(
                      'Stop',
                      `fill-current h-6 w-6 md:w-4 md:h-4 ${
                        audioFile?.speaker?.length > 0 ? 'mr-2' : ''
                      }`,
                    ),
                  }}
                  buttonStyling="bg-secondary hover:bg-secondary-dark text-white text-sm rounded-lg inline-flex items-center py-1.5 px-2 mr-2"
                  label={audioFile?.speaker}
                  src={getMediaUrl({ type: 'audio', id: audioFile.uid })}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          {/* Categories */}
          {entry?.categories?.length > 0 && (
            <div className="py-3">
              <h4 className={lableStyling}>Categories</h4>
              {entry?.categories?.map((category) => (
                <Link
                  key={category?.uid}
                  to={`/${sitename}/categories/${category?.uid}`}
                  className="p-1.5 inline-flex text-sm font-medium rounded-lg bg-tertiaryB hover:bg-tertiaryB-dark text-white mr-1"
                >
                  {category['dc:title']}
                  <span className="sr-only">,&nbsp;</span>
                </Link>
              ))}
            </div>
          )}
          {/* Related Content */}
          {entry?.relatedAssets?.length > 0 && (
            <div className="py-3">
              <table className="w-full">
                <thead>
                  <tr>
                    <th colSpan="2" className={`${lableStyling}pb-2`}>
                      Related Content
                    </th>
                  </tr>
                  <tr>
                    <th className="hidden">Title</th>
                    <th className="hidden">Definitions</th>
                  </tr>
                </thead>
                <tbody className="py-2 px-10">
                  {entry?.relatedAssets?.map((asset, index) => {
                    const zebraStripe = index % 2 === 0 ? 'bg-gray-100' : ''
                    return (
                      <tr key={asset?.uid} className={zebraStripe}>
                        <td className="py-2 pl-5 flex items-center">
                          <Link
                            to={`/${sitename}/${makePlural(asset?.type)}/${
                              asset?.uid
                            }`}
                          >
                            {asset ? asset['dc:title'] : null}
                          </Link>
                          {asset?.related_audio?.map((audioId) => (
                            <AudioMinimal.Container
                              key={audioId}
                              icons={{
                                Play: getIcon(
                                  'Audio',
                                  'fill-current h-8 w-8 ml-2',
                                ),
                                Stop: getIcon(
                                  'StopCircle',
                                  'fill-current h-8 w-8 ml-2',
                                ),
                              }}
                              src={getMediaUrl({ type: 'audio', id: audioId })}
                            />
                          ))}
                        </td>
                        <td className="py-2 pr-5">
                          <span>
                            {asset?.['fv:definitions']?.[0]?.translation}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
        {/* Images and Video */}
        {noMedia ? null : (
          <section id="WordMedia" className="py-3">
            <div className="grid grid-cols-2 gap-2">
              {entry?.images
                ? entry?.images?.map((image) => (
                    <div key={image?.uid}>
                      <div className="inline-flex rounded-lg overflow-hidden relative ">
                        <div className="relative">
                          <div className="inline-flex rounded-lg overflow-hidden cursor-pointer">
                            <ImageWithLightbox.Presentation
                              maxWidth={560}
                              image={image}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
              {entry?.videos
                ? entry?.videos?.map((video) => (
                    <div key={video?.uid}>
                      <Disclosure>
                        <Disclosure.Button>
                          <div className="inline-flex rounded-lg overflow-hidden">
                            <video
                              className="shrink-0 w-full h-auto"
                              src={getMediaUrl({
                                type: 'video',
                                id: video.uid,
                                viewName: 'Small',
                              })}
                              controls
                            >
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          {video?.['dc:title'] && (
                            <div className="text-fv-charcoal">
                              {video?.['dc:title']}
                              {video?.['dc:description'] && (
                                <span className="font-medium">
                                  {' '}
                                  - {video?.['dc:description']}
                                </span>
                              )}
                            </div>
                          )}
                          {video?.['fvm:acknowledgement'] && (
                            <div className="text-fv-charcoal">
                              <span className="font-medium">
                                Acknowledgement:{' '}
                                {video?.['fvm:acknowledgement']}
                              </span>
                            </div>
                          )}
                        </Disclosure.Panel>
                      </Disclosure>
                    </div>
                  ))
                : null}
            </div>
          </section>
        )}
        {/* Other Information */}
        <section>
          {/* Acknowledgements */}
          {entry?.acknowledgements.length > 0 && (
            <div className="py-3">
              <h4 className={lableStyling}>Acknowledgement</h4>
              <ul className="list-disc">
                {entry?.acknowledgements?.length > 0 &&
                  entry?.acknowledgements?.map((acknowledgement) => (
                    <li key={acknowledgement} className={contentStyling}>
                      {acknowledgement}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {/* Notes */}
          {entry?.notes?.length > 0 ? (
            <div className="py-3">
              <h4 className={lableStyling}>Notes</h4>
              <ul className="list-disc">
                {entry?.notes?.map((note) => (
                  <li key={note} className={contentStyling}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {entry?.partOfSpeech && (
            <div className="py-3">
              <h4 className={lableStyling}>Part of Speech</h4>
              <div className={contentStyling}>{entry?.partOfSpeech}</div>
            </div>
          )}
          {entry?.pronunciation && (
            <div className="py-3">
              <h4 className={lableStyling}>Pronunciation</h4>
              <div className={contentStyling}>{entry?.pronunciation}</div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
// PROPTYPES
const { array, object, string } = PropTypes
DictionaryDetailPresentationDrawer.propTypes = {
  actions: array,
  entry: object,
  moreActions: array,
  sitename: string,
}

export default DictionaryDetailPresentationDrawer
