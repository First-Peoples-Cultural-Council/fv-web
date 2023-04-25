import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'

function KidsData() {
  const { sitename } = useParams()
  const { site } = useSiteStore()
  const { title } = site

  const links = [
    {
      id: 'dictionary',
      title: 'Dictionary',
      icon: 'Dictionary',
      color: 'word',
      textColor: 'wordText',
      path: 'dictionary',
    },
    {
      id: 'alphabet',
      title: 'Alphabet',
      icon: 'Alphabet',
      color: 'primary',
      textColor: 'primary',
      path: 'alphabet',
    },
    {
      id: 'categories',
      title: 'Categories',
      icon: 'Categories',
      color: 'phrase',
      textColor: 'phraseText',
      path: 'categories',
    },
    {
      id: 'games',
      title: 'Games',
      icon: 'Jigsaw',
      color: 'tertiaryA',
      textColor: 'tertiaryA',
      path: 'games',
    },
    {
      id: 'songs',
      title: 'Songs',
      icon: 'Song',
      color: 'song',
      textColor: 'songText',
      path: 'songs',
    },
    {
      id: 'stories',
      title: 'Stories',
      icon: 'Story',
      color: 'story',
      textColor: 'storyText',
      path: 'stories',
    },
  ]
  return {
    links,
    sitename,
    siteTitle: title,
  }
}

export default KidsData
