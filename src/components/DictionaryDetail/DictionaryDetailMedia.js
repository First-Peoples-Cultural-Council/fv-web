import React from 'react'
import PropTypes from 'prop-types'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import ImageWithLightbox from 'components/ImageWithLightbox'
import { ORIGINAL, VIDEO } from 'common/constants'

function DictionaryDetailMedia({ entry }) {
  return (
    <div data-testid="DictionaryDetailMedia" className="w-full">
      <ul>
        {entry?.relatedImages
          ? entry?.relatedImages?.map((image) => (
              <li key={image.id} className="my-2">
                <div className="inline-flex rounded-lg overflow-hidden relative ">
                  <div className="relative">
                    <div className="inline-flex rounded-lg overflow-auto">
                      <ImageWithLightbox.Presentation image={image} withIcon />
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
  )
}
// PROPTYPES
const { object } = PropTypes
DictionaryDetailMedia.propTypes = {
  entry: object,
}

export default DictionaryDetailMedia
