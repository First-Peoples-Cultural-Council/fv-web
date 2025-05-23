import React from 'react'

// FPCC
import getIcon from 'common/utils/getIcon'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router'

// FPCC
import SectionTitle from 'components/SectionTitle'
import SiteDocHead from 'components/SiteDocHead'

function GamesPresentation({ kids = null }) {
  const { sitename } = useParams()
  const games = [
    { pathname: 'pull-together', title: 'Pull Together', icon: 'Canoe' },
    {
      pathname: 'phrasescrambler',
      title: 'Phrase Scrambler',
      icon: 'PhraseScrambler',
    },
    { pathname: 'wordsy', title: 'Wordsy', icon: 'Wordsy' },
  ]
  return (
    <main
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="GamesPresentation"
    >
      <SiteDocHead titleArray={['Games']} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation title="GAMES" accentColor="blumine-800" />
        <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="px-4 sm:px-6 lg:px-8">
              <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="sr-only">
                  Games
                </h2>
                <ul className="grid grid-cols-1 gap-y-8 md:gap-x-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                  {games.map((game) => (
                    <li key={game.pathname} className="relative">
                      <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-charcoal-50 focus-within:ring-blumine-800 group block w-full rounded-lg overflow-hidden">
                        <Link
                          to={`/${sitename}/${kids ? 'kids/' : ''}games/${
                            game.pathname
                          }`}
                          className="bg-blumine-800 text-white text-4xl group w-full px-5 py-10 rounded-lg flex flex-col items-center font-medium group-hover:opacity-75"
                        >
                          {getIcon(game.icon, 'fill-current h-28')}
                          <span className="m-2">{game.title}</span>
                          <span className="sr-only">Go to {game.title}</span>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </main>
        </div>
      </div>
    </main>
  )
}

const { bool } = PropTypes

GamesPresentation.propTypes = {
  kids: bool,
}

export default GamesPresentation
