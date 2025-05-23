// FPCC
import Elders from 'assets/images/elders-landing.png'
import aboutImage from 'assets/images/landing-about.png'
import appsImage from 'assets/images/landing-apps.png'
import bgImage from 'assets/images/landing-about-bg.png'
import languages from 'assets/images/languages-background.png'
import {
  WIDGET_TEXT,
  WIDGET_TEXTICONS,
  WIDGET_QUOTES,
  FIRSTVOICESLINK,
  FORMAT_RIGHT,
} from 'src/common/constants'

function LandingPageData() {
  const whyData = {
    id: 1,
    type: WIDGET_TEXTICONS,
    settings: {
      mockData: true,
      image: Elders,
      title: 'WHY FIRSTVOICES?',
      textWithFormatting:
        '<p>FirstVoices is an internationally recognized online platform for Indigenous communities to share and promote their languages, oral cultures and linguistic histories.</p><p>FirstVoices provides state-of-the-art technologies, training and technical support to community language champions.</p><p>Language champions collaborate with Indigenous Elders, youth and speakers to create and share language resources like words, phrases, songs and stories.</p>',
    },
  }

  const aboutData = {
    id: 2,
    type: WIDGET_TEXT,
    settings: {
      mockData: true,
      bgColor: 'jade-500',
      bgImage,
      image: aboutImage,
      title: 'ABOUT FIRSTVOICES',
      url: `https://${FIRSTVOICESLINK}/about`,
      urlLabel: 'Learn more',
      textWithFormatting:
        '<p>On FirstVoices, interactive language learning resources are uploaded to secure, community-owned sites.</p><p>Any content available on FirstVoices is gathered, uploaded and curated by teams of people from that language community. Ownership and copyright of all language content on FirstVoices is maintained by the contributing community.</p><p>FirstVoices is an initiative of the First Peoples’ Cultural Council and is funded by the First Peoples’ Cultural Foundation.</p>',
    },
  }

  const quotesData = {
    id: 3,
    type: WIDGET_QUOTES,
    settings: {
      quote1:
        "This past year has proven to be a year of eternal gratitude. We have been able to add to the archive's invaluable pieces that may have been lost if not for FirstVoices.",
      quote1By: '- Gitanyow Language Team Member',
      quote2:
        'FirstVoices helps us to support the legacy of those that paved the way for our language. We are able to share what they left us with so many more learners and teachers.',
      quote2By: '- c̕išaaʔatḥ Language Team Member',
      quote3:
        "To work with FirstVoices has been a blessing. ... Language is so important, it's at the fundamental core of our existence, of our being. It's who we are.",
      quote3By: '- Sḵwx̱wú7mesh Language Team Member',
      backgroundImage: languages,
    },
  }

  const appsData = {
    id: 4,
    type: WIDGET_TEXT,
    format: FORMAT_RIGHT,
    settings: {
      mockData: true,
      image: appsImage,
      title: 'FIRSTVOICES APPS',
      url: `https://${FIRSTVOICESLINK}/apps`,
      urlLabel: 'Learn more',
      textWithFormatting:
        '<p>The wealth of language data uploaded by Indigenous communities onto their FirstVoices language sites can now also be accessed through mobile and desktop apps. The app pulls content directly from entries on FirstVoices and functions with offline capabilities. The apps are updated throughout the year in order to ensure that the latest content that has been added to a language site also appears on the app.</p>',
    },
  }

  return {
    whyData,
    aboutData,
    quotesData,
    appsData,
  }
}

export default LandingPageData
