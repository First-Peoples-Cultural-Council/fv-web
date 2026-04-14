import React from 'react'
import PropTypes from 'prop-types'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'

// FPCC
import { ORIGINAL, VIDEO } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
import ImageWithLightbox from 'components/ImageWithLightbox'
import DictionaryDetailPrimary from 'components/DictionaryDetail/DictionaryDetailPrimary'
import DictionaryDetailSecondary from 'components/DictionaryDetail/DictionaryDetailSecondary'

function DictionaryDetailPresentationDrawer({ entry, sitename, isDashboard }) {
  const noMedia = !(
    entry?.relatedImages?.length > 0 ||
    entry?.relatedVideos?.length > 0 ||
    entry?.relatedVideoLinks?.length > 0
  )
  return (
    <div data-testid="DictionaryDetailPresentationDrawer" className="p-6">
      <DictionaryDetailPrimary entry={entry} sitename={sitename} />
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
                    className="inline-flex rounded-lg overflow-hidden"
                  >
                    <iframe
                      className="aspect-3/2 rounded-lg w-full"
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
      <DictionaryDetailSecondary entry={entry} sitename={sitename} />
      {/* created and modified */}
      {isDashboard && (
        <section className="border-t text-sm">
          {entry?.createdBy && (
            <div className="py-4">
              <p>
                Created: {entry?.created?.slice(0, 10)} by {entry?.createdBy}
              </p>
            </div>
          )}
          {entry?.lastModifiedBy && (
            <p>
              Modified: {entry?.lastModified?.slice(0, 10)} by{' '}
              {entry?.lastModifiedBy}
            </p>
          )}
        </section>
      )}
    </div>
  )
}
// PROPTYPES
const { object, string, bool } = PropTypes
DictionaryDetailPresentationDrawer.propTypes = {
  entry: object,
  sitename: string,
  isDashboard: bool,
}

export default DictionaryDetailPresentationDrawer
