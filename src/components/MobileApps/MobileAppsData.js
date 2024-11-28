import { useSites } from 'common/dataHooks/useSites'

function MobileAppsData() {
  const sites = useSites({ pageSize: 250 })

  function features(site) {
    return site.enabledFeatures.find(
      (feature) => feature.key.toLowerCase() === 'has_app',
    )
  }

  const sitesWithApps = sites?.data?.results?.filter(features)

  return {
    sitesWithApps,
  }
}

export default MobileAppsData
