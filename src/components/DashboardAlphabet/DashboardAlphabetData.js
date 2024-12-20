// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useCharacters } from 'common/dataHooks/useCharacters'

function DashboardAlphabetData() {
  const { site } = useSiteStore()

  // Data fetch
  const queryResponse = useCharacters()

  const headerContent = {
    title: 'Alphabet',
    subtitle: 'Update media and linked content for your alphabet characters.',
    icon: 'Alphabet',
  }

  return {
    headerContent,
    queryResponse,
    site,
    tileContent: [],
  }
}

export default DashboardAlphabetData
