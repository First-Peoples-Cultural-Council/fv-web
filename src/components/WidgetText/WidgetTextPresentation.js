import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import AudioButton from 'components/AudioButton'
import WysiwygBlock from 'components/WysiwygBlock'
import ImgFromId from 'components/ImgFromId'
import { useAudioObject, useImageObject } from 'common/dataHooks/useMedia'
import {
  FIRSTVOICESLINK,
  FORMAT_LEFT,
  FORMAT_RIGHT,
  FORMAT_DEFAULT,
  IMAGE,
  MEDIUM,
} from 'common/constants'

function WidgetTextPresentation({ widgetData }) {
  const {
    title,
    textWithFormatting,
    image,
    url,
    urlLabel,
    audio,
    bgColor,
    bgImage,
    mockData,
  } = widgetData.settings
  const { sitename } = widgetData
  const format = widgetData?.format || FORMAT_LEFT

  const bgImageObject = useImageObject({
    id: bgImage,
  })

  const audioObject = useAudioObject({
    id: audio,
  })

  const getImageElement = () =>
    image ? (
      <div className="md:w-1/2 overflow-hidden inline-flex items-center">
        <ImgFromId.Container
          className="w-full h-64 sm:h-72 md:h-96 lg:h-3/4-screen object-cover"
          id={image}
          alt={title}
          mockData={mockData}
        />
      </div>
    ) : null

  const getTextElement = () => (
    <div
      className={`${image ? 'md:w-1/2' : 'm-auto w-full'} bg-${
        bgColor || ''
      } inline-flex items-center`}
      style={{
        backgroundImage: `url(${
          bgImage
            ? getMediaPath({
                mediaObject: bgImageObject,
                type: IMAGE,
                size: MEDIUM,
              })
            : ''
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 20% top',
        backgroundSize: 'cover',
      }}
    >
      <div className="max-w-5xl mx-auto text-center px-8 py-4">
        <h2
          className={`text-xl md:text-2xl lg:text-3xl text-${
            bgColor ? 'white' : 'black'
          } font-bold flex items-center mb-4`}
        >
          <span className="inline-block">{title}</span>
          {audio && (
            <AudioButton
              audioArray={[audioObject]}
              iconStyling="fill-current h-6 w-6 sm:w-8 sm:h-8 ml-2"
              hoverTooltip
            />
          )}
        </h2>
        <div
          className={`inline-block text-bold text-base text-left md:text-lg text-${
            bgColor ? 'white' : 'black'
          } max-w-md md:max-w-4xl mx-auto`}
        >
          <WysiwygBlock jsonString={textWithFormatting} />
        </div>
        {url && (
          <div className="mt-2 lg:mt-6 flex justify-left">
            <div className="rounded-full shadow">
              <a
                href={url}
                {...(url.includes(FIRSTVOICESLINK) ||
                url.startsWith(`/${sitename}`)
                  ? { target: '_self' }
                  : { target: '_blank' })}
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full md:text-lg ${
                  bgColor
                    ? `text-${bgColor} bg-white hover:font-bold hover:px-4`
                    : 'text-white bg-scarlet-800 hover:bg-scarlet-900'
                }`}
              >
                {urlLabel || 'More...'}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (format === FORMAT_RIGHT) {
    return (
      <section className="w-full" data-testid="WidgetTextPresentation">
        <div className="flex flex-col md:flex-row bg-gradient-to-b from-white to-charcoal-50">
          {getTextElement()}
          {getImageElement()}
        </div>
      </section>
    )
  }

  return (
    <section className="w-full" data-testid="WidgetTextPresentation">
      <div className="flex flex-col md:flex-row bg-gradient-to-b from-white to-charcoal-50">
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
    format: PropTypes.oneOf([FORMAT_LEFT, FORMAT_RIGHT, FORMAT_DEFAULT]),
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
