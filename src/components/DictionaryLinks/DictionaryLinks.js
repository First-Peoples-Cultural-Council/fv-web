import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

// FPCC
import DictionaryLink from 'components/DictionaryLinks/DictionaryLink'

function DictionaryLinks() {
  const { sitename } = useParams()
  const { pathname } = useLocation()
  return (
    <div role="navigation">
      <h2 className="text-xl xl:text-2xl font-medium ml-4 xl:ml-7 text-charcoal-900">
        BROWSE BY:
      </h2>
      <ul className="inline-block list-none">
        {!pathname?.includes('categories') && (
          <DictionaryLink
            key="CategoriesLink"
            linkProperties={{
              id: 'CategoryLink',
              iconId: 'Categories',
              linkTo: `/${sitename}/categories`,
              label: 'Categories',
            }}
          />
        )}
        {!pathname?.includes('alphabet') && (
          <DictionaryLink
            key="AlphabetLink"
            linkProperties={{
              id: 'AlphabetLink',
              iconId: 'Alphabet',
              linkTo: `/${sitename}/alphabet`,
              label: 'Alphabet',
            }}
          />
        )}
        {!pathname?.includes('/words') && (
          <DictionaryLink
            key="WordsLink"
            linkProperties={{
              id: 'WordsLink',
              iconId: 'Word',
              linkTo: `/${sitename}/words`,
              label: 'Words',
            }}
          />
        )}
        {!pathname?.includes('/phrases') && (
          <DictionaryLink
            key="PhrasesLink"
            linkProperties={{
              id: 'PhrasesLink',
              iconId: 'Phrase',
              linkTo: `/${sitename}/phrases`,
              label: 'Phrases',
            }}
          />
        )}
      </ul>
    </div>
  )
}

export default DictionaryLinks
