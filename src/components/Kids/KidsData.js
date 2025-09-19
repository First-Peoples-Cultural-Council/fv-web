import { useParams } from 'react-router'

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
      color: '#2c876d',
      textColor: '#144036',
      path: 'dictionary',
    },
    {
      id: 'alphabet',
      title: 'Alphabet',
      icon: 'Alphabet',
      color: '#2d5b72',
      textColor: '#284151',
      path: 'alphabet',
    },
    {
      id: 'categories',
      title: 'Categories',
      icon: 'Categories',
      color: '#d1912f',
      textColor: '#68381f',
      path: 'categories',
    },
    {
      id: 'games',
      title: 'Games',
      icon: 'Jigsaw',
      color: '#513B56',
      textColor: '#39293c',
      path: 'games',
    },
    {
      id: 'songs',
      title: 'Songs',
      icon: 'Song',
      color: '#830042',
      textColor: '#5c002e',
      path: 'songs',
    },
    {
      id: 'stories',
      title: 'Stories',
      icon: 'Story',
      color: '#E9C46A',
      textColor: '#a3894a',
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
