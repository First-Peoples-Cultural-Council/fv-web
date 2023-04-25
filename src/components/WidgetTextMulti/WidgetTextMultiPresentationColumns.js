import React from 'react'
import PropTypes from 'prop-types'
import { FIRSTVOICESLINK } from 'common/constants'

// FPCC
import WysiwygBlock from 'components/WysiwygBlock'
import { getMediaUrl } from 'common/utils/urlHelpers'

function WidgetTextMultiPresentationColumns({ textWidgets }) {
  const getContent = (widget) => {
    const { title, textWithFormatting, image, url, urlLabel } = widget?.settings
    const accentColor = widget?.color || 'primary'

    return (
      <div
        key={widget?.uid}
        className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="shrink-0">
          <img
            className="h-72 w-full object-cover object-center"
            src={getMediaUrl({ id: image, type: 'image', viewName: 'Medium' })}
            // alt={image?.title}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between p-6">
          <div className="flex-1">
            <div className="block">
              <p
                className={`text-xl font-bold text-center h-14 text-${accentColor}`}
              >
                {title}
              </p>
              <div className="mt-3 text-fv-charcoal">
                <WysiwygBlock jsonString={textWithFormatting} />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center mx-auto">
            <div className="sm:flex justify-center">
              <div className="rounded-lg shadow">
                {url && (
                  <a
                    href={url}
                    {...(url.includes(FIRSTVOICESLINK)
                      ? { target: '_self' }
                      : { target: '_blank' })}
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-primary hover:bg-primary-dark font-medium px-5 py-2 rounded-lg shadow-sm text-base text-center text-white"
                  >
                    <span>{urlLabel || 'Learn More'}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      className="w-full"
      data-testid="WidgetTextMultiPresentationColumns"
    >
      <div className="relative bg-gradient-to-b from-gray-50 to-gray-300 px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="absolute inset-0">
          <div className="bg-gray-50 h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          {textWidgets?.length > 0 && (
            <div className="max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {getContent({ ...textWidgets?.[0], color: 'secondary' })}
              {getContent({ ...textWidgets?.[1], color: 'tertiaryA' })}
              {getContent({ ...textWidgets?.[2], color: 'tertiaryB' })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// PROPTYPES
const { array } = PropTypes
WidgetTextMultiPresentationColumns.propTypes = {
  textWidgets: array,
}

export default WidgetTextMultiPresentationColumns
