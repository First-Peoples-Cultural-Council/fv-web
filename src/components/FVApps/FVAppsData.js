import { useSites } from 'common/dataHooks/useSites'

function FVAppsData() {
  // Passing a number to useSites will set the page size to that number
  const sites = useSites(250)

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
