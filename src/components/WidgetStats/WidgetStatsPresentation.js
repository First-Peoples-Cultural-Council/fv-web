import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import SectionTitle from 'components/SectionTitle'

function WidgetStatsPresentation({ data }) {
  const iconStyling =
    'fill-current text-ochre-500 h-10 md:h-12 lg:h-14 w-auto mx-auto'
  const totalStyling = 'text-4xl md:text-5xl lg:text-6xl font-medium'
  const labelStyling = 'text-base font-thin'
  return (
    <section className="bg-blumine-800 pt-3 md:pt-6">
      <div className="mx-5 lg:mx-10 mb-2 md:mb-6 lg:mb-8 xl:mb-12">
        <SectionTitle.Presentation
          title={data?.header}
          bgColor="blumine-800"
          accentColor="white"
        />
      </div>
      <div className="w-full bg-linear-to-b from-blumine-800 to-blumine-500 pb-8">
        <div className="max-w-6xl grid grid-cols-4 mx-auto text-white text-center">
          <div className="flex-col justify-center mx-auto col-span-1 space-y-5">
            <div>{getIcon('word', iconStyling)}</div>
            <div className={totalStyling}>{data?.words || '-'}</div>
            <div className={labelStyling}>WORDS</div>
          </div>
          <div className="flex-col justify-center mx-auto col-span-1 space-y-5">
            <div>{getIcon('phrase', iconStyling)}</div>
            <div className={totalStyling}>{data?.phrases || '-'}</div>
            <div className={labelStyling}>PHRASES</div>
          </div>
          <div className="flex-col justify-center mx-auto col-span-1 space-y-5">
            <div>{getIcon('song', iconStyling)}</div>
            <div className={totalStyling}>{data?.songs || '-'}</div>
            <div className={labelStyling}>SONGS</div>
          </div>
          <div className="flex-col justify-center mx-auto col-span-1 space-y-5">
            <div>{getIcon('story', iconStyling)}</div>
            <div className={totalStyling}>{data?.stories || '-'}</div>
            <div className={labelStyling}>STORIES</div>
          </div>
        </div>
      </div>
    </section>
  )
}
// PROPTYPES
const { object } = PropTypes
WidgetStatsPresentation.propTypes = {
  data: object,
}

export default WidgetStatsPresentation
