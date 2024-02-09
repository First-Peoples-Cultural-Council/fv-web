import React from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from 'components/SectionTitle'
import FVKeyboards from 'assets/images/fv-keyboards-border.png'

function Keyboards() {
  const headerStyle = 'text-xl font-bold mb-1 mt-4'
  const paraStyle = 'my-6'
  return (
    <section className="pt-2 md:pt-4 lg:pt-8 bg-white" data-testid="Keyboards">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation
          title="FONTS & KEYBOARDS"
          accentColor="primary"
        />
        <div className="max-w-4xl mx-auto text-fv-charcoal space-y-4 py-8">
          <h2 className={headerStyle}>
            Why do you need to install a special keyboard and font?
          </h2>
          <p className={paraStyle}>
            Many First Nations languages require a number of characters that are
            not available on the standard English keyboard. To type these
            characters, you must install:
          </p>
          <ol className="list-outside list-decimal text-left px-16">
            <li>
              A virtual keyboard (a program which reorganizes the characters
              available on your physical keyboard)
            </li>{' '}
            <li>
              A good font that renders characters in Indigenous languages
              properly
            </li>
          </ol>
          <p className={paraStyle}>
            For some characters to appear properly at all, you must be using
            Windows XP or Mac 10.2 or higher. These operating systems support
            the Unicode standard, which is the system that allows all characters
            to be displayed properly and consistently across different devices
            and the internet. Earlier PC and Mac operating systems do not
            support Unicode technology sufficiently. Even if you are using a
            recent operating system, not all of your applications will
            necessarily be Unicode compliant.
          </p>
          <h2 className={headerStyle}>Keyboard safety and privacy </h2>
          <p className={paraStyle}>
            FirstVoices keyboards, including the mobile app and computer
            keyboards, do NOT view, track, or log any of your personal data
            (such as passwords, credit card info, etc) and are safe to use.
            However, many installers will prompt you about data security before
            installing any software that affects your keyboard.
          </p>
          <h2 className={headerStyle}>Installing the correct font</h2>
          <p className={paraStyle}>
            A font is a set of images that are used to design how a specific
            character or letter should show up on the screen. Some common fonts
            include Times New Roman, Arial, and Calibri.
          </p>
          <p className={paraStyle}>
            It is important to use a font that includes designs for all
            Indigenous special characters. If the font you are using does not
            include a design for a character that is typed, then it may look
            like you are typing a white box instead. FirstVoices uses the font
            BC Sans, which renders all characters used in BC languages.
          </p>
          <ol className="list-outside list-decimal text-left px-16">
            <li>
              Click here to download the{' '}
              <a
                href="https://www2.gov.bc.ca/gov/content/governments/services-for-government/policies-procedures/bc-visual-identity/bc-sans"
                className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
                target="_blank"
                rel="noreferrer noopener"
              >
                BC Sans
              </a>{' '}
              font
            </li>
            <li>Once the download is complete, unzip the font</li>
            <li>
              Open the unzipped font folder to see the &ldquo;Regular&ldquo;,
              &ldquo;Bold&ldquo;, &ldquo;Italic&ldquo;, and
              &ldquo;BoldItalic&ldquo; font files
            </li>
            <li>
              For PC computers with Windows 7, 8, 10
              <ul className="list-outside list-disc text-left px-16">
                <li>
                  Double click the font file and Font Viewer will open a preview
                  of the font
                </li>
                <li>
                  Right click on the font file and click &ldquo;Install&ldquo;
                </li>
                <li>
                  Repeat for each of the four font files in order to be able to
                  use regular, bold, italic, and bold+italic fonts
                </li>
              </ul>
              For Mac computers
              <ul className="list-outside list-disc text-left px-16">
                <li>
                  Double click the unzipped font file and Font Book will open a
                  preview of the font
                </li>
                <li>
                  Click &ldquo;Install Font&ldquo; at the bottom of the preview
                  window
                </li>
              </ul>
            </li>
            <li>
              You may need to restart your computer for the font to be available
              in all applications
            </li>
          </ol>
          <p className={paraStyle}>
            Use caution with custom fonts. If you are using a custom font to
            type special characters in your language, you may be unable to paste
            your text in new applications or type correctly on websites like
            Facebook. This means your font is not Unicode-compliant, and you may
            be at risk of losing your language data if the font is ever
            corrupted or lost. To see our fonts and keyboards page on the
            knowledge base, click{' '}
            <a
              href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1705752/Install+fonts+and+keyboards+for+Indigenous+languages"
              className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              here
            </a>
            {/*
             */}
            . For support, contact{' '}
            <a
              href="mailto:hello@firstvoices.com"
              className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              hello@firstvoices.com
            </a>
            {/*
             */}
            .
          </p>
          <h2 className={headerStyle}>
            Installing the correct keyboard on phone or tablet
          </h2>
          <div className="flex">
            <img
              src={FVKeyboards}
              alt="FirstVoices Keyboards logo"
              className="pr-10"
            />
            <p className={paraStyle}>
              If you are installing the FirstVoices keyboard for your language
              on mobile devices, such as a phone or tablet, you can download the
              FirstVoices Keyboards app on for{' '}
              <a
                href="https://itunes.apple.com/ca/app/firstvoices-keyboards/id1066651145?mt=8"
                className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
                target="_blank"
                rel="noreferrer noopener"
              >
                iPhone/iPad
              </a>{' '}
              or{' '}
              <a
                href="https://play.google.com/store/apps/details?id=com.firstvoices.keyboards"
                className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
                target="_blank"
                rel="noreferrer noopener"
              >
                Android.
              </a>{' '}
              Search for &ldquo;FirstVoices&ldquo; in the App Store for
              iPhone/iPad or in the Google Play Store for Android.
            </p>
          </div>
          <h2 className={headerStyle}>
            Installing the correct keyboard on a computer
          </h2>
          <p className={paraStyle}>
            Installing the FirstVoices keyboard for your language on a computer
            will be done through a keyboard software called Keyman. Go to{' '}
            <a
              href="https://keyman.com/"
              className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              keyman.com
            </a>{' '}
            and follow along with the instructions in the following videos. If
            you are not sure what language keyboard you are looking for, click{' '}
            <a
              href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/351043612/Keyboard+Installation+Guide"
              className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              here
            </a>{' '}
            to see a list of desktop keyboards.
          </p>
          <h2 className={headerStyle}>Install keyboards on Mac computer</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/hvRHyL3rBzg?si=YN4puM40b6EmXr9N"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <h2 className={headerStyle}>Install keyboards on a Windows PC</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/GG_VnxTf5ZQ?si=kgLzyI89rRLA7t36"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <h2 className={headerStyle}>Using keyboards on Chromebooks</h2>
          <p className={paraStyle}>
            If you are installing your keyboard on a Chromebook, Keyman
            keyboards are not currently compatible. However, if the model of
            your Chromebook has Tablet Mode, then you can use the FirstVoices
            Keyboard App from the Google Play store when the Chromebook is in
            tablet mode. And for Chromebooks that don&lsquo;t have tablet mode,
            a FirstVoices Chromebook extension is now available for some
            keyboards. If you would like your keyboard added to the Chromebook
            extension, email us at{' '}
            <a
              href="mailto:hello@firstvoices.com"
              className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              hello@firstvoices.com
            </a>
            {/*
             */}
            .
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/TTqvm-KO6BY?si=5bCxlDhEAjdyjiFN"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>

          <p className={paraStyle}>
            For a more detailed installation guide or help with a specific
            issue, check out the following pages:
            <ul className="list-outside list-disc text-left px-16">
              <a
                href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/351043612"
                className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
                target="_blank"
                rel="noreferrer noopener"
              >
                <li>Keyboard Installation Guide</li>
              </a>
              <a
                href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/351502346"
                className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
                target="_blank"
                rel="noreferrer noopener"
              >
                <li>Keyboards Support</li>
              </a>
            </ul>{' '}
            If you need extra help installing a keyboard, please email us at{' '}
            <a
              href="mailto:hello@firstvoices.com"
              className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              hello@firstvoices.com
            </a>{' '}
            .
          </p>
          <h2 className={headerStyle}>Finding your language keyboard</h2>
          <p className={paraStyle}>
            If you are interested in the keyboard for a particular FirstVoices
            language site, please visit{' '}
            <a
              href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/424312843/Find+FirstVoices+keyboards+for+your+language"
              className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              this
            </a>{' '}
            page in our FirstVoices knowledge base.
          </p>
          <p className={paraStyle}>
            {' '}
            List of keyboards corresponding to FirstVoices language sites
          </p>
          <p className={paraStyle}>
            {' '}
            If you are looking for another keyboard, you can go directly to{' '}
            <a
              href="https://keyman.com/"
              className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              Keyman.com
            </a>{' '}
            and search for the name of your language.
          </p>
          <p className={paraStyle}>
            Can&lsquo;t find the right keyboard for your language? If your
            community doesn&lsquo;t have an existing FirstVoices Keyman keyboard
            that suits your unique orthography, the FirstVoices team can develop
            one for you! Click here to read about how to{' '}
            <a
              href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1704409"
              className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              Request a new keyboard
            </a>{' '}
            or{' '}
            <a
              href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1704231"
              className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              Contribute to FirstVoices keyboards
            </a>
            {/*
             */}
            .
          </p>
          <h2 className={headerStyle}>FirstVoices Apps</h2>
          <p className={paraStyle}>
            The wealth of language data uploaded by Indigenous communities onto
            their FirstVoices language sites can now also be accessed through{' '}
            <Link
              to="/apps"
              className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
            >
              mobile apps
            </Link>
            {/*
             */}
            . The app pulls content directly from entries on FirstVoices and
            functions with offline capabilities. The apps are updated throughout
            the year in order to ensure that the latest content that has been
            added to a language site also appears on the app.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Keyboards
