import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioButton from 'components/AudioButton'
import { useAudio } from 'common/dataHooks/useAudio'
import SectionTitle from 'components/SectionTitle'
import LinkButton from 'components/LinkButton'

function WidgetTextConcisePresentation({ widgetData }) {
  const { audio, title, text, url, urlLabel } = widgetData.settings

  const audioQueryResponse = useAudio({ id: audio })
  const audioObject = audioQueryResponse?.data

  return (
    <section
      id="WidgetTextConcisePresentation"
      key={widgetData?.id}
      className="p-6 md:p-12"
    >
      <div className="mb-6 lg:mb-10">
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
      <div className="text-center space-y-6 lg:space-y-10">
        {text && (
          <div className="px-6 lg:px-12">
            <p className="max-w-7xl mx-auto text-center text-base md:text-xl lg:text-2xl text-charcoal-800">
              {text}
            </p>
          </div>
        )}
        {url && <LinkButton url={url} urlLabel={urlLabel} />}
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
