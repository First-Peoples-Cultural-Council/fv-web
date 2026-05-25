import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

// FPCC
import AudioButton from 'components/AudioButton'
import WysiwygBlock from 'components/WysiwygBlock'
import ImgFromId from 'components/ImgFromId'
import { useAudio } from 'common/dataHooks/useAudio'
import { isUUID } from 'common/utils/stringHelpers'
import {
  FIRSTVOICESLINK,
  FORMAT_LEFT,
  FORMAT_RIGHT,
  FORMAT_DEFAULT,
} from 'common/constants'

function WidgetTextPresentation({ widgetData }) {
  const { sitename } = useParams()
  const { title, textWithFormatting, image, url, urlLabel, audio, bgColor } =
    widgetData.settings

  const format = widgetData?.format || FORMAT_LEFT
  const audioQueryResponse = useAudio({ id: audio })
  const audioObject = audioQueryResponse?.data

  const getImageElement = () => {
    if (!isUUID(image)) return ''
    return (
      <div className="md:w-1/2 overflow-hidden inline-flex items-center">
        <ImgFromId.Container
          id={image}
          alt={title}
          className="w-full h-64 sm:h-72 md:h-96 lg:h-[70vh] object-cover"
        />
      </div>
    )
  }

  const bgColorClass = bgColor ? `bg-${bgColor}` : 'bg-white'

  const getTextElement = () => (
    <div
      className={`${image ? 'md:w-1/2' : 'mx-auto max-w-5xl'} ${bgColorClass} content-center text-left`}
    >
      <div className="px-8 lg:px-14 py-4 lg:py-10 space-y-5 lg:space-y-8">
        <div className="space-y-2 lg:space-y-4">
          <h2
            className={`text-xl md:text-2xl lg:text-3xl ${
              bgColor ? 'text-white' : 'text-black'
            } font-bold flex items-center space-x-2`}
          >
            <span>{title}</span>
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
            className={`text-base md:text-lg text-${bgColor ? 'white' : 'black'}`}
          >
            <WysiwygBlock htmlString={textWithFormatting} />
          </div>
        </div>
        {url && (
          <div className="flex justify-start">
            <a
              href={url}
              {...(url.startsWith('/') ||
              url.includes(FIRSTVOICESLINK) ||
              url.startsWith(`/${sitename}`)
                ? { target: '_self' }
                : { target: '_blank', rel: 'noopener noreferrer' })}
              className={`btn-lg ${bgColor ? 'btn-tertiary' : 'btn-primary'}`}
            >
              {urlLabel || 'More...'}
            </a>
          </div>
        )}
      </div>
    </div>
  )

  if (format === FORMAT_RIGHT) {
    return (
      <section className="w-full" data-testid="WidgetTextPresentation">
        <div className="flex flex-col md:flex-row">
          {getTextElement()}
          {getImageElement()}
        </div>
      </section>
    )
  }

  return (
    <section className="w-full" data-testid="WidgetTextPresentation">
      <div className="flex flex-col md:flex-row">
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
