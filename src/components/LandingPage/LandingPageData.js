// FPCC
import Elders from 'assets/images/elders-landing.png'
import Img from 'assets/images/landing-about.png'
import bgImage from 'assets/images/landing-about-bg.png'
import languages from 'assets/images/languages-background.png'
import {
  WIDGET_TEXT,
  WIDGET_TEXTICONS,
  WIDGET_QUOTES,
  FIRSTVOICESLINK,
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
        '{"blocks":[{"key":"","text":"FirstVoices is an internationally recognized online platform for Indigenous communities to share and promote their languages, oral cultures and linguistic histories.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"","text":"FirstVoices provides state-of-the-art technologies, training and technical support to community language champions.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"faghd","text":"Language champions collaborate with Indigenous Elders, youth and speakers to create and share language resources like words, phrases, songs and stories.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
  }

  const aboutData = {
    id: 2,
    type: WIDGET_TEXT,
    settings: {
      mockData: true,
      bg: 'bgGreen',
      bgImage,
      image: Img,
      title: 'ABOUT FIRSTVOICES',
      url: `https://${FIRSTVOICESLINK}/about`,
      urlLabel: 'Learn more',
      textWithFormatting:
        '{"blocks":[{"key":"3euvg","text":"On FirstVoices, interactive language learning resources are uploaded to secure, community-owned sites. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cnh18","text":"Any content available on FirstVoices is gathered, uploaded and curated by teams of people from that language community. Ownership and copyright of all language content on FirstVoices is maintained by the contributing community. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"40rem","text":"FirstVoices is an initiative of the First Peoples’ Cultural Council and is funded by the First Peoples’ Cultural Foundation.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
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
  // const rssFeed =
  //   'https://firstvoices.atlassian.net/wiki/createrssfeed.action?types=blogpost&blogpostSubTypes=attachment&spaces=conf_all&title=FirstVoices+Blog+RSS+Feed&labelString%3D&excludedSpaceKeys%3D&sort=modified&maxResults=10&timeSpan=1000&showContent=true&confirm=Create+RSS+Feed'

  // const MAX_ARTICLES = 3
  // const [articles, setArticles] = useState()
  // useEffect(() => {
  //   const loadArticles = api.blog.get(rssFeed)
  // })

  return {
    whyData,
    aboutData,
    quotesData,
  }
}

export default LandingPageData
