import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { getMediaUrl } from 'common/utils/urlHelpers'
import placeholder from 'images/cover-thumbnail.png'

function KidsNavBarData() {
  const { sitename } = useParams()
  const { site } = useSiteStore()
  const { title, logoId } = site
  const logoUrl =
    logoId !== null
      ? getMediaUrl({ type: 'image', id: logoId, viewName: 'Small' })
      : placeholder

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
    logoUrl,
    sitename,
    siteTitle: title,
  }
}

export default KidsNavBarData
