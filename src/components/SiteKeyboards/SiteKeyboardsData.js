// FPCC
import { useSiteStore } from 'context/SiteContext'
import { usePage } from 'common/dataHooks/usePages'

function SiteKeyboardsData() {
  const { site } = useSiteStore()
  const { title } = site

  const { data, isInitialLoading } = usePage({
    pageSlug: 'keyboards',
  })

  return {
    isLoading: isInitialLoading,
    widgets: data?.widgets || [],
    title,
  }
}

export default SiteKeyboardsData
