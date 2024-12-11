import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// FPCC
import Alphabet from 'components/Alphabet'
import Audiobar from 'components/Audiobar'
import ByAlphabet from 'components/ByAlphabet'
import ByCategory from 'components/ByCategory'
import Categories from 'components/Categories'
import DictionaryDetail from 'components/DictionaryDetail'
import KidsFooter from 'components/KidsFooter'
import Game from 'components/Game'
import Games from 'components/Games'
import Kids from 'components/Kids'
import KidsNavBar from 'components/KidsNavBar'
import Dictionary from 'components/Dictionary'
import Song from 'components/Song'
import SongsAndStories from 'components/SongsAndStories'
import Story from 'components/Story'
import {
  TYPE_PHRASE,
  TYPE_WORD,
  TYPE_DICTIONARY,
  TYPE_SONG,
  TYPE_STORY,
} from 'common/constants'
import SiteDocHead from 'components/SiteDocHead'

function SiteFrameKids() {
  const location = useLocation()
  const isHome =
    location?.pathname?.endsWith('kids') ||
    location?.pathname?.endsWith('kids/')
  return (
    <div className="overflow-hidden">
      <SiteDocHead />
      <header className="w-full">
        <KidsNavBar.Container home={isHome} />
      </header>
      <main role="main" className="relative z-0 xl:pt-3">
        <Routes>
          <Route
            path="dictionary"
            element={<Dictionary.Container searchType={TYPE_DICTIONARY} kids />}
          />
          <Route
            path="words/:id"
            element={<DictionaryDetail.Container kids />}
          />
          <Route
            path="words"
            element={<Dictionary.Container searchType={TYPE_WORD} kids />}
          />
          <Route
            path="phrases/:id"
            element={<DictionaryDetail.Container kids />}
          />
          <Route
            path="phrases"
            element={<Dictionary.Container searchType={TYPE_PHRASE} kids />}
          />
          <Route
            path="alphabet/startsWith"
            element={<ByAlphabet.Container kids />}
          />
          <Route path="alphabet" element={<Alphabet.Container kids />} />
          <Route
            path="categories/:categoryId"
            element={<ByCategory.Container kids />}
          />
          <Route path="categories" element={<Categories.Container kids />} />
          <Route path="songs/:id" element={<Song.Container kids />} />
          <Route
            path="songs"
            element={<SongsAndStories.Container searchType={TYPE_SONG} kids />}
          />
          <Route path="stories/:id" element={<Story.Container kids />} />
          <Route
            path="stories"
            element={<SongsAndStories.Container searchType={TYPE_STORY} kids />}
          />
          <Route path="games/:id" element={<Game.Container kids />} />
          <Route path="games" element={<Games.Presentation kids />} />
          <Route path="/" element={<Kids.Container />} />
        </Routes>
      </main>
      <footer>
        <KidsFooter.Presentation />
      </footer>
      <Audiobar.Container />
    </div>
  )
}

export default SiteFrameKids
