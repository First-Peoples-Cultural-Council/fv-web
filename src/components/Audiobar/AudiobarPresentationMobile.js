import React from 'react'
import PropTypes from 'prop-types'
import getIcon from 'common/utils/getIcon'

function AudiobarPresentationMobile({
  data,
  curTime,
  duration,
  isPlaying,
  onPlayPauseClick,
  open,
  close,
  rate,
  onRateChange,
}) {
  return (
    <nav
      id="Audiobar"
      className={`${
        open ? '' : 'hidden'
      } fixed inset-x-0 -bottom-1 z-50 bg-charcoal-900 p-2`}
    >
      <div className="w-full h-full text-white flex align-center items-center">
        <div className="w-full space-y-1">
          <button
            type="button"
            className="float-right text-gray-500 hover:text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
            onClick={() => close()}
          >
            {getIcon('Close', 'fill-current h-7 w-7')}
          </button>
          <div className="flex justify-center items-center text-center overflow-x-auto">
            {data?.title}
            {data?.speakers?.length > 0 &&
              ` | Speakers: ${data?.speakers
                ?.map((speaker) => speaker.name)
                .join(', ')}`}
          </div>
          <div className="flex justify-center items-center space-x-5">
            <button
              type="button"
              onClick={() => onPlayPauseClick()}
              className="text-charcoal-900 p-3 rounded-full bg-white shadow-lg"
            >
              {getIcon(
                `${isPlaying ? 'Pause' : 'Play'}`,
                'w-4 h-4 fill-current',
              )}
            </button>
          </div>
          <div className="flex">
            <div className="w-2/6"></div>
            <div className="text-white text-center w-2/6 pr-6">{`${curTime} / ${duration}`}</div>
            <div className="w-2/6 flex justify-end">
              <button
                type="button"
                id="#"
                aria-label="rate"
                className="mr-2 font-bold text-black bg-white rounded px-2 py-1"
                onClick={() => onRateChange()}
              >
                {`${rate.toString()}x`}
              </button>
              <a href={data?.downloadLink} className="text-white float-right">
                {getIcon('Download', 'w-6 h-6 fill-current inline-flex')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
// PROPTYPES
const { bool, func, object, string, number } = PropTypes
AudiobarPresentationMobile.propTypes = {
  data: object,
  curTime: string,
  duration: string,
  isPlaying: bool,
  onPlayPauseClick: func,
  open: bool,
  close: func,
  rate: number,
  onRateChange: func,
}

export default AudiobarPresentationMobile
