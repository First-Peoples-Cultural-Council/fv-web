import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import { getMediaPath } from 'common/utils/mediaHelpers'
import { useImageObject } from 'common/dataHooks/useMedia'
import { IMAGE, MEDIUM } from 'common/constants'

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

  const bgImageObject = useImageObject({
    id: backgroundImage,
  })

  const makeQuote = (qoute, quoteBy) => (
    <div className="relative w-4/5 md:w-[30%] h-80 mt-24 md:my-28 bg-white rounded-t-xl rounded-br-xl flex flex-col justify-center items-center">
      <div className="absolute -top-16 h-32 w-32 bg-primary rounded-full flex justify-center items-center">
        {getIcon('Quotation', 'fill-white h-16 w-16')}
      </div>
      <q className="text-center leading-5 w-3/4 pt-32">{qoute}</q>
      <p className="text-primary font-bold text-center leading-5 w-1/2 pb-20 pt-4">
        {quoteBy}
      </p>
      <div className="absolute -bottom-12 left-0 w-0 h-0 border-[50px] border-l-white border-y-transparent border-r-transparent"></div>
    </div>
  )
  return (
    <section
      id="WidgetQuotesPresentation"
      className="bg-phrase flex flex-col md:flex-row justify-evenly items-center pb-16 md:pb-0"
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
