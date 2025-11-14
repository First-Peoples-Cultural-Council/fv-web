import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import AudioButton from 'components/AudioButton'
import WysiwygBlock from 'components/WysiwygBlock'
import ImgFromId from 'components/ImgFromId'
import { useImage } from 'common/dataHooks/useImages'
import { useAudio } from 'common/dataHooks/useAudio'
import { isUUID } from 'common/utils/stringHelpers'
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

  const imageQueryResponse = useImage({ id: bgImage })
  const bgImageObject = imageQueryResponse?.data

  const audioQueryResponse = useAudio({ id: audio })
  const audioObject = audioQueryResponse?.data
  const imgStyling = 'w-full h-64 sm:h-72 md:h-96 lg:h-[75vh] object-cover'

  const getImageElement = () => {
    if (!isUUID(image) && !mockData) return ''
    return (
      <div className="md:w-1/2 overflow-hidden inline-flex items-center">
        {mockData ? (
          <img src={image} alt={title} className={imgStyling} />
        ) : (
          <ImgFromId.Container id={image} alt={title} className={imgStyling} />
        )}
      </div>
    )
  }

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
          className={`text-xl md:text-2xl lg:text-3xl ${
            bgColor ? 'text-white' : 'text-black'
          } font-bold flex items-center mb-4 space-x-2`}
        >
          <span className="inline-block">{title}</span>
          {audio && (
            <AudioButton
              audioArray={[audioObject]}
              styling={
                bgColor
                  ? 'btn-lg-icon bg-transparent text-white hover:backdrop-brightness-75'
                  : 'btn-tertiary btn-lg-icon'
              }
            />
          )}
        </h2>
        <div
          className={`inline-block text-bold text-base text-left md:text-lg text-${
            bgColor ? 'white' : 'black'
          } max-w-md md:max-w-4xl mx-auto`}
        >
          <WysiwygBlock htmlString={textWithFormatting} />
        </div>
        {url && (
          <div className="mt-2 lg:mt-6 flex justify-left">
            <div className="rounded-full shadow-sm">
              <a
                href={url}
                {...(url.startsWith('/') ||
                url.includes(FIRSTVOICESLINK) ||
                url.startsWith(`/${sitename}`)
                  ? { target: '_self' }
                  : { target: '_blank', rel: 'noopener noreferrer' })}
                className={`w-full flex items-center justify-center px-5 py-2 border border-transparent text-base rounded-full md:text-lg btn-lg ${
                  bgColor
                    ? 'btn-tertiary'
                    : 'btn-primary bg-scarlet-800 hover:bg-scarlet-900'
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
        <div className="flex flex-col md:flex-row bg-linear-to-b from-white to-charcoal-50">
          {getTextElement()}
          {getImageElement()}
        </div>
      </section>
    )
  }

  return (
    <section className="w-full" data-testid="WidgetTextPresentation">
      <div className="flex flex-col md:flex-row bg-linear-to-b from-white to-charcoal-50">
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
