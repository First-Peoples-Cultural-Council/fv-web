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

const { string } = PropTypes

getAppUrl.propTypes = {
  slug: string,
}

export { getAppUrl, getAppLogoUrl }
