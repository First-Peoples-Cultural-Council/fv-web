import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import getIcon from 'common/utils/getIcon'
import AudioMinimal from 'components/AudioMinimal'
import ActionsMenu from 'components/ActionsMenu'
import ImageWithLightbox from 'components/ImageWithLightbox'
import { ORIGINAL, VIDEO, PUBLIC } from 'common/constants'
import RelatedEntriesTable from 'components/RelatedEntriesTable'

function DictionaryDetailPresentation({
  actions,
  moreActions,
  entry,
  sitename,
}) {
  const labelStyling =
    'text-left font-medium text-lg uppercase text-charcoal-900'
  const contentStyling = 'text-charcoal-900 sm:mt-0 sm:ml-6 sm:col-span-2'
  const listStyling = 'list-none md:list-disc space-y-1'
  const noMedia = !(
    entry?.relatedImages?.length > 0 ||
    entry?.relatedVideos?.length > 0 ||
    entry?.relatedVideoLinks?.length > 0
  )
  const shortTitle = entry?.title.length < 20

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-10 bg-white"
      data-testid="DictionaryDetailPresentation"
    >
      <div className="grid grid-cols-8 gap-4">
        <div
          id="WordDetails"
          className={`col-span-8 md:col-span-5 ${
            noMedia ? 'md:col-start-3' : ''
          }`}
        >
          <section className="lg:mb-3">
            <div className="py-2 md:p-3 md:flex items-top">
              <span
                className={`font-bold ${
                  shortTitle ? 'text-2xl md:text-5xl' : 'text-xl md:text-2xl'
                }`}
              >
                {entry.title}
              </span>

              <div className="mt-4 md:mt-1 md:ml-4">
                <ActionsMenu.Presentation
                  entry={entry}
                  sitename={sitename}
                  actions={actions}
                  moreActions={moreActions}
                  iconStyling="w-6 h-6"
                  withLabels
                  withConfirmation
                />
              </div>
              {entry?.visibility === PUBLIC || !entry?.visibility ? (
                ''
              ) : (
                <div className="mt-4 md:mt-1 md:ml-4 flex items-top text-scarlet-900">
                  {getIcon(
                    entry?.visibility,
                    'fill-current inline-flex h-6 w-6 mr-2',
                  )}
                </div>
              )}
            </div>

            {/* Translations/Definitions */}
            {entry?.translations?.length > 0 && (
              <div className="py-2 md:p-3">
                {/* Part of Speech */}
                {entry?.partOfSpeech?.title && (
                  <div className="text-xl italic">
                    {entry?.partOfSpeech?.title?.toLowerCase()}
                  </div>
                )}
                <ol
                  className={`${
                    entry?.translations?.length === 1
                      ? 'list-none'
                      : 'list-decimal'
                  } list-inside text-lg ${
                    shortTitle ? 'md:text-2xl' : 'md:text-xl'
                  }`}
                >
                  {entry?.translations?.map((translation) => (
                    <li key={translation?.text} className="p-0.5">
                      <span className={contentStyling}>
                        {translation?.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {/* Audio */}
            {entry?.relatedAudio?.length > 0 && (
              <div className="py-2 md:p-3">
                {entry?.relatedAudio?.map((audioObject) => (
                  <AudioMinimal.Container
                    key={audioObject?.id}
                    icons={{
                      Play: getIcon(
                        'Audio',
                        `fill-current h-6 w-6 ${
                          audioObject?.speakers?.length > 0 ? 'mr-2' : ''
                        }`,
                      ),
                      Stop: getIcon(
                        'Stop',
                        `fill-current h-6 w-6 ${
                          audioObject?.speakers?.length > 0 ? 'mr-2' : ''
                        }`,
                      ),
                    }}
                    buttonStyling="bg-scarlet-800 hover:bg-scarlet-900 text-white text-sm rounded-lg inline-flex items-center py-1.5 px-2 mr-2 my-1"
                    label={audioObject?.speakers?.[0]?.name}
                    audioObject={audioObject}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            {/* Alternate Spellings */}
            {entry?.alternateSpellings?.length > 0 && (
              <div className="py-2 md:p-4">
                <h4 className={labelStyling}>Alternate Spellings</h4>
                <ul className={listStyling}>
                  {entry?.alternateSpellings?.map((alt) => (
                    <li key={alt?.text} className={contentStyling}>
                      {alt?.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pronunciations */}
            {entry?.pronunciations?.length > 0 && (
              <div className="py-2 md:p-4">
                <h4 className={labelStyling}>Pronunciation</h4>
                <ul className={listStyling}>
                  {entry?.pronunciations?.map((pronunciation) => (
                    <li key={pronunciation?.text} className={contentStyling}>
                      {pronunciation?.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Categories */}
            {entry?.categories?.length > 0 && (
              <div className="py-2 md:p-4">
                <h4 className={labelStyling}>Categories</h4>
                {entry?.categories?.map((category) => (
                  <Link
                    key={category.id}
                    to={`/${sitename}/categories/${category.id}`}
                    className="p-1.5 inline-flex text-sm font-medium rounded-lg bg-charcoal-500 hover:bg-charcoal-900 text-white mr-1 mb-1"
                  >
                    {category?.title}
                    <span className="sr-only">,&nbsp;</span>
                  </Link>
                ))}
              </div>
            )}
            {/* Related Content */}
            <div className="py-2 md:p-4">
              <RelatedEntriesTable.Presentation
                entries={entry?.relatedEntries || []}
                sitename={sitename}
                labelStyling={labelStyling}
              />
            </div>
          </section>
          {/* Other Information */}
          <section>
            {/* Acknowledgements */}
            {entry?.acknowledgements?.length > 0 && (
              <div className="py-2 md:p-4">
                <h4 className={labelStyling}>Acknowledgement</h4>
                <ul className={listStyling}>
                  {entry?.acknowledgements?.map((acknowledgement) => (
                    <li key={acknowledgement?.text} className={contentStyling}>
                      {acknowledgement?.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Notes */}
            {entry?.notes?.length > 0 && (
              <div className="py-2 md:p-4">
                <h4 className={labelStyling}>Notes</h4>
                <ul className={listStyling}>
                  {entry?.notes?.map((note) => (
                    <li key={note?.id} className={contentStyling}>
                      {note?.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
        {/* Pictures and Video */}
        {noMedia ? null : (
          <div
            id="WordMedia"
            className="col-span-8 md:col-span-3 py-2 md:p-5 md:mt-5"
          >
            <ul>
              {entry?.relatedImages
                ? entry?.relatedImages?.map((image) => (
                    <li key={image.id} className="my-2">
                      <div className="inline-flex rounded-lg overflow-hidden relative ">
                        <div className="relative">
                          <div className="inline-flex rounded-lg overflow-auto">
                            <ImageWithLightbox.Presentation
                              image={image}
                              withIcon
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                : null}
              {entry?.relatedVideos
                ? entry?.relatedVideos?.map((video) => (
                    <li key={video.id} className="my-2">
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
                          <DisclosureButton>
                            <div className="border-2 z-10 bg-white w-6 h-6 text-sm flex items-center justify-center p-1 rounded-full">
                              <span>i</span>
                            </div>
                          </DisclosureButton>
                        </div>
                        <DisclosurePanel>
                          {video?.title && (
                            <div className="text-charcoal-900">
                              {video?.title}
                              {video?.descriotion && (
                                <span className="font-medium">
                                  {' '}
                                  - {video?.description}
                                </span>
                              )}
                            </div>
                          )}
                          {video?.acknowledgement && (
                            <div className="text-charcoal-900">
                              <span className="font-medium">
                                Acknowledgement: {video?.acknowledgement}
                              </span>
                            </div>
                          )}
                        </DisclosurePanel>
                      </Disclosure>
                    </li>
                  ))
                : null}
              {entry?.relatedVideoLinks
                ? entry?.relatedVideoLinks?.map((video) => (
                    <li key={video.id} className="my-2 p-3">
                      <div className="rounded-lg relative pb-videoAspect h-0">
                        <iframe
                          className="rounded-lg absolute t-0 l-0 w-full h-full"
                          src={video?.embedLink}
                          title="video"
                          allowFullScreen
                        >
                          Your browser does not support the iframe tag.
                        </iframe>
                      </div>
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
