import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useJoinRequests } from 'common/dataHooks/useJoinRequests'

function DashboardJoinRequestsData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  const { data, isError, infiniteScroll, loadRef, isInitialLoading } =
    useJoinRequests()
  return {
    isLoading: isInitialLoading || isError,
    infiniteScroll,
    loadRef,
    site,
    sitename,
    joinRequests: data || {},
  }
}

export default DashboardJoinRequestsData
