import React from 'react'
import PropTypes from 'prop-types'
import WysiwygBlock from 'components/WysiwygBlock'

// FPCC
import SectionTitle from 'components/SectionTitle'
import getIcon from 'common/utils/getIcon'
import ImgFromId from 'components/ImgFromId'

function WidgetTextIconsPresentation({ widgetData }) {
  const { title, textWithFormatting, image, mockData } = widgetData.settings
  const imgStyling =
    'hidden lg:inline object-cover object-center overflow-hidden md:w-7/12 pt-4 md:rounded-r-[78px]'

  return (
    <section
      id="WidgetTextIconsPresentation"
      className="bg-white pt-3 md:pt-6 pb-8 md:pb-14"
    >
      <div className="p-4">
        <SectionTitle.Presentation title={title} />
      </div>
      <div className="md:flex md:flex-row-reverse">
        <div className="px-8 lg:pt-12 lg:pb-8 text-base md:text-lg">
          <div className="wysiwyg">
            <WysiwygBlock htmlString={textWithFormatting} />
          </div>

          <div className="hidden md:flex justify-between text-sm font-bold">
            <div className="w-1/4 flex-col items-center">
              {getIcon('Device', 'fill-blumine-800 w-full')}
              <p className="text-center">Easy to use on any device</p>
            </div>
            <div className="w-1/4 flex-col items-center">
              {getIcon('Community', 'fill-blumine-800 w-full')}
              <p className="text-center">Community-driven language content</p>
            </div>
            <div className="w-1/4 flex-col items-center">
              {getIcon('Generations', 'fill-blumine-800 w-full')}
              <p className="text-center">Developed for future generations</p>
            </div>
          </div>
        </div>
        {mockData ? (
          <img src={image} alt={title} className={imgStyling} />
        ) : (
          <ImgFromId.Container id={image} alt={title} className={imgStyling} />
        )}
      </div>
    </section>
  )
}

// PROPTYPES
const { object } = PropTypes

WidgetTextIconsPresentation.propTypes = {
  widgetData: object,
}

export default WidgetTextIconsPresentation
