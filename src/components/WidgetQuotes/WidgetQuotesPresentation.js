import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { useMediaObject } from 'common/dataHooks/useMedia'
import { TYPE_IMAGE, IMAGE, MEDIUM } from 'common/constants'

function WidgetQuotesPresentation({ widgetData }) {
  const {
    backgroundImage,
    quote1,
    quote1By,
    quote2,
    quote2By,
    quote3,
    quote3By,
  } = widgetData.settings

  const mediaQueryResponse = useMediaObject({
    id: backgroundImage,
    mediaType: TYPE_IMAGE,
  })
  const bgImageObject = mediaQueryResponse?.data

  const makeQuote = (quote, quoteBy) => (
    <div className="relative w-4/5 md:w-[30%] h-80 mt-24 md:my-20 bg-white rounded-t-xl rounded-br-xl flex flex-col justify-center items-center">
      <div className="absolute -top-16 h-28 w-28 bg-blumine-800 rounded-full flex justify-center items-center">
        {getIcon('Quotation', 'fill-white h-12 w-12')}
      </div>
      <q className="text-center text-sm lg:text-lg leading-5 w-3/4 pt-32">
        {quote}
      </q>
      <p className="text-blumine-800 text-base lg:text-lg font-bold text-center leading-5 w-2/3 pb-20 pt-4">
        {quoteBy}
      </p>
      <div className="absolute -bottom-12 left-0 w-0 h-0 border-[50px] border-l-white border-y-transparent border-r-transparent"></div>
    </div>
  )
  return (
    <section
      id="WidgetQuotesPresentation"
      className="bg-ochre-600 flex flex-col md:flex-row justify-evenly items-center pb-16 md:pb-0"
      style={{
        backgroundImage: `url(${
          backgroundImage &&
          getMediaPath({
            mediaObject: bgImageObject,
            type: IMAGE,
            size: MEDIUM,
          })
        }`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {makeQuote(quote1, quote1By)}
      {makeQuote(quote2, quote2By)}
      {makeQuote(quote3, quote3By)}
    </section>
  )
}

// PROPTYPES
const { object } = PropTypes

WidgetQuotesPresentation.propTypes = {
  widgetData: object,
}

export default WidgetQuotesPresentation
