import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'

// FPCC
import { getMediaUrl } from 'common/urlHelpers'
import getIcon from 'common/getIcon'
import { makePlural } from 'common/urlHelpers'
import AudioMinimal from 'components/AudioMinimal'
import ActionsMenu from 'components/ActionsMenu'
import ImageWithLightbox from 'components/ImageWithLightbox'

function DictionaryDetailPresentation({ actions, moreActions, entry, sitename }) {
  const lableStyling = 'text-left font-medium text-lg uppercase text-fv-charcoal'
  const contentStyling = 'text-fv-charcoal sm:mt-0 sm:ml-6 sm:col-span-2'
  const noMedia = entry?.images?.length > 0 || entry?.videos?.length > 0 ? false : true
  const shortTitle = entry?.title.length < 20

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-10 bg-white"
      data-testid="DictionaryDetailPresentation"
    >
      <div className="grid grid-cols-8 gap-4">
        <div id="WordDetails" className={`col-span-8 md:col-span-5 ${noMedia ? 'md:col-start-3' : ''}`}>
          <section className="lg:mb-3">
            <div className="py-2 md:p-3 md:flex items-top">
              <span className={`font-bold ${shortTitle ? 'text-2xl md:text-5xl' : 'text-xl md:text-2xl'}`}>
                {entry.title}
              </span>

              <div className="mt-4 md:mt-1 md:ml-4">
                <ActionsMenu.Presentation
                  docId={entry.id}
                  docTitle={entry.title}
                  docType={entry.type}
                  docVisibility={entry?.visibility}
                  actions={actions}
                  moreActions={moreActions}
                  iconStyling={'w-6 h-6'}
                  withLabels
                  withConfirmation
                />
              </div>
              {entry?.visibility === 'public' || !entry?.visibility ? (
                ''
              ) : (
                <div className="mt-4 md:mt-1 md:ml-4 flex items-top text-secondary-dark">
                  {getIcon(entry?.visibility, 'fill-current inline-flex h-6 w-6 mr-2')}
                </div>
              )}
            </div>
            {/* Translations/Definitions */}
            {entry?.translations?.length > 0 && (
              <div className="py-2 md:p-3">
                <ol
                  className={`${entry?.translations?.length === 1 ? 'list-none' : 'list-decimal'} list-inside text-lg ${
                    shortTitle ? 'md:text-2xl' : 'md:text-xl'
                  }`}
                >
                  {entry?.translations?.map((translation, index) => (
                    <li key={index} className="p-0.5">
                      {translation?.translation}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {/* Audio */}
            {entry?.audio?.length > 0 && (
              <div className="py-2 md:p-3">
                {entry?.audio?.map((audioFile, index) => (
                  <AudioMinimal.Container
                    key={`${audioFile.uid}_${index}`}
                    icons={{
                      Play: getIcon('Audio', `fill-current h-6 w-6 ${audioFile?.speaker?.length > 0 ? 'mr-2' : ''}`),
                      Stop: getIcon('Stop', `fill-current h-6 w-6 ${audioFile?.speaker?.length > 0 ? 'mr-2' : ''}`),
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
              <div className="py-2 md:p-4">
                <h4 className={lableStyling}>Categories</h4>
                {entry?.categories?.map((category) => (
                  <Link
                    key={category.uid}
                    to={`/${sitename}/categories/${category.uid}`}
                    className="p-1.5 inline-flex text-sm font-medium rounded-lg bg-tertiaryB hover:bg-tertiaryB-dark text-white mr-1 mb-1"
                  >
                    {category['dc:title']}
                    <span className="sr-only">,&nbsp;</span>
                  </Link>
                ))}
              </div>
            )}
            {/* Related Content */}
            {entry?.relatedAssets?.length > 0 && (
              <div className="py-2 md:p-4">
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
                      const zebraStripe = index % 2 === 1 ? '' : 'bg-gray-100'
                      return (
                        <tr key={index} className={zebraStripe}>
                          <td className="p-2 flex items-center">
                            <Link to={`/${sitename}/${makePlural(asset?.type)}/${asset.uid}`}>{asset['dc:title']}</Link>
                            {asset?.related_audio?.map((audioId, i) => (
                              <AudioMinimal.Container
                                key={`${audioId}_${i}`}
                                icons={{
                                  Play: getIcon('Audio', 'fill-current h-8 w-8 ml-2'),
                                  Stop: getIcon('StopCircle', 'fill-current h-8 w-8 ml-2'),
                                }}
                                src={getMediaUrl({ type: 'audio', id: audioId })}
                              />
                            ))}
                          </td>
                          <td className="p-2">
                            <span>{asset?.['fv:definitions']?.[0]?.translation}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          {/* Other Information */}
          <section>
            {/* Acknowledgements*/}
            {entry?.acknowledgements?.length > 0 && (
              <div className="py-2 md:p-4">
                <h4 className={lableStyling}>Acknowledgement</h4>
                <ul className="list-none md:list-disc space-y-1">
                  {entry?.acknowledgements?.length > 0 &&
                    entry?.acknowledgements?.map((acknowledgement, index) => (
                      <li key={index} className={contentStyling}>
                        {acknowledgement}
                      </li>
                    ))}
                </ul>
              </div>
            )}
            {/* Notes */}
            {entry?.notes?.length > 0 ? (
              <div className="py-2 md:p-4">
                <h4 className={lableStyling}>Notes</h4>
                <ul className="list-none md:list-disc space-y-1">
                  {entry?.notes?.map((note, index) => (
                    <li key={index} className={contentStyling}>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {entry?.partOfSpeech && (
              <div className="py-2 md:p-4">
                <h4 className={lableStyling}>Part of Speech</h4>
                <div className={contentStyling}>{entry?.partOfSpeech}</div>
              </div>
            )}
            {entry?.pronunciation && (
              <div className="py-2 md:p-4">
                <h4 className={lableStyling}>Pronunciation</h4>
                <div className={contentStyling}>{entry?.pronunciation}</div>
              </div>
            )}
          </section>
        </div>
        {/* Pictures and Video */}
        {noMedia ? null : (
          <div id="WordMedia" className="col-span-8 md:col-span-3 py-2 md:p-5 md:mt-5">
            <ul>
              {entry?.images
                ? entry?.images?.map((image, index) => (
                    <li key={`${image.uid}_${index}`} className="my-2">
                      <div className="inline-flex rounded-lg overflow-hidden relative ">
                        <div className="relative">
                          <div className="inline-flex rounded-lg overflow-hidden">
                            <ImageWithLightbox.Presentation maxWidth={1000} image={image} />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                : null}
              {entry?.videos
                ? entry?.videos?.map((video, index) => (
                    <li key={`${video.uid}_${index}`} className="my-2">
                      <Disclosure>
                        <Disclosure.Button>
                          <div className="inline-flex rounded-lg overflow-hidden">
                            <video
                              className="shrink-0 w-full h-auto"
                              src={getMediaUrl({ type: 'video', id: video.uid, viewName: 'Small' })}
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
                                <span className="font-medium"> - {video?.['dc:description']}</span>
                              )}
                            </div>
                          )}
                          {video?.['fvm:acknowledgement'] && (
                            <div className="text-fv-charcoal">
                              <span className="font-medium">Acknowledgement: {video?.['fvm:acknowledgement']}</span>
                            </div>
                          )}
                        </Disclosure.Panel>
                      </Disclosure>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
// PROPTYPES
const { array, object, string } = PropTypes
DictionaryDetailPresentation.propTypes = {
  actions: array,
  entry: object,
  moreActions: array,
  sitename: string,
}

export default DictionaryDetailPresentation
