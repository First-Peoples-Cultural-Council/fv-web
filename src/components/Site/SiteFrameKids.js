import React from 'react'
import PropTypes from 'prop-types'
import { Routes, Route, useLocation } from 'react-router-dom'

import Alphabet from 'components/Alphabet'
import ByAlphabet from 'components/ByAlphabet'
import ByCategory from 'components/ByCategory'
import Categories from 'components/Categories'
import DictionaryDetail from 'components/DictionaryDetail'
import KidsFooter from 'components/KidsFooter'
import Game from 'components/Game'
import Games from 'components/Games'
import Kids from 'components/Kids'
import KidsNavBar from 'components/KidsNavBar'
import Loading from 'components/Loading'
import Dictionary from 'components/Dictionary'
import Song from 'components/Song'
import SongsAndStories from 'components/SongsAndStories'
import Story from 'components/Story'
import { DOC_PHRASE, DOC_WORD } from 'common/constants'

function SiteFrameKids({ siteLoading }) {
  const location = useLocation()
  const isHome = location?.pathname?.endsWith('kids') || location?.pathname?.endsWith('kids/')
  return (
    <div className="overflow-hidden">
      <header className="w-full">
        <KidsNavBar.Container home={isHome} />
      </header>
      <main role="main" className="relative z-0 xl:pt-3">
        <Loading.Container isLoading={siteLoading}>
          <Routes>
            <Route path="dictionary" element={<Dictionary.Container searchType={'WORD_AND_PHRASE'} kids />} />
            <Route path="words/:id" element={<DictionaryDetail.Container docType={DOC_WORD} kids />} />
            <Route path="words" element={<Dictionary.Container searchType={'WORD'} kids />} />
            <Route path="phrases/:id" element={<DictionaryDetail.Container docType={DOC_PHRASE} kids />} />
            <Route path="phrases" element={<Dictionary.Container searchType={'PHRASE'} kids />} />
            <Route path="alphabet/:character" element={<ByAlphabet.Container kids />} />
            <Route path="alphabet" element={<Alphabet.Container kids />} />
            <Route path="categories/:categoryId" element={<ByCategory.Container kids />} />
            <Route path="categories" element={<Categories.Container kids />} />
            <Route path="songs/:id" element={<Song.Container kids />} />
            <Route path="songs" element={<SongsAndStories.Container searchType={'SONG'} kids />} />
            <Route path="stories/:id" element={<Story.Container kids />} />
            <Route path="stories" element={<SongsAndStories.Container searchType={'STORY'} kids />} />
            <Route path="games/:id" element={<Game.Container kids />} />
            <Route path="games" element={<Games.Presentation kids />} />
            <Route path="/" element={<Kids.Container />} />
          </Routes>
        </Loading.Container>
      </main>
      <footer>
        <KidsFooter.Presentation />
      </footer>
    </div>
  )
}

// PROPTYPES
const { bool } = PropTypes
SiteFrameKids.propTypes = {
  siteLoading: bool,
}

export default SiteFrameKids
