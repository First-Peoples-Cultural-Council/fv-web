import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'

// FPCC
import { ORIGINAL, VIDEO, PUBLIC } from 'common/constants'
import { makePlural } from 'common/utils/urlHelpers'
import { getMediaPath } from 'common/utils/mediaHelpers'
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
  const noMedia = !(
    entry?.relatedImages?.length > 0 || entry?.relatedVideos?.length > 0
  )
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
            {entry?.visibility === PUBLIC || !entry?.visibility
              ? ''
              : getIcon(
                  entry?.visibility,
                  'fill-current text-secondary-dark h-6 w-6 ml-3 mb-1',
                )}
          </div>

          {/* Translations/Definitions */}
          {entry?.translations?.length > 0 && (
            <div className="py-3">
              {/* Part of Speech */}
              {entry?.partOfSpeech?.title && (
                <div className="text-lg italic">
                  {entry?.partOfSpeech?.title?.toLowerCase()}
                </div>
              )}
              <ol
                className={`${
                  entry?.translations?.length === 1
                    ? 'list-none'
                    : 'list-decimal'
                } list-inside text-lg`}
              >
                {entry?.translations?.map((translation) => (
                  <li key={translation?.id} className="p-0.5">
                    <span className={contentStyling}>{translation?.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {/* Audio */}
          {entry?.relatedAudio?.length > 0 && (
            <div className="py-3">
              {entry?.relatedAudio?.length > 0 &&
                entry?.relatedAudio?.map((audioObject) => (
                  <AudioMinimal.Container
                    key={audioObject?.id}
                    icons={{
                      Play: getIcon(
                        'Play',
                        `fill-current h-6 w-6 md:w-4 md:h-4 ${
                          audioObject?.speakers?.length > 0 ? 'mr-2' : ''
                        }`,
                      ),
                      Stop: getIcon(
                        'Stop',
                        `fill-current h-6 w-6 md:w-4 md:h-4 ${
                          audioObject?.speakers?.length > 0 ? 'mr-2' : ''
                        }`,
                      ),
                    }}
                    buttonStyling="bg-secondary hover:bg-secondary-dark text-white text-sm rounded-lg inline-flex items-center py-1.5 px-2 mr-2"
                    label={audioObject?.speakers?.[0]?.name}
                    audioObject={audioObject}
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
                  key={category?.id}
                  to={`/${sitename}/categories/${category?.id}`}
                  className="p-1.5 inline-flex text-sm font-medium rounded-lg bg-tertiaryB hover:bg-tertiaryB-dark text-white mr-1"
                >
                  {category?.title}
                  <span className="sr-only">,&nbsp;</span>
                </Link>
              ))}
            </div>
          )}
          {/* Related Content */}
          {entry?.relatedEntries?.length > 0 && (
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
                  {entry?.relatedEntries?.map((asset, index) => {
                    const zebraStripe = index % 2 === 0 ? 'bg-gray-100' : ''
                    return (
                      <tr key={asset?.id} className={zebraStripe}>
                        <td className="py-2 pl-5 flex items-center">
                          <Link
                            to={`/${sitename}/${makePlural(asset?.type)}/${
                              asset?.id
                            }`}
                          >
                            {asset ? asset?.title : null}
                          </Link>
                          {asset?.relatedAudio?.map((audioObject) => (
                            <AudioMinimal.Container
                              key={audioObject?.id}
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
                              audioObject={audioObject}
                            />
                          ))}
                        </td>
                        <td className="py-2 pr-5">
                          <span>{asset?.translations?.[0]?.text}</span>
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
              {entry?.relatedImages
                ? entry?.relatedImages?.map((image) => (
                    <div key={image?.id}>
                      <div className="inline-flex rounded-lg overflow-hidden relative ">
                        <div className="relative">
                          <div className="inline-flex rounded-lg overflow-hidden cursor-pointer">
                            <ImageWithLightbox.Presentation image={image} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
              {entry?.relatedVideos
                ? entry?.relatedVideos?.map((video) => (
                    <div key={video?.id}>
                      <div className="inline-flex rounded-lg overflow-hidden">
                        <video
                          className="shrink-0 w-full h-auto"
                          src={getMediaPath({
                            mediaObject: video,
                            type: VIDEO,
                            size: ORIGINAL,
                          })}
                          controls
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <Disclosure>
                        <div className="flex justify-end">
                          <Disclosure.Button>
                            <div className="border-2 z-10 bg-white w-4 h-4 text-sm flex items-center justify-center p-1 rounded-full">
                              <span>i</span>
                            </div>
                          </Disclosure.Button>
                        </div>
                        <Disclosure.Panel>
                          {video?.title && (
                            <div className="text-fv-charcoal font-bold">
                              {video?.title}
                              {video?.description && (
                                <span className="font-medium">
                                  {' '}
                                  - {video?.description}
                                </span>
                              )}
                            </div>
                          )}
                          {video?.acknowledgement && (
                            <div className="text-fv-charcoal">
                              <span className="font-medium">
                                Acknowledgement: {video?.acknowledgement}
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
                    <li key={acknowledgement?.id} className={contentStyling}>
                      {acknowledgement?.text}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {/* Notes */}
          {entry?.notes?.length > 0 && (
            <div className="py-3">
              <h4 className={lableStyling}>Notes</h4>
              <ul className="list-disc">
                {entry?.notes?.map((note) => (
                  <li key={note?.id} className={contentStyling}>
                    {note?.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {entry?.pronunciations?.length > 0 && (
            <div className="py-3">
              <h4 className={lableStyling}>Pronunciations</h4>
              <ul className="list-disc">
                {entry?.pronunciations?.map((pronunciation) => (
                  <li key={pronunciation?.id} className={contentStyling}>
                    {pronunciation?.text}
                  </li>
                ))}
              </ul>
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
