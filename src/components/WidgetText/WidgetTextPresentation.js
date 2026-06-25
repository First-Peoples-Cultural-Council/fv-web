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
      <div className="w-full lg:w-1/2 flex items-center rounded-lg overflow-hidden">
        <ImgFromId.Container
          id={image}
          alt={title}
          className="aspect-4/3 grow object-cover rounded-lg overflow-hidden backdrop-brightness-90"
        />
      </div>
    )
  }

  const bgColorClass = bgColor ? 'bg-jade-600 my-8' : 'bg-white'

  const getTextElement = () => (
    <div
      className={`${image ? 'lg:w-1/2' : 'mx-auto max-w-5xl'} content-center text-left`}
    >
      <div className="space-y-5 lg:space-y-8">
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
          className={`text-base xl:text-lg text-${bgColor ? 'white' : 'black'}`}
        >
          <WysiwygBlock htmlString={textWithFormatting} />
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
      <section
        className="w-full px-2 md:px-12"
        data-testid="WidgetTextPresentation"
      >
        <div
          className={`${bgColorClass} rounded-lg flex flex-col lg:flex-row p-6 md:p-12 gap-8`}
        >
          {getTextElement()}
          {getImageElement()}
        </div>
      </section>
    )
  }

  return (
    <section
      className="w-full px-2 md:px-12"
      data-testid="WidgetTextPresentation"
    >
      <div
        className={`${bgColorClass} rounded-lg flex flex-col lg:flex-row p-6 md:p-12 gap-8`}
      >
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
