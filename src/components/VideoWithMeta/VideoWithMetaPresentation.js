import React from 'react'
import PropTypes from 'prop-types'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import { ORIGINAL, VIDEO } from 'common/constants'

function VideoWithMeta({ video }) {
  return video?.id ? (
    <div id="VideoWithMeta">
      <div
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
              <div
                data-testid="video-meta-btn"
                className="z-10 w-5 h-5 text-sm text-white bg-charcoal-300 flex items-center justify-center rounded-full"
              >
                <span>i</span>
              </div>
            </DisclosureButton>
          </div>
          <DisclosurePanel>
            <div
              data-testid="video-meta-panel"
              className="text-charcoal-900 -mt-5 pr-5"
            >
              {video?.title && (
                <div>
                  <div className="text-base">{video?.title}</div>
                  {video?.descriotion && (
                    <div className="text-sm">{video?.description}</div>
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
      </div>
    </div>
  ) : null
}
// PROPTYPES
const { object } = PropTypes
VideoWithMeta.propTypes = {
  video: object,
}

export default VideoWithMeta
