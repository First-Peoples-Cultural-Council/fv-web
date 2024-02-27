import React from 'react'
import SectionTitle from 'components/SectionTitle'

function AboutFV() {
  const headerStyle = 'text-xl font-bold mb-1 mt-4'
  const paraStyle = 'mb-2'
  return (
    <section
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="AboutFirstVoices"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation
          title="ABOUT FIRSTVOICES"
          accentColor="primary"
        />
        <div className="max-w-4xl mx-auto text-fv-charcoal space-y-4 py-8">
          <p className={paraStyle}>
            FirstVoices.com is an online space for communities to share and
            promote their language, oral culture and linguistic history.
            Communities create secure, interactive language sites online by
            uploading audio recordings, words, phrases, songs and stories to be
            shared with others. Operating since 2003, FirstVoices is an
            initiative of the First Peoples&lsquo; Cultural Council.
          </p>
          <h2 className={headerStyle}>Community Sites</h2>
          <p className={paraStyle}>
            Member groups represent over 50 Indigenous nations, bands and other
            non-profit organizations. The content they create, called
            &ldquo;language sites&ldquo;, are unique and promote linguistic
            diversity of Indigenous language and culture. Importantly, members
            retain ownership of content created by them for use on their
            community site. The goal of FirstVoices.com is to help Indigenous
            languages succeed with state-of-the-art hardware, software, and
            technical support for their communities.
          </p>
          <h2 className={headerStyle}>Public and private content</h2>
          <p className={paraStyle}>
            While most language sites on FirstVoices are visible to the public,
            members can choose to create content that can be accessed only
            through a secure login. Examples of this type of content include
            stories, sacred songs, prayers, ceremonial regalia, or dances seen
            only in community ceremonies.
          </p>
          <h2 className={headerStyle}>
            Elders and youth team up for language preservation
          </h2>
          <p className={paraStyle}>
            The FirstVoices team works with experienced language educators, band
            councils and language communities to plan revitalization programs.
            Using digital recording, many of these Elders&lsquo; voices are
            preserved and accessed online by computer, tablet, or mobile phone.
            Younger, tech-savvy community members become engaged through
            training in professional audio recording and archiving techniques.
            We can also help with physical archives, such as audio cassettes,
            photos, and written sources which can be digitally archived through
            Federal and Provincial grant programs.
          </p>
          <h2 className={headerStyle}>Projects</h2>
          <ul className="list-outside list-disc text-left px-16">
            <li>
              FirstVoices website – Web-based platform where communities can
              create, edit, host, and maintain content on their own interactive
              &ldquo;language site,&ldquo; featuring a suite of online tools
              such as dictionary, custom search, games, Kids Area, and more.
            </li>
            <li>
              FirstVoices apps - Interactive dictionary apps for Android and
              iOS, which pull content from FirstVoices language sites. The apps
              contain text, audio, image and video content and are available as
              free downloads from the iTunes and Google Play stores.
            </li>
            <li>
              FirstVoices keyboards - Keyboard software designed in partnership
              between language communities and the Keyman keyboard development
              team, downloadable on Mac and PC computers.
            </li>
            <li>
              FirstVoices keyboard app - Keyboard software for all FirstVoices
              keyboards within one easy to use app. Once the FirstVoices
              keyboard app is installed on a mobile device, any one of the 100+
              custom keyboards can be activated. Users then are able to select
              their keyboard(s) of choice within their email, social media, word
              processing or other apps.
            </li>
          </ul>
          <h2 className={headerStyle}>Contact us</h2>
          <p className={paraStyle}>
            We have resources and people to help you start your own language
            site, or connect with one of our existing language sites. Contact{' '}
            <a href="mailto:hello@firstvoices.com" className="inline-url">
              hello@firstvoices.com
            </a>{' '}
            for more information.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutFV
