import React from 'react'
import { useParams, useLocation } from 'react-router'

// FPCC
import DictionaryLink from 'components/DictionaryLinks/DictionaryLink'

function DictionaryLinks() {
  const { sitename } = useParams()
  const { pathname } = useLocation()
  return (
    <nav data-testid="DictionaryLinks" className="ml-4 xl:ml-7">
      <h2 className="text-xl font-bold text-charcoal-900 mb-4">Browse by:</h2>
      <ul className="inline-block list-none space-y-2">
        <DictionaryLink
          key="WordsLink"
          current={pathname?.includes('/words')}
          linkProperties={{
            id: 'WordsLink',
            iconId: 'Word',
            linkTo: `/${sitename}/words`,
            label: 'Words',
          }}
        />
        <DictionaryLink
          key="AlphabetLink"
          current={pathname?.includes('alphabet')}
          linkProperties={{
            id: 'AlphabetLink',
            iconId: 'Alphabet',
            linkTo: `/${sitename}/alphabet/startsWith`,
            label: 'Alphabet',
          }}
        />
        <DictionaryLink
          key="PhrasesLink"
          current={pathname?.includes('/phrases')}
          linkProperties={{
            id: 'PhrasesLink',
            iconId: 'Phrase',
            linkTo: `/${sitename}/phrases`,
            label: 'Phrases',
          }}
        />
        <DictionaryLink
          key="CategoriesLink"
          current={pathname?.includes('categories')}
          linkProperties={{
            id: 'CategoryLink',
            iconId: 'Categories',
            linkTo: `/${sitename}/categories`,
            label: 'Categories',
          }}
        />
      </ul>
    </nav>
  )
}

export default DictionaryLinks
