import Img from 'assets/images/landing-about.png'
import bgImage from 'assets/images/landing-about-bg.png'

function LandingAboutData() {
  const data = {
    settings: {
      mockData: true,
      bgColor: 'jade-500',
      bgImage,
      image: Img,
      title: 'ABOUT FIRSTVOICES',
      url: '/about',
      urlLabel: 'Learn more',
      textWithFormatting:
        '{"blocks":[{"key":"3euvg","text":"On FirstVoices, interactive language learning resources are uploaded to secure, community-owned sites. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cfr7r","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cnh18","text":"Any content available on FirstVoices is gathered, uploaded, and curated by teams of people from that language community. Ownership and copyright of all language content on FirstVoices is maintained by the contributing community. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c7437","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"40rem","text":"FirstVoices is an initiative of the First Peoples’ Cultural Council and is funded by the First Peoples’ Cultural Foundation.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
  }
  return data
}

export default LandingAboutData
