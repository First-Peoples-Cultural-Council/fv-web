import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import Alphabet from 'components/Alphabet'
import Audiobar from 'components/Audiobar'
import ByAlphabet from 'components/ByAlphabet'
import ByCategory from 'components/ByCategory'
import Categories from 'components/Categories'
import Dictionary from 'components/Dictionary'
import DictionaryDetail from 'components/DictionaryDetail'
import ErrorHandler from 'components/ErrorHandler'
import Footer from 'components/Footer'
import Galleries from 'components/Galleries'
import Gallery from 'components/Gallery'
import Game from 'components/Game'
import Games from 'components/Games'
import Home from 'components/Home'
import Immersion from 'components/Immersion'
import Join from 'components/Join'
import Loading from 'components/Loading'
import NavBar from 'components/NavBar'
import Page from 'components/Page'
import SearchSite from 'components/SearchSite'
import SiteApps from 'components/SiteApps'
import SiteKeyboards from 'components/SiteKeyboards'
import Song from 'components/Song'
import SongsAndStories from 'components/SongsAndStories'
import Story from 'components/Story'

import ConditionsOfUse from 'components/ConditionsOfUse'
import Disclaimer from 'components/Disclaimer'
import { TYPE_PHRASE, TYPE_WORD, TYPE_DICTIONARY } from 'common/constants'

function SiteFrame({ siteLoading }) {
  return (
    <div className="overflow-hidden">
      <header className="fixed w-full top-0 z-50 print:hidden bg-fv-charcoal h-16">
        <NavBar.Container siteLoading={siteLoading} />
      </header>
      <main role="main" className="relative pt-16 z-0 min-h-screen">
        <Loading.Container isLoading={siteLoading}>
          <Routes>
            <Route path="search" element={<SearchSite.Container />} />
            <Route
              path="dictionary"
              element={<Dictionary.Container searchType={TYPE_DICTIONARY} />}
            />
            <Route path="words/:id" element={<DictionaryDetail.Container />} />
            <Route
              path="words"
              element={<Dictionary.Container searchType={TYPE_WORD} />}
            />
            <Route
              path="phrases/:id"
              element={<DictionaryDetail.Container />}
            />
            <Route
              path="phrases"
              element={<Dictionary.Container searchType={TYPE_PHRASE} />}
            />
            <Route
              path="alphabet/startsWith"
              element={<ByAlphabet.Container />}
            />
            <Route path="alphabet" element={<Alphabet.Container />} />
            <Route
              path="categories/:categoryId"
              element={<ByCategory.Container />}
            />
            <Route path="categories" element={<Categories.Container />} />
            <Route path="songs/:id" element={<Song.Container />} />
            <Route
              path="songs"
              element={<SongsAndStories.Container searchType="SONG" />}
            />
            <Route path="stories/:id" element={<Story.Container />} />
            <Route
              path="stories"
              element={<SongsAndStories.Container searchType="STORY" />}
            />
            <Route path="galleries/:id" element={<Gallery.Container />} />
            <Route path="galleries" element={<Galleries.Container />} />
            <Route path="games/:id" element={<Game.Container />} />
            <Route path="games" element={<Games.Presentation />} />
            <Route path="immersion" element={<Immersion.Container />} />
            <Route path="join" element={<Join.Container />} />
            <Route path="apps" element={<SiteApps.Presentation />} />
            <Route path="keyboards" element={<SiteKeyboards.Container />} />
            <Route path="conditions-of-use" element={<ConditionsOfUse />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route
              path="our-language"
              element={<Page.Container pageSlug="our-language" />}
            />
            <Route
              path="our-people"
              element={<Page.Container pageSlug="our-people" />}
            />
            <Route path="custom/:slug" element={<Page.Container />} />
            <Route path="error" element={<ErrorHandler.Container />} />
            <Route path="" element={<Home.Container />} />
            <Route
              path="*"
              element={
                <ErrorHandler.Container
                  error={{ status: 404, statusText: 'Page not found' }}
                />
              }
            />
          </Routes>
        </Loading.Container>
      </main>
      <footer>
        <Footer.Presentation />
      </footer>
      <Audiobar.Container />
    </div>
  )
}

// PROPTYPES
const { bool } = PropTypes
SiteFrame.propTypes = {
  siteLoading: bool,
}

export default SiteFrame
