import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioButton from 'components/AudioButton'
import { useAudio } from 'common/dataHooks/useAudio'
import { FIRSTVOICESLINK } from 'common/constants'
import SectionTitle from 'components/SectionTitle'

function WidgetTextConcisePresentation({ widgetData }) {
  const { audio, title, text, url, urlLabel } = widgetData.settings
  const { sitename } = widgetData

  const audioQueryResponse = useAudio({ id: audio })
  const audioObject = audioQueryResponse?.data

  return (
    <section
      id="WidgetTextConcisePresentation"
      key={widgetData?.id}
      className="pt-8 md:pt-12 pb-4 md:pb-8 bg-white"
    >
      <div className="text-center space-y-6 lg:space-y-8">
        <div className="mx-2 md:mx-5 lg:mx-10">
          <SectionTitle.Presentation
            title={
              <div
                className={`flex w-full mx-auto ${title?.length > 28 ? 'items-start' : 'items-center'} justify-center`}
              >
                <span>{title}</span>
                {audio && <AudioButton audioArray={[audioObject]} />}
              </div>
            }
          />
        </div>
        {text && (
          <p className="max-w-6xl px-4 md:px-6 xl:px-0 mx-auto text-center text-base md:text-xl lg:text-2xl text-charcoal-800">
            {text}
          </p>
        )}
        {url && (
          <a
            href={url}
            {...(url.includes(FIRSTVOICESLINK) || url.startsWith(`/${sitename}`)
              ? { target: '_self' }
              : { target: '_blank' })}
            rel="noopener noreferrer"
            className="btn-primary btn-lg"
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
