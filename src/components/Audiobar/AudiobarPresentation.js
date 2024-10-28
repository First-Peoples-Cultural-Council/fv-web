import React, { useState } from 'react'
import PropTypes from 'prop-types'
import getIcon from 'common/utils/getIcon'

function AudiobarPresentation({
  data,
  curTime,
  duration,
  isPlaying,
  onPlayPauseClick,
  close,
  volume,
  onVolumeChange,
  rate,
  onRateChange,
}) {
  const [infoOpen, setInfoOpen] = useState(false)
  const title = data?.title
  return (
    <nav
      id="Audiobar"
      className="transition-all transform fixed inset-x-0 bottom-0 h-24 bg-charcoal-900 shadow-xl print:hidden"
    >
      {/* Infobar */}
      <section
        className={`${
          infoOpen ? '' : 'hidden'
        } absolute inset-x-0 bottom-24 transition-all bg-gray-200 text-charcoal-900 shadow-xl`}
      >
        <button
          type="button"
          className="float-right m-3 text-gray-500 hover:text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
          onClick={() => setInfoOpen(false)}
        >
          {getIcon('Close', 'fill-current h-7 w-7')}
        </button>
        <div className="max-w-7xl mx-auto py-5">
          <div className="mb-4 font-bold">
            <div className="text-4xl">About this audio</div>
            {data?.title && (
              <div className="text-2xl">Title: {data?.title}</div>
            )}
          </div>
          <div className="grid grid-cols-2">
            <div className="col-span-1 space-y-2 text-lg">
              {data?.description && (
                <>
                  <div className="font-bold">Description:</div>
                  <div>{data?.description}</div>
                </>
              )}
              {data?.acknowledgement && (
                <>
                  <div className="font-bold">Acknowledgement:</div>
                  <div>{data?.acknowledgement}</div>
                </>
              )}
            </div>
            <div className="col-span-1 text-lg space-y-2">
              {data?.speakers?.length > 0 && (
                <div className="grid grid-cols-4 text-lg">
                  <div className="font-bold col-span-1">
                    {data?.speakers?.length === 1 ? 'Speaker:' : 'Speakers:'}
                  </div>
                  {data?.speakers.map((speaker) => (
                    <div key={speaker?.id} className="col-span-3">
                      {speaker?.name}
                    </div>
                  ))}
                </div>
              )}
              {data?.fileSize && (
                <div className="grid grid-cols-4 text-lg">
                  <div className="font-bold col-span-1">File Size:</div>
                  <div className="col-span-3">{data?.fileSize}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Audiobar */}
      <section className="max-w-screen-2xl">
        <button
          type="button"
          id="CloseAudiobar"
          aria-label="Close Audiobar"
          className="float-right m-2 text-gray-500 hover:text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
          onClick={() => close()}
        >
          {getIcon('Close', 'fill-current h-7 w-7')}
        </button>
        <div className="grid grid-cols-8 justify-items-stretch ">
          <div className="col-span-2 flex items-center h-24">
            <div className="p-3 lg:pl-14 xl:pl-20 space-y-1 text-white">
              {data?.speakers?.length > 0 && (
                <>
                  <div className="mt-1 text-sm">
                    {data?.speakers?.length === 1 ? 'SPEAKER' : 'SPEAKERS'}
                  </div>
                  {data?.speakers?.map((speaker) => (
                    <div key={speaker.id} className="mt-1">
                      {speaker?.name}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="col-span-4 flex items-center h-24">
            <div className="w-full">
              <div className="flex justify-center items-center space-x-5">
                <button
                  type="button"
                  aria-label="Play/Pause"
                  onClick={() => onPlayPauseClick()}
                  className="text-charcoal-900 p-2 rounded-full bg-white shadow-lg"
                >
                  {getIcon(
                    `${isPlaying ? 'Pause' : 'Play'}`,
                    'w-4 h-4 fill-current',
                  )}
                </button>
              </div>
              <div className="text-center text-sm mt-1 overflow-x-auto text-white">
                {data?.label?.length > 0 && (
                  <span className="mr-3 truncate">{data?.label}</span>
                )}
                {title ? (
                  <button
                    type="button"
                    onClick={() => setInfoOpen(!infoOpen)}
                    aria-label="Open Audio Info"
                  >
                    {getIcon(
                      'InfoCircleSolid',
                      'w-4 h-4 mb-1 fill-current inline-flex',
                    )}
                  </button>
                ) : (
                  ''
                )}
              </div>
              <div className="text-center text-sm text-white">{`${curTime} / ${duration}`}</div>
            </div>
          </div>
          <div className="col-span-2 flex items-center h-24">
            <div className="w-full p-1 space-y-2">
              <div className="flex justify-center items-center text-white group">
                <button
                  type="button"
                  id="#"
                  aria-label="rate"
                  className="mr-2 font-bold text-black bg-white rounded px-2 py-1"
                  onClick={() => onRateChange()}
                >
                  {`${rate.toString()}x`}
                </button>
                <a href={data?.downloadLink} className="text-white">
                  {getIcon('Download', 'w-6 h-6 fill-current mr-3 inline-flex')}
                </a>
                <button
                  type="button"
                  id="MuteAudiobar"
                  aria-label="Mute"
                  className="text-white"
                  onClick={() => onVolumeChange(0)}
                >
                  {getIcon(
                    `${volume === 0 ? 'Mute' : 'Audio'}`,
                    'w-6 h-6 fill-current mr-2 inline-flex',
                  )}
                </button>
                <label
                  id="VolumeAudiobarLabel"
                  htmlFor="VolumeAudiobar"
                  className="sr-only"
                >
                  Volume range slider
                </label>
                <input
                  id="VolumeAudiobar"
                  aria-labelledby="VolumeAudiobarLabel"
                  type="range"
                  name="volume"
                  min="0"
                  max="10"
                  value={volume}
                  onChange={(event) => {
                    onVolumeChange(event.target.value)
                  }}
                  className="w-1/2 h-1 bg-gray-400 rounded outline-none inline-flex"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </nav>
  )
}
// PROPTYPES
const { bool, func, number, object, string } = PropTypes
AudiobarPresentation.propTypes = {
  data: object,
  curTime: string,
  duration: string,
  isPlaying: bool,
  onPlayPauseClick: func,
  close: func,
  onVolumeChange: func,
  volume: number,
  rate: number,
  onRateChange: func,
}

export default AudiobarPresentation
