import React from 'react'

// FPCC
import languages from 'assets/images/languages-background.png'
import getIcon from 'common/utils/getIcon'

function LandingQuotes() {
  const quotes = [
    {
      id: '001',
      quote:
        "This past year has proven to be a year of eternal gratitude. We have been able to add to the archive's invaluable pieces that may have been lost if not for FirstVoices.",
      quoteBy: '- Gitanyow Language Team Member',
    },
    {
      id: '002',
      quote:
        'FirstVoices helps us to support the legacy of those that paved the way for our language. We are able to share what they left us with so many more learners and teachers.',
      quoteBy: '- c̓išaaʔatḥ Language Team Member',
    },
    {
      id: '003',
      quote:
        "To work with FirstVoices has been a blessing. ... Language is so important, it's at the fundamental core of our existence, of our being. It's who we are.",
      quoteBy: '- Sḵwx̱wú7mesh Language Team Member',
    },
  ]
  return (
    <section
      id="LandingQuotes"
      className="bg-ochre-600 flex flex-col md:flex-row justify-evenly items-center pb-16 md:pb-0"
      style={{
        backgroundImage: `url(${languages}`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {quotes.map((quote) => (
        <div
          key={quote?.id}
          className="relative w-4/5 md:w-[30%] h-80 mt-24 md:my-20 bg-white rounded-t-xl rounded-br-xl flex flex-col justify-center items-center"
        >
          <div className="absolute -top-16 h-28 w-28 bg-blumine-800 rounded-full flex justify-center items-center">
            {getIcon('Quotation', 'fill-white h-12 w-12')}
          </div>
          <q className="text-center text-sm lg:text-lg leading-5 w-3/4 pt-32">
            {quote?.quote}
          </q>
          <p className="text-blumine-800 text-base lg:text-lg font-bold text-center leading-5 w-2/3 pb-20 pt-4">
            {quote?.quoteBy}
          </p>
          <div className="absolute -bottom-12 left-0 w-0 h-0 border-50 border-l-white border-y-transparent border-r-transparent"></div>
        </div>
      ))}
    </section>
  )
}

export default LandingQuotes
