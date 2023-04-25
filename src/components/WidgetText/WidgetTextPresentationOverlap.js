import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import { getMediaUrl } from 'common/urlHelpers'
import AudioButton from 'components/AudioButton'
import WysiwygBlock from 'components/WysiwygBlock'

function WidgetTextPresentationOverlap({ widgetData }) {
  const { title, textWithFormatting, image, url, urlLabel, audio } =
    widgetData?.settings
  const light = false
  const accentColor = light ? 'secondary' : 'white'
  const boxColor = light ? 'white' : 'secondary'
  const textColor = light ? 'fv-charcoal' : 'white'
  const bgColor = light ? 'gray-200' : 'white'
  const bgColor2 = light ? 'gray-200' : 'gray-50'

  return (
    <div className={`relative py-6 bg-${bgColor2}`}>
      <div
        className={`hidden absolute top-0 inset-x-0 h-1/2 bg-${bgColor} lg:block`}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto bg-secondary lg:bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-5 lg:py-16 lg:bg-transparent">
            <div
              className={`absolute inset-x-0 h-1/2 bg-${bgColor}  lg:hidden`}
              aria-hidden="true"
            />
            <div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                <img
                  className="object-cover object-center rounded-3xl shadow-2xl"
                  src={getMediaUrl({
                    id: image,
                    type: 'image',
                    viewName: 'Medium',
                  })}
                  alt={`${image?.title}`}
                />
              </div>
            </div>
          </div>

          <div
            className={`relative bg-${boxColor} lg:col-start-4 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center py-4`}
          >
            <div className="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
              <h2
                className={`text-3xl font-extrabold text-${accentColor}`}
                id="join-heading"
              >
                {title}
                {audio && (
                  <AudioButton
                    audioArray={[audio]}
                    iconStyling="fill-current h-6 w-6 sm:w-8 sm:h-8 ml-2"
                    hoverTooltip
                  />
                )}
              </h2>
              <div className={`w-full text-lg text-${textColor}`}>
                <WysiwygBlock jsonString={textWithFormatting} />
              </div>
              {url && (
                <Link
                  className={`block w-full py-3 px-5 text-center bg-${accentColor} border border-transparent rounded-lg shadow-md text-base font-medium text-${boxColor} hover:opacity-75 sm:inline-block sm:w-auto`}
                  to={url}
                >
                  {urlLabel || 'More...'}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { string, shape } = PropTypes
WidgetTextPresentationOverlap.propTypes = {
  widgetData: shape({
    format: PropTypes.oneOf(['right', 'left', 'full']),
    settings: shape({
      title: string.isRequired,
      textWithFormatting: string.isRequired,
      url: string,
      urlLabel: string,
      image: string,
    }),
  }),
}

export default WidgetTextPresentationOverlap
