import GlobalConfiguration from 'src/GlobalConfiguration'
import PropTypes from 'prop-types'

function getAppUrl({ slug }) {
  return GlobalConfiguration.ENV_APP === 'production'
    ? `https://${slug}.firstvoicesapp.com`
    : `https://${slug}.${GlobalConfiguration.ENV_APP}.firstvoicesapp.com`
}

const { string } = PropTypes

getAppUrl.propTypes = {
  slug: string,
}

export default getAppUrl
