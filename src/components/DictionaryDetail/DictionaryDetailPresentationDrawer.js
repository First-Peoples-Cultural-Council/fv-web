import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'

// FPCC
import { ORIGINAL, VIDEO, PUBLIC } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
import getIcon from 'common/utils/getIcon'
import AudioMinimal from 'components/AudioMinimal'
import ActionsMenu from 'components/ActionsMenu'
import ImageWithLightbox from 'components/ImageWithLightbox'
import RelatedEntriesTable from 'components/RelatedEntriesTable'
import RelatedDocumentsList from 'components/RelatedDocumentsList'

function DictionaryDetailPresentationDrawer({
  actions,
  moreActions,
  entry,
  sitename,
  isDashboard,
}) {
  const labelStyling =
    'text-left font-medium text-lg uppercase text-charcoal-900'
  const contentStyling = 'text-sm text-charcoal-900 sm:mt-0 sm:ml-6'
  const noMedia = !(
    entry?.relatedImages?.length > 0 ||
    entry?.relatedVideos?.length > 0 ||
    entry?.relatedVideoLinks?.length > 0
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
              <span>{entry?.title}</span>
            </div>
            <div className="ml-5">
              <ActionsMenu.Presentation
                entry={entry}
                sitename={sitename}
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
                  'fill-current text-scarlet-900 h-6 w-6 ml-3 mb-1',
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
                  <li key={translation?.text} className="p-0.5">
                    <span className={contentStyling}>{translation?.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {/* Audio */}
          {entry?.relatedAudio?.length > 0 && (
            <div className="my-3">
              {entry?.relatedAudio?.length > 0 &&
                entry?.relatedAudio?.map((audioObject) => (
                  <AudioMinimal.Container
                    key={audioObject?.id}
                    icons={{
                      Play: getIcon(
                        'Audio',
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
                    buttonStyling="btn-primary btn-sm mr-2 my-2"
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
            <div className="py-3">
              <h4 className={labelStyling}>Alternate Spellings</h4>
              <ul className="list-none md:list-disc space-y-1">
                {entry?.alternateSpellings?.map((alt) => (
                  <li key={alt?.text} className={contentStyling}>
                    {alt?.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {entry?.pronunciations?.length > 0 && (
            <div className="py-3">
              <h4 className={labelStyling}>Pronunciations</h4>
              <ul className="list-disc">
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
            <div className="py-3">
              <h4 className={labelStyling}>Categories</h4>
              {entry?.categories?.map((category) => (
                <Link
                  key={category?.id}
                  to={`/${sitename}/categories/${category?.id}`}
                  className="p-1.5 inline-flex text-sm font-medium rounded-lg bg-charcoal-500 hover:bg-charcoal-900 text-white mr-1"
                >
                  {category?.title}
                  <span className="sr-only">,&nbsp;</span>
                </Link>
              ))}
            </div>
          )}
          {/* Related Content */}

          <div className="py-3">
            <RelatedEntriesTable.Presentation
              entries={entry?.relatedEntries || []}
              sitename={sitename}
              labelStyling={labelStyling}
            />
          </div>
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
                          <div className="inline-flex rounded-lg overflow-hidden">
                            <ImageWithLightbox.Presentation
                              image={image}
                              withIcon
                            />
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
                          <DisclosureButton>
                            <div className="border-2 z-10 bg-white w-4 h-4 text-sm flex items-center justify-center p-1 rounded-full">
                              <span>i</span>
                            </div>
                          </DisclosureButton>
                        </div>
                        <DisclosurePanel>
                          {video?.title && (
                            <div className="text-charcoal-900 font-bold">
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
                            <div className="text-charcoal-900">
                              <span className="font-medium">
                                Acknowledgement: {video?.acknowledgement}
                              </span>
                            </div>
                          )}
                        </DisclosurePanel>
                      </Disclosure>
                    </div>
                  ))
                : null}
              {entry?.relatedVideoLinks
                ? entry?.relatedVideoLinks?.map((video) => (
                    <div
                      key={video?.id}
                      className="rounded-lg relative pb-videoAspect h-0"
                    >
                      <iframe
                        className="rounded-lg absolute t-0 l-0 w-full h-full"
                        src={video?.embedLink}
                        title="video"
                        allowFullScreen
                      >
                        Your browser does not support the iframe tag.
                      </iframe>
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
              <h4 className={labelStyling}>Acknowledgement</h4>
              <ul className="list-disc">
                {entry?.acknowledgements?.length > 0 &&
                  entry?.acknowledgements?.map((acknowledgement) => (
                    <li key={acknowledgement?.text} className={contentStyling}>
                      {acknowledgement?.text}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {/* Notes */}
          {entry?.notes?.length > 0 && (
            <div className="py-3">
              <h4 className={labelStyling}>Notes</h4>
              <ul className="list-disc">
                {entry?.notes?.map((note) => (
                  <li key={note?.id} className={contentStyling}>
                    {note?.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Related Documents */}
          {entry?.relatedDocuments.length > 0 && (
            <div className="py-3 space-y-2">
              <h4 className={labelStyling}>Related Documents</h4>
              <RelatedDocumentsList.Presentation
                documents={entry?.relatedDocuments || []}
              />
            </div>
          )}
          {/* created and modified */}
          {isDashboard && (
            <div className="border-t text-sm">
              {entry?.createdBy && (
                <div className="py-4">
                  <p>
                    Created: {entry?.created?.slice(0, 10)} by{' '}
                    {entry?.createdBy}
                  </p>
                </div>
              )}
              {entry?.lastModifiedBy && (
                <p>
                  Modified: {entry?.lastModified?.slice(0, 10)} by{' '}
                  {entry?.lastModifiedBy}
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
// PROPTYPES
const { array, object, string, bool } = PropTypes
DictionaryDetailPresentationDrawer.propTypes = {
  actions: array,
  entry: object,
  moreActions: array,
  sitename: string,
  isDashboard: bool,
}

export default DictionaryDetailPresentationDrawer
