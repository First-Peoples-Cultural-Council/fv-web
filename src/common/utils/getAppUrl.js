import GlobalConfiguration from 'src/GlobalConfiguration'
import PropTypes from 'prop-types'

function getAppUrl({ slug }) {
  return GlobalConfiguration.ENV_APP === 'dev' ||
    GlobalConfiguration.ENV_APP === 'preprod'
    ? `https://${slug}.${GlobalConfiguration.ENV_APP}.firstvoicesapp.com`
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
