import React from 'react'
import PropTypes from 'prop-types'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'

// FPCC
import DictionaryDetailLabel from 'components/DictionaryDetail/DictionaryDetailLabel'
import { getMediaPath } from 'common/utils/mediaHelpers'
import ImageWithLightbox from 'components/ImageWithLightbox'
import MediaThumbnail from 'components/MediaThumbnail'
import { ORIGINAL, VIDEO } from 'common/constants'

function DictionaryDetailMedia({ entry }) {
  const noMedia = !(
    entry?.relatedImages?.length > 0 ||
    entry?.relatedVideos?.length > 0 ||
    entry?.relatedVideoLinks?.length > 0
  )
  return noMedia ? null : (
    <div data-testid="DictionaryDetailMedia" className="w-full space-y-7">
      {/* Related Images */}
      {entry?.relatedImages?.length > 0 && (
        <div className="flex w-full justify-center">
          <div className="w-full">
            <DictionaryDetailLabel label="Images" />
            <TabGroup>
              <TabPanels>
                {entry?.relatedImages?.map((image) => (
                  <TabPanel
                    key={image?.id}
                    className="aspect-video max-h-78 w-full flex items-center rounded-lg bg-charcoal-100 overflow-hidden"
                  >
                    <ImageWithLightbox.Presentation
                      image={image}
                      imgStyling="object-contain rounded-lg w-full"
                      withIcon
                    />
                  </TabPanel>
                ))}
              </TabPanels>
              {entry?.relatedImages?.length > 1 && (
                <TabList className="flex overflow-x-auto space-x-4 snap-x mt-3">
                  {entry?.relatedImages?.map((image) => (
                    <Tab
                      key={image?.id}
                      className="shrink-0 snap-start rounded-lg overflow-hidden w-18 h-18 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-blumine-600 data-selected:border-4 data-selected:border-blumine-500"
                    >
                      <MediaThumbnail.Image
                        key={image?.id}
                        imageObject={image}
                        containerStyles=""
                        imageStyles="w-18 h-18 object-cover"
                      />
                    </Tab>
                  ))}
                </TabList>
              )}
            </TabGroup>
          </div>
        </div>
      )}
      {/* Related Videos */}
      {entry?.relatedVideos?.length > 0 && (
        <div className="flex w-full justify-center">
          <div className="w-full">
            <DictionaryDetailLabel label="Videos" />
            <TabGroup>
              <TabPanels>
                {entry?.relatedVideos?.map((video) => (
                  <TabPanel
                    key={video?.id}
                    className="aspect-video max-h-78 w-full inline-flex rounded-lg overflow-hidden"
                  >
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

                    <Disclosure>
                      <div className="flex justify-end">
                        <DisclosureButton>
                          <div className="z-10 w-5 h-5 text-sm text-white bg-charcoal-300 flex items-center justify-center rounded-full">
                            <span>i</span>
                          </div>
                        </DisclosureButton>
                      </div>
                      <DisclosurePanel>
                        <div className="text-charcoal-900 -mt-5 pr-5">
                          {video?.title && (
                            <div>
                              <div className="text-base">{video?.title}</div>
                              {video?.descriotion && (
                                <div className="text-sm">
                                  {video?.description}
                                </div>
                              )}
                            </div>
                          )}
                          {video?.acknowledgement && (
                            <div className="text-sm">
                              Acknowledgement: {video?.acknowledgement}
                            </div>
                          )}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  </TabPanel>
                ))}
              </TabPanels>
              {entry?.relatedVideos?.length > 1 && (
                <TabList className="flex overflow-x-auto space-x-4 snap-x mt-2">
                  {entry?.relatedVideos?.map((video) => (
                    <Tab
                      key={video?.id}
                      className="shrink-0 snap-start rounded-lg overflow-hidden w-18 h-18 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-blumine-600 data-selected:border-4 data-selected:border-blumine-500"
                    >
                      <MediaThumbnail.Video
                        key={video?.id}
                        videoObject={video}
                        containerStyles=""
                        videoStyles="w-18 h-18 object-cover"
                      />
                    </Tab>
                  ))}
                </TabList>
              )}
            </TabGroup>
          </div>
        </div>
      )}
      {/* Related Video Links */}
      {entry?.relatedVideoLinks?.length > 0 && (
        <div className="flex w-full justify-center">
          <div className="w-full">
            <DictionaryDetailLabel label="Video Links" />
            <TabGroup>
              <TabPanels>
                {entry?.relatedVideoLinks?.map((link) => (
                  <TabPanel
                    key={link?.id}
                    className="rounded-lg overflow-hidden"
                  >
                    <iframe
                      className="aspect-3/2 max-h-60 w-full"
                      src={link?.embedLink}
                      title="video"
                      allowFullScreen
                    >
                      Your browser does not support the iframe tag.
                    </iframe>
                  </TabPanel>
                ))}
              </TabPanels>
              {entry?.relatedVideoLinks?.length > 1 && (
                <TabList className="flex overflow-x-auto space-x-4 snap-x mt-3">
                  {entry?.relatedVideoLinks?.map((link) => (
                    <Tab
                      key={link?.id}
                      className="shrink-0 snap-start rounded-lg overflow-hidden w-18 h-18 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-blumine-600 data-selected:border-4 data-selected:border-blumine-500"
                    >
                      <MediaThumbnail.VideoLink
                        key={link?.id}
                        link={link}
                        containerStyles=""
                        imageStyles="w-18 h-18 object-cover"
                      />
                    </Tab>
                  ))}
                </TabList>
              )}
            </TabGroup>
          </div>
        </div>
      )}
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
DictionaryDetailMedia.propTypes = {
  entry: object,
}

export default DictionaryDetailMedia
