import React from 'react'
// import PropTypes from 'prop-types'
// import { Link, useParams } from 'react-router-dom'

// FPCC
import SectionTitle from 'components/SectionTitle'
// import getIcon from 'common/utils/getIcon'

function GamesPresentation() {
  // Adding notice and commenting things out for FW-4515 until games are updated for new back-end.

  // const games = [
  //   { pathname: 'memory', title: 'Memory', icon: 'Memory' },
  //   { pathname: 'jigsaw', title: 'Jigsaw', icon: 'Jigsaw' },
  //   { pathname: 'parachute', title: 'Parachute', icon: 'Parachute' },
  //   { pathname: 'quiz', title: 'Quiz', icon: 'Quiz' },
  //   { pathname: 'wordscramble', title: 'Word Scramble', icon: 'WordScramble' },
  //   { pathname: 'wordsearch', title: 'Word Search', icon: 'WordSearch' },
  // ]
  // const { sitename } = useParams()
  return (
    <main
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="GamesPresentation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation title="GAMES" accentColor="tertiaryA" />
        <div className="w-full flex-1 min-h-full min-w-full p-10 lg:p-20 text-gray-800 relative items-center text-center">
          <h1 className="font-black text-3xl lg:text-5xl text-fv-charcoal mb-10">
            Games coming soon.
          </h1>
        </div>
        {/* <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="px-4 sm:px-6 lg:px-8">
              <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="sr-only">
                  Games
                </h2>
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-y-8 md:gap-x-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
                >
                  {games.map((game) => (
                    <li key={game.pathname} className="relative">
                      <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-tertiaryA group block w-full rounded-lg overflow-hidden">
                        <Link
                          to={`/${sitename}/${kids ? 'kids/' : ''}games/${
                            game.pathname
                          }`}
                          className="bg-tertiaryA text-white text-4xl group w-full px-5 py-10 rounded-lg flex flex-col items-center font-medium group-hover:opacity-75"
                        >
                          {getIcon(game.icon, 'fill-current h-28')}
                          <span className="m-5">{game.title}</span>
                          <span className="sr-only">Go to {game.title}</span>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </main>
        </div> */}
      </div>
    </main>
  )
}

// PROPTYPES
// const { bool } = PropTypes
// GamesPresentation.propTypes = {
//   kids: bool,
// }

export default GamesPresentation
