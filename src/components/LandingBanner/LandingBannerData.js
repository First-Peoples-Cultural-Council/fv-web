import hero from 'assets/images/hero-background.webp'
import landingTitle from 'assets/images/landing-title.svg'
import laptop from 'assets/images/landing-banner-blue.png'
import languages from 'assets/images/languages-background.png'
import map from 'assets/images/landing-banner-brown.png'

function LandingBannerData() {
  const data = {
    settings: {
      image: hero,
      title: landingTitle,
      text: 'FirstVoices is a collaborative platform where Indigenous communities manage, curate and share their languages',
      links: [
        {
          id: 1,
          url: '/search',
          urlLabel: 'SEARCH FIRSTVOICES',
          info: 'Search the entire FirstVoices website',
          backgroundColor: 'jade-500',
          backgroundImage: laptop,
          icon: 'Search',
        },
        {
          id: 2,
          url: '/languages',
          urlLabel: 'EXPLORE ALL LANGUAGES',
          info: 'Browse the full list of languages on FirstVoices',
          backgroundColor: 'scarlet-800',
          backgroundImage: languages,
          icon: 'RightArrowCircle',
        },
        {
          id: 3,
          extUrl: 'https://maps.fpcc.ca/',
          urlLabel: 'EXPLORE LANGUAGE MAP',
          info: 'View an interactive map of language territories',
          backgroundColor: 'ochre-600',
          backgroundImage: map,
          icon: 'MapLocation',
        },
      ],
    },
  }
  return data
}

export default LandingBannerData
