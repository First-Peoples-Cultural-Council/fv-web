import React from 'react'
import PropTypes from 'prop-types'

import Widget from 'components/Widget'

function SiteKeyboardsPresentation({ title, widgets }) {
  const headerStyle = 'border-b border-gray-500 font-bold mb-5 pb-5 text-2xl text-primary'

  return (
    <div id="SiteKeyboardsPresentation" className="justify-center">
      {widgets && (
        <div className="max-w-screen-xl px-4 lg:px-24 mx-auto">
          {widgets.map((widget) => (
            <Widget.Container key={widget?.id} data={widget} />
          ))}
        </div>
      )}
      <div>
        <section className="max-w-screen-xl py-2 px-4 my-5 lg:px-24 mx-auto">
          <h2 className={headerStyle}>{`${title} keyboards let you type in your language!`}</h2>
          <p className="pb-8">
            {`Many languages have alphabets with letters that are not available on the standard English keyboard. To type these letters, you must install a keyboard that will render characters in your Indigenous language. When the ${title} keyboard is installed on a computer, mobile phone or tablet, you will be able to type using your language's alphabet in emails, text messages, social media, and any other application.`}
          </p>
          <h2 className={headerStyle}>Installation Instructions for Mac computers</h2>
          <p>
            <iframe
              className="w-full"
              height="500"
              width="700"
              src="https://www.youtube-nocookie.com/embed/hvRHyL3rBzg"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </p>
          <h2 className={headerStyle}>Installation Instructions for PC computers</h2>
          <p>
            <iframe
              className="w-full"
              height="500"
              width="700"
              src="https://www.youtube-nocookie.com/embed/GG_VnxTf5ZQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </p>
          <h2 className={headerStyle}>iPhone / iPad / Android Mobile Device</h2>
          <p>
            If you are installing the FirstVoices keyboard for your language on mobile devices, such as a phone or
            tablet, you can download the FirstVoices Keyboards app. Search for &quot;FirstVoices&quot; in the App Store
            for iPhone/iPad or in the Google Play Store for Android.
          </p>
          <h2 className={headerStyle}>Support</h2>
          <p>
            Having trouble installing a keyboard onto your phone, tablet, or computer? Let us know{' '}
            <a
              className="underline"
              href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6"
              target="_blank"
            >
              via our Help Desk!
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
// PROPTYPES
const { array, string } = PropTypes
SiteKeyboardsPresentation.propTypes = {
  title: string,
  widgets: array,
}

export default SiteKeyboardsPresentation
