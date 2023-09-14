import hero from 'assets/images/hero-background.png'
// import laptop from 'assets/images/landing-banner-blue.png'
import languages from 'assets/images/languages-background.png'
import map from 'assets/images/landing-banner-brown.png'

function LandingBannerData() {
  const data = {
    settings: {
      image: hero,
      title: 'Live Your Language!',
      text: 'FirstVoices is a collaborative platform where Indigenous communities manage, curate and share their languages',
      links: [
        // hiding until site search page is created
        // {
        //   id: 1,
        //   url: '/search',
        //   urlLabel: 'SEARCH FIRSTVOICES',
        //   info: 'Search the entire FirstVoices website',
        //   backgroundColor: 'bgGreen',
        //   backgroundImage: laptop,
        //   icon: 'Search',
        // },
        {
          id: 2,
          url: '/languages',
          urlLabel: 'EXPLORE ALL LANGUAGES',
          info: 'Browse the full list of languages on FirstVoices',
          backgroundColor: 'bgRed',
          backgroundImage: languages,
          icon: 'RightArrowCircle',
        },
        {
          id: 3,
          extUrl: 'https://maps.fpcc.ca/',
          urlLabel: 'EXPLORE LANGUAGE MAP',
          info: 'View an interactive map of language territories',
          backgroundColor: 'phrase',
          backgroundImage: map,
          icon: 'MapLocation',
        },
      ],
    },
  }
  return data
}

export default LandingBannerData
