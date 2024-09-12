import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { usePage } from 'common/dataHooks/usePages'

function ResourceData({ pageSlug }) {
  const { site } = useSiteStore()
  const { title } = site

  const { data, isInitialLoading } = usePage({
    pageSlug,
  })

  return {
    isLoading: isInitialLoading,
    widgets: data?.widgets || [],
    title,
  }
}
// PROPTYPES
const { string } = PropTypes
ResourceData.propTypes = {
  pageSlug: string,
}

export default ResourceData
