import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'

function KidsData() {
  const { sitename } = useParams()
  const { site } = useSiteStore()

  const links = [
    {
      id: 'dictionary',
      title: 'Dictionary',
      icon: 'Dictionary',
      color: 'kids-dictionary-500',
      textColor: 'kids-dictionary-700',
      path: 'dictionary',
    },
    {
      id: 'alphabet',
      title: 'Alphabet',
      icon: 'Alphabet',
      color: 'kids-alphabet-700',
      textColor: 'kids-alphabet-900',
      path: 'alphabet',
    },
    {
      id: 'categories',
      title: 'Categories',
      icon: 'Categories',
      color: 'kids-categories-600',
      textColor: 'kids-categories-700',
      path: 'categories',
    },
    {
      id: 'games',
      title: 'Games',
      icon: 'Jigsaw',
      color: 'kids-games-500',
      textColor: 'kids-games-900',
      path: 'games',
    },
    {
      id: 'songs',
      title: 'Songs',
      icon: 'Song',
      color: 'kids-songs-500',
      textColor: 'kids-songs-900',
      path: 'songs',
    },
    {
      id: 'stories',
      title: 'Stories',
      icon: 'Story',
      color: 'kids-stories-500',
      textColor: 'kids-stories-900',
      path: 'stories',
    },
  ]
  return {
    links,
    sitename,
    site,
  }
}

export default KidsData
