import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
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
import RelatedDocumentsList from 'components/RelatedDocumentsList'
import RelatedEntriesTable from 'components/RelatedEntriesTable'
import SiteDocHead from 'components/SiteDocHead'
import Tooltip from 'components/Tooltip'
import { capitalizeFirstLetter } from 'common/utils/stringHelpers'

function DictionaryDetailPresentation({ entry, sitename }) {
  const labelStyling =
    'justify-start text-blumine-800 text-sm font-bold uppercase leading-4 tracking-wide mb-3'
  const contentStyling =
    'justify-start text-black text-base font-normal leading-5 sm:col-span-2'
  const noMedia = !(
    entry?.relatedImages?.length > 0 ||
    entry?.relatedVideos?.length > 0 ||
    entry?.relatedVideoLinks?.length > 0
  )
  const shortTitle = entry?.title.length < 20

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 mt-4 md:mt-16 bg-white"
      data-testid="DictionaryDetailPresentation"
    >
      <SiteDocHead titleArray={[entry.title, 'Dictionary']} />
      <div className="grid grid-cols-8 gap-4">
        <div
          className={`max-w-2xl col-span-8  ${noMedia ? 'md:col-span-6 md:col-start-2' : 'md:col-span-5'}`}
        >
          <section>
            <div className="md:flex md:justify-between md:items-start space-x-5">
              <div className="space-y-1.5">
                <div
                  className={`justify-start text-black font-bold leading-10 ${
                    shortTitle ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'
                  }`}
                >
                  {entry.title}
                </div>
                {/* Part of Speech */}
                {entry?.partOfSpeech?.title && (
                  <div className="justify-start text-black text-base font-light leading-5">
                    {entry?.partOfSpeech?.title?.toLowerCase()}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {entry?.visibility && entry?.visibility !== PUBLIC && (
                  <Tooltip
                    position="left-1/2 bottom-5"
                    message={`${capitalizeFirstLetter(entry?.visibility)} only`}
                  >
                    {getIcon(
                      entry?.visibility,
                      'fill-current text-blumine-900 h-6 w-6',
                    )}
                  </Tooltip>
                )}
                <ActionsMenu.Presentation
                  entry={entry}
                  sitename={sitename}
                  withLabels
                />
              </div>
            </div>
          </section>
          <section className="space-y-7 my-5">
            {/* Translations/Definitions */}
            {entry?.translations?.length > 0 && (
              <div>
                <h4 className={labelStyling}>Translation</h4>
                <ol
                  className={`${
                    entry?.translations?.length === 1
                      ? 'list-none'
                      : 'list-decimal list-inside'
                  } ${contentStyling}`}
                >
                  {entry?.translations?.map((translation) => (
                    <li key={translation?.text} className={contentStyling}>
                      {translation?.text}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Pronunciations */}
            {entry?.pronunciations?.length > 0 && (
              <div>
                <h4 className={labelStyling}>Pronunciation</h4>
                <div className="inline-flex">
                  {entry?.pronunciations?.map((pronunciation, index) => {
                    const isLast = index === entry?.pronunciations?.length - 1
                    return (
                      <div key={`${index}-${pronunciation?.text}`}>
                        <span
                          key={pronunciation?.text}
                          className={contentStyling}
                        >
                          {pronunciation?.text}
                        </span>
                        {!isLast && <span className="mx-3">/</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Audio */}
            {entry?.relatedAudio?.length > 0 && (
              <div>
                <h4 className={labelStyling}>Audio</h4>
                <div className="space-y-3">
                  {entry?.relatedAudio?.map((audioObject) => (
                    <AudioMinimal.Container
                      key={audioObject?.id}
                      icons={{
                        Play: getIcon('Audio'),
                        Stop: getIcon('Stop'),
                      }}
                      buttonStyling="btn-primary btn-sm mr-4 min-w-0"
                      label={audioObject?.speakers?.[0]?.name || 'Speaker'}
                      audioObject={audioObject}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Alternate Spellings */}
            {entry?.alternateSpellings?.length > 0 && (
              <div>
                <h4 className={labelStyling}>Alternate Spellings</h4>
                <div className="inline-flex">
                  {entry?.alternateSpellings?.map((spelling, index) => {
                    const isLast = index === entry?.pronunciations?.length - 1
                    return (
                      <div key={`${index}-${spelling?.text}`}>
                        <span key={spelling?.text} className={contentStyling}>
                          {spelling?.text}
                        </span>
                        {!isLast && <span className="mx-3">/</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Categories */}
            {entry?.categories?.length > 0 && (
              <div>
                <h4 className={labelStyling}>Categories</h4>
                <div className="space-y-3">
                  {entry?.categories?.map((category) => (
                    <Link
                      key={category.id}
                      to={`/${sitename}/categories/${category.id}`}
                      className="btn-secondary btn-sm mr-4 min-w-0"
                    >
                      {category?.title}
                      <span className="sr-only">,&nbsp;</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Content */}
            <div>
              <h4 className={labelStyling}>Related Entries</h4>
              <RelatedEntriesTable.Presentation
                entries={entry?.relatedEntries || []}
                sitename={sitename}
                labelStyling={labelStyling}
              />
            </div>

            {/* Acknowledgements */}
            {entry?.acknowledgements?.length > 0 && (
              <div>
                <h4 className={labelStyling}>Acknowledgement</h4>
                <ul className="list-none space-y-1">
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
              <div>
                <h4 className={labelStyling}>Notes</h4>
                <ul className="list-none space-y-1">
                  {entry?.notes?.map((note) => (
                    <li key={note?.id} className={contentStyling}>
                      {note?.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Documents */}
            {entry?.relatedDocuments?.length > 0 && (
              <div>
                <h4 className={labelStyling}>Related Documents</h4>
                <RelatedDocumentsList.Presentation
                  documents={entry?.relatedDocuments || []}
                />
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
                    <li key={video.id} className="my-2">
                      <iframe
                        className="aspect-3/2 rounded-lg w-full"
                        src={video?.embedLink}
                        title="video"
                        allowFullScreen
                      >
                        Your browser does not support the iframe tag.
                      </iframe>
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
const { object, string } = PropTypes
DictionaryDetailPresentation.propTypes = {
  entry: object,
  sitename: string,
}

export default DictionaryDetailPresentation
