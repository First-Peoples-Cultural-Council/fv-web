import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useCharacters } from 'common/dataHooks/useCharacters'

function DashboardAlphabetData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // Data fetch

  const { isInitialLoading, data } = useCharacters()

  const tileContent = []

  const headerContent = {
    title: 'Alphabet',
    subtitle: 'Update media and linked content for your alphabet characters.',
    icon: 'Alphabet',
  }

  return {
    headerContent,
    isLoading: isInitialLoading,
    site,
    sitename,
    tileContent,
    characters: data?.characters || [],
  }
}

export default DashboardAlphabetData
