import { useSites } from 'common/dataHooks/useSites'

function FVAppsData() {
  const sites = useSites()

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

export default FVAppsData
