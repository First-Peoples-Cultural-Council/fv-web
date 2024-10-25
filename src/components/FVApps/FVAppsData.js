import { useSites } from 'common/dataHooks/useSites'

function FVAppsData() {
  const sites = useSites()

  function features(site) {
    return site.enabledFeatures.find(
      (feature) => feature.key.toLowerCase() === 'has_app',
    )
  }

  // NOTE: this only gets the first page of sites,
  // which won't work on dev but currently does work on prod
  // See: FW-6216
  const sitesWithApps = sites?.data?.results?.filter(features)

  return {
    sitesWithApps,
  }
}

export default FVAppsData
