import GlobalConfiguration from 'src/GlobalConfiguration'
import PropTypes from 'prop-types'

function getAppUrl({ slug }) {
  return GlobalConfiguration.APP_ENV === 'dev' ||
    GlobalConfiguration.APP_ENV === 'preprod'
    ? `https://${slug}.${GlobalConfiguration.APP_ENV}.firstvoicesapp.com`
    : `https://${slug}.firstvoicesapp.com`
}

function getAppLogoUrl({ slug }) {
  const appUrl = getAppUrl({ slug })
  return `${appUrl}/${slug}/logo192.png`
}

function getAppDetails({ site }) {
  const features = [
    {
      name: 'Browse the dictionary.',
      description:
        'Browse words and phrases in the dictionary, even while offline!',
      icon: 'Search',
    },
    {
      name: 'Flashcards.',
      description: 'Practice with flashcards to aid your learning.',
      icon: 'Flashcard',
    },
    {
      name: 'Bookmarks.',
      description: `Bookmark content to save it for later and continue your progress.`,
      icon: 'Bookmark',
    },
    {
      name: 'Device support.',
      description:
        'Compatible with iPhone, iPad, Android, Chromebook, Windows, and more.',
      icon: 'Devices',
    },
  ]
  return {
    url: getAppUrl({ slug: site?.sitename }),
    logoUrl: getAppLogoUrl({ slug: site?.sitename }),
    features,
  }
}

const { string } = PropTypes

getAppUrl.propTypes = {
  slug: string,
}

export { getAppDetails, getAppUrl, getAppLogoUrl }
