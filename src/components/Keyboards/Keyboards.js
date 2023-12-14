import React from 'react'
import SectionTitle from 'components/SectionTitle'

function Keyboards() {
  const headerStyle = 'text-xl font-bold mb-1 mt-4'
  const paraStyle = 'mb-2'
  return (
    <section className="pt-2 md:pt-4 lg:pt-8 bg-white" data-testid="Keyboards">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation
          title="Fonts & Keyboards"
          accentColor="primary"
        />
        <div className="max-w-4xl mx-auto text-fv-charcoal space-y-4 py-8">
          <h2 className={headerStyle}>
            Why do you need to install a special keyboard and font?
          </h2>
          <p className={paraStyle}>
            Many First Nations languages require a number of characters that are
            not available on the standard English keyboard. To type these
            characters, you must install: A virtual keyboard (a program which
            reorganizes the characters available on your physical keyboard) A
            good font that renders characters in Indigenous languages properly
            For some characters to appear properly at all, you must be using
            Windows XP or Mac 10.2 or higher. These operating systems support
            the Unicode standard, which is the system that allows all characters
            to be displayed properly and consistently across different devices
            and the internet. Earlier PC and Mac operating systems do not
            support Unicode technology sufficiently. Even if you are using a
            recent operating system, not all of your applications will
            necessarily be Unicode compliant.
          </p>
          <p className={paraStyle}>
            Keyboard safety and privacy FirstVoices keyboards, including the
            mobile app and computer keyboards, do NOT view, track, or log any of
            your personal data (such as passwords, credit card info, etc) and
            are safe to use. However, many installers will prompt you about data
            security before installing any software that affects your keyboard.
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
          <ol>
            <li>
              Click here to download the{' '}
              <a
                href="mailto:hello@firstvoices.com"
                className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
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
              <ul>
                <li>
                  Double click the font file and Font Viewer will open a preview
                  of the font
                </li>
                <li>Right click on the font file and click “Install”</li>
                <li>
                  Repeat for each of the four font files in order to be able to
                  use regular, bold, italic, and bold+italic fonts
                </li>
              </ul>
              For Mac computers
              <ul>
                <li>
                  Double click the unzipped font file and Font Book will open a
                  preview of the font
                </li>
                <li>
                  Click “Install Font” at the bottom of the preview window
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
            corrupted or lost. For support, contact hello@firstvoices.com.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Keyboards
