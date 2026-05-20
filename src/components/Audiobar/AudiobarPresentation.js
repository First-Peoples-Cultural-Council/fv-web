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
        } absolute inset-x-0 bottom-24 transition-all bg-charcoal-100 text-charcoal-900 shadow-xl`}
      >
        <button
          data-testid="audiobar-info-btn"
          type="button"
          className="float-right m-3 text-charcoal-500 hover:text-charcoal-900 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-charcoal-300"
          onClick={() => setInfoOpen(false)}
        >
          {getIcon('Close', 'fill-current h-7 w-7')}
        </button>
        <div className="max-w-7xl mx-auto py-5 px-2">
          <div className="mb-2 font-bold">
            <div className="text-xl">About this audio</div>
          </div>
          <div className="space-y-2">
            {data?.title && (
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-1 text-blumine-800 text-sm font-bold uppercase leading-4 tracking-wide">
                  Title:
                </div>
                <div className="col-span-4">{data?.title}</div>
              </div>
            )}
            {data?.speakers?.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-1 text-blumine-800 text-sm font-bold uppercase leading-4 tracking-wide">
                  {data?.speakers?.length === 1 ? 'Speaker:' : 'Speakers:'}
                </div>
                {data?.speakers.map((speaker) => (
                  <div key={speaker?.id} className="col-span-4">
                    {speaker?.name}
                  </div>
                ))}
              </div>
            )}
            {data?.description && (
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-1 text-blumine-800 text-sm font-bold uppercase leading-4 tracking-wide">
                  Description:
                </div>
                <div className="col-span-4">{data?.description}</div>
              </div>
            )}
            {data?.acknowledgement && (
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-1 text-blumine-800 text-sm font-bold uppercase leading-4 tracking-wide">
                  Acknowledgement:
                </div>
                <div className="col-span-4">{data?.acknowledgement}</div>
              </div>
            )}
            {data?.fileSize && (
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-1 text-blumine-800 text-sm font-bold uppercase leading-4 tracking-wide">
                  File Size:
                </div>
                <div className="col-span-4">{data?.fileSize}</div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Audiobar */}
      <section className="px-10 xl:px-0 max-w-7xl mx-auto">
        <div className="grid grid-cols-8 justify-items-stretch ">
          <div className="col-span-2 flex items-center h-24">
            <div className="p-3 lg:p-0 space-y-1 text-white">
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
                  data-testid="audiobar-play-pause-btn"
                  type="button"
                  aria-label="Play/Pause"
                  onClick={() => onPlayPauseClick()}
                  className="btn-sm-icon btn-tertiary rounded-full"
                >
                  {getIcon(`${isPlaying ? 'Pause' : 'Play'}`)}
                </button>
              </div>
              <div className="text-center text-sm mt-1 overflow-x-auto text-white">
                {data?.label?.length > 0 && (
                  <span className="mr-3 truncate">{data?.label}</span>
                )}
                {title ? (
                  <button
                    data-testid="audiobar-info-btn"
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
              <div className="flex justify-center items-center text-white group space-x-2">
                <button
                  data-testid="audiobar-rate-btn"
                  type="button"
                  aria-label="rate"
                  className="font-bold text-charcoal-900 bg-white rounded-sm px-2 py-1"
                  onClick={() => onRateChange()}
                >
                  {`${rate.toString()}x`}
                </button>
                <a
                  href={data?.downloadLink}
                  className="btn-md-icon btn-tertiary text-white bg-transparent hover:bg-charcoal-500"
                >
                  {getIcon('Download')}
                </a>
                <button
                  data-testid="audiobar-mute-btn"
                  type="button"
                  id="MuteAudiobar"
                  aria-label="Mute"
                  className="btn-md-icon btn-tertiary text-white bg-transparent hover:bg-charcoal-500"
                  onClick={() => onVolumeChange(0)}
                >
                  {getIcon(`${volume === 0 ? 'Mute' : 'Audio'}`)}
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
                  className="w-1/2 h-1 bg-charcoal-300 rounded-sm outline-hidden inline-flex"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <button
        data-testid="audiobar-close-btn"
        type="button"
        id="CloseAudiobar"
        aria-label="Close Audiobar"
        className="absolute top-0 right-0 xl:right-2 btn-sm-icon btn-tertiary text-charcoal-300 bg-transparent hover:bg-charcoal-500"
        onClick={() => close()}
      >
        {getIcon('Close')}
      </button>
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
