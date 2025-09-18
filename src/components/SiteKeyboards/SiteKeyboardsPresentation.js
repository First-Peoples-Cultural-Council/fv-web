import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Widget from 'components/Widget'
import SiteDocHead from 'components/SiteDocHead'

function SiteKeyboardsPresentation({ title, widgets }) {
  return (
    <div
      data-testid="SiteKeyboardsPresentation"
      className="justify-center max-w-5xl px-4 pb-4 lg:px-0 lg:pb-10 mx-auto"
    >
      <SiteDocHead titleArray={['Keyboards']} />
      {widgets?.map((widget) => (
        <div key={widget?.id} className="flex lg:my-4">
          <Widget.Container data={widget} />
        </div>
      ))}
      <div>
        <section className="wysiwyg">
          <h2>{`${title} keyboards let you type in your language!`}</h2>
          <p>
            Many languages have alphabets with letters that are not available on
            the standard English keyboard. To type these letters, you must
            install a keyboard that will render characters in your Indigenous
            language. When the {title} keyboard is installed on a computer,
            mobile phone or tablet, you will be able to type using your
            language&apos;s alphabet in emails, text messages, social media, and
            any other application.
          </p>
          <h2>Installation Instructions for Mac computers</h2>
          <p>
            <iframe
              className="w-full"
              height="500"
              width="700"
              src="https://www.youtube-nocookie.com/embed/hvRHyL3rBzg"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </p>
          <h2>Installation Instructions for PC computers</h2>
          <p>
            <iframe
              className="w-full"
              height="500"
              width="700"
              src="https://www.youtube-nocookie.com/embed/GG_VnxTf5ZQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </p>
          <h2>iPhone / iPad / Android Mobile Device</h2>
          <p>
            If you are installing the FirstVoices keyboard for your language on
            mobile devices, such as a phone or tablet, you can download the
            FirstVoices Keyboards app. Search for &quot;FirstVoices&quot; in the
            App Store for iPhone/iPad or in the Google Play Store for Android.
          </p>
          <h2>Support</h2>
          <p>
            Having trouble installing a keyboard onto your phone, tablet, or
            computer? Let us know{' '}
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
