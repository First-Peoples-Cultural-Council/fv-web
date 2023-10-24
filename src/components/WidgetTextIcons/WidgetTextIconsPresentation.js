import React from 'react'
import PropTypes from 'prop-types'
import 'draft-js/dist/Draft.css'
import WysiwygBlock from 'components/WysiwygBlock'

// FPCC
import SectionTitle from 'components/SectionTitle'
import getIcon from 'common/utils/getIcon'
import ImgFromId from 'components/ImgFromId'
import Elders from 'assets/images/elders-landing.png'

function WidgetTextIconsPresentation({ widgetData }) {
  const { title, textWithFormatting, image, mockData } = widgetData.settings
  const imageStyling =
    'hidden lg:inline object-cover object-center overflow-hidden md:w-7/12 pt-4 md:rounded-r-[78px]'
  const getImage = () =>
    image ? (
      <ImgFromId.Container
        className={imageStyling}
        id={image}
        alt={title}
        mockData={mockData}
      />
    ) : (
      <img className={imageStyling} src={Elders} alt={title} />
    )

  return (
    <section
      id="WidgetTextIconsPresentation"
      className="bg-white pt-3 md:pt-6 pb-8 md:pb-14"
    >
      <div className="p-4">
        <SectionTitle.Presentation title={title} />
      </div>
      <div className="md:flex md:flex-row-reverse">
        <div className="px-8 lg:pt-12 lg:pb-8 text-xs md:text-base">
          <div className="wysiwyg">
            <WysiwygBlock jsonString={textWithFormatting} />
          </div>

          <div className="hidden md:flex justify-between text-sm font-bold">
            <div className="w-1/4 flex-col items-center">
              {getIcon('Device', 'fill-primary w-full')}
              <p className="text-center">Easy to use on any device</p>
            </div>
            <div className="w-1/4 flex-col items-center">
              {getIcon('Community', 'fill-primary w-full')}
              <p className="text-center">Community-driven language content</p>
            </div>
            <div className="w-1/4 flex-col items-center">
              {getIcon('Generations', 'fill-primary w-full')}
              <p className="text-center">Developed for future generations</p>
            </div>
          </div>
        </div>
        {getImage()}
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
