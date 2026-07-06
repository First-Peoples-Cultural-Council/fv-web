import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

// FPCC
import getIcon from 'common/utils/getIcon'
import { TYPE_DICTIONARY, TYPE_PHRASE, TYPE_WORD } from 'common/constants'

function SearchTypeSelectorContainer({ selectedSearchType, setSearchType }) {
  const dictionaryTypes = [
    { label: 'WORDS', icon: 'Word', value: TYPE_WORD },
    {
      label: 'PHRASES',
      icon: 'Phrase',
      value: TYPE_PHRASE,
    },
    {
      label: 'BOTH',
      icon: 'All',
      value: TYPE_DICTIONARY,
    },
  ]

  const [t] = useTranslation()
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div id="SearchTypeSelectorContainer">
      <nav
        className="flex items-center relative w-auto rounded-lg"
        aria-label="Tabs"
      >
        {dictionaryTypes?.map((tab, tabIndex) => (
          <button
            data-testid={`${tab?.value}-tab-btn`}
            type="button"
            key={tab?.value}
            value={tab?.value}
            onClick={() => setSearchType(tab?.value)}
            className={classNames(
              tab?.value === selectedSearchType
                ? `text-white bg-blumine-800 border-blumine-800`
                : 'text-charcoal-500 bg-white hover:text-charcoal-700 hover:bg-charcoal-50 border-charcoal-100',
              tabIndex === 0 ? 'rounded-l-lg border-r-0' : '',
              tabIndex === dictionaryTypes.length - 1
                ? 'rounded-r-lg border-l-0'
                : '',
              'group relative min-w-auto flex items-center border-2 py-2 px-4 font-medium text-center focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-charcoal-500',
            )}
            aria-current={
              tab?.value === selectedSearchType ? tab?.label : undefined
            }
          >
            {tab?.icon !== 'All'
              ? getIcon(tab?.icon, 'inline-flex fill-current w-5 h-5 mr-2')
              : ''}
            {tab?.transKey ? t(tab?.transKey) : tab?.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

// PROPTYPES
const { func, oneOf } = PropTypes
SearchTypeSelectorContainer.propTypes = {
  setSearchType: func,
  selectedSearchType: oneOf([TYPE_DICTIONARY, TYPE_PHRASE, TYPE_WORD]),
}

export default SearchTypeSelectorContainer
