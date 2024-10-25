import GlobalConfiguration from 'src/GlobalConfiguration'
import PropTypes from 'prop-types'

function getAppUrl({ slug }) {
  return GlobalConfiguration.ENV_APP === 'production'
    ? `https://${slug}.firstvoicesapp.com`
    : `https://${slug}.${GlobalConfiguration.ENV_APP}.firstvoicesapp.com`
}

function getAppLogoUrl({ slug }) {
  const appUrl = getAppUrl({ slug })
  return `${appUrl}/assets/${slug}/logo192.png`
}

const { string } = PropTypes

getAppUrl.propTypes = {
  slug: string,
}

export { getAppUrl, getAppLogoUrl }
