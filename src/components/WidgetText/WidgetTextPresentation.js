import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaUrl } from 'common/utils/urlHelpers'
import AudioButton from 'components/AudioButton'
import WysiwygBlock from 'components/WysiwygBlock'
import { FIRSTVOICESLINK } from 'common/constants'

function WidgetTextPresentation({ widgetData }) {
  const {
    title,
    textWithFormatting,
    image,
    url,
    urlLabel,
    audio,
    bg,
    bgImage,
  } = widgetData?.settings
  const format = widgetData?.format || 'left'

  const getImageElement = () =>
    image ? (
      <div className="md:w-1/2 overflow-hidden inline-flex items-center">
        <img
          className="w-full h-64 sm:h-72 md:h-96 lg:h-3/4-screen object-cover"
          src={getMediaUrl({ id: image, type: 'gifOrImg' })}
          alt={title}
        />
      </div>
    ) : null

  const getTextElement = () => (
    <div
      className={`${image ? 'md:w-1/2' : 'm-auto w-full'} bg-${
        bg || ''
      } inline-flex items-center`}
      style={{
        backgroundImage: `url(${getMediaUrl({
          id: bgImage,
          type: 'image',
          viewName: 'Medium',
        })})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 20% top',
        backgroundSize: 'cover',
      }}
    >
      <div className="max-w-5xl mx-auto text-center px-8 py-4">
        <h2
          className={`text-xl md:text-2xl lg:text-3xl text-${
            bg ? 'white' : 'black'
          } font-bold flex items-center mb-4`}
        >
          <span className="inline-block">{title}</span>
          {audio && (
            <AudioButton
              audioArray={[audio]}
              iconStyling="fill-current h-6 w-6 sm:w-8 sm:h-8 ml-2"
              hoverTooltip
            />
          )}
        </h2>
        <div
          className={`inline-block text-bold text-base md:text-lg text-${
            bg ? 'white' : 'black'
          } max-w-md md:max-w-4xl mx-auto`}
        >
          <WysiwygBlock jsonString={textWithFormatting} />
        </div>
        {url && (
          <div className="mt-2 lg:mt-6 flex justify-left">
            <div className="rounded-full shadow">
              <a
                href={url}
                {...(url.includes(FIRSTVOICESLINK)
                  ? { target: '_self' }
                  : { target: '_blank' })}
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full text-${
                  bg || 'white'
                } bg-${
                  bg ? 'white' : 'secondary'
                } hover:bg-secondary-dark md:text-lg`}
              >
                {urlLabel || 'More...'}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (format === 'right') {
    return (
      <section className="w-full" data-testid="WidgetTextPresentation">
        <div className="flex flex-col md:flex-row bg-gradient-to-b from-white to-gray-100">
          {getTextElement()}
          {getImageElement()}
        </div>
      </section>
    )
  }

  return (
    <section className="w-full" data-testid="WidgetTextPresentation">
      <div className="flex flex-col md:flex-row bg-gradient-to-b from-white to-gray-100">
        {getImageElement()}
        {getTextElement()}
      </div>
    </section>
  )
}

// PROPTYPES
const { string, shape, bool } = PropTypes
WidgetTextPresentation.propTypes = {
  widgetData: shape({
    format: PropTypes.oneOf(['right', 'left']),
    settings: shape({
      title: string,
      textWithFormatting: string,
      url: string,
      urlLabel: string,
      image: string,
      audio: string,
    }),
    exteriorLink: bool,
  }),
}

export default WidgetTextPresentation
