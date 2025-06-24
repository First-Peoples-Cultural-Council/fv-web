import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioButton from 'components/AudioButton'
import { useAudio } from 'common/dataHooks/useAudio'
import { FIRSTVOICESLINK } from 'common/constants'

function WidgetTextConcisePresentation({ widgetData }) {
  const { audio, title, text, url, urlLabel } = widgetData.settings
  const { sitename } = widgetData

  const audioQueryResponse = useAudio({ id: audio })
  const audioObject = audioQueryResponse?.data

  return (
    <section
      id="WidgetTextConcisePresentation"
      key={widgetData?.id}
      className="py-3 md:py-6 bg-white"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-3 text-center">
        <div className="flex w-full mx-auto items-center justify-center text-blumine-800">
          <span className="leading-loose text-2xl md:text-4xl lg:text-5xl text-center font-bold">
            {title}
          </span>
          {audio && <AudioButton audioArray={[audioObject]} hoverTooltip />}
        </div>
        <p className="text-center text-lg md:text-xl lg:text-2xl">{text}</p>
        {url && (
          <a
            href={url}
            {...(url.includes(FIRSTVOICESLINK) || url.startsWith(`/${sitename}`)
              ? { target: '_self' }
              : { target: '_blank' })}
            rel="noopener noreferrer"
            className="btn-contained"
          >
            <span>{urlLabel || 'Learn More'}</span>
          </a>
        )}
      </div>
    </section>
  )
}
// PROPTYPES
const { string, shape } = PropTypes
WidgetTextConcisePresentation.propTypes = {
  widgetData: shape({
    settings: shape({
      title: string.isRequired,
      text: string.isRequired,
      url: string,
      urlLabel: string,
    }),
  }),
}
export default WidgetTextConcisePresentation
