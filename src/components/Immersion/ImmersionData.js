// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useImmersionLabels } from 'common/dataHooks/useImmersionLabels'

function ImmersionData() {
  const { site } = useSiteStore()
  const { isInitialLoading, isError, labels } = useImmersionLabels()

  return {
    isLoading: !site?.id,
    isLoadingEntries: isInitialLoading || isError,
    items: labels || [],
    actions: ['copy'],
  }
}

export default ImmersionData
