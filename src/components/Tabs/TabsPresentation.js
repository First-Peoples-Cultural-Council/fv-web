import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

// FPCC
import getIcon from 'common/utils/getIcon'
import Listbox from 'components/Listbox'

function TabsPresentation({ selectedValue, tabs, setValue }) {
  const [t] = useTranslation()
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <nav
        className="hidden sm:flex items-center relative w-auto rounded-lg"
        aria-label="Tabs"
      >
        {tabs?.map((tab, tabIndex) => (
          <button
            data-testid={`${tab?.value}-tab-btn`}
            type="button"
            key={tab?.value}
            value={tab?.value}
            onClick={() => setValue(tab?.value)}
            className={classNames(
              tab?.value === selectedValue
                ? `text-white bg-blumine-800 border-blumine-800`
                : 'text-charcoal-500 bg-white hover:text-charcoal-700 hover:bg-charcoal-50 border-charcoal-100',
              tabIndex === 0 ? 'rounded-l-lg border-r-0' : '',
              tabIndex === tabs.length - 1 ? 'rounded-r-lg border-l-0' : '',
              'group relative min-w-auto flex items-center border-2 py-2 px-4 font-medium text-center focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-charcoal-500',
            )}
            aria-current={tab?.value === selectedValue ? tab?.label : undefined}
          >
            {tab?.icon !== 'All'
              ? getIcon(tab?.icon, 'inline-flex fill-current w-5 h-5 mr-2')
              : ''}
            {tab?.transKey ? t(tab?.transKey) : tab?.label}
          </button>
        ))}
      </nav>
      <div className="sm:hidden flex-1 w-52 ">
        <Listbox.Presentation
          selectedValue={selectedValue}
          options={tabs}
          setValue={setValue}
        />
      </div>
    </>
  )
}
// PROPTYPES
const { arrayOf, func, shape, string } = PropTypes
TabsPresentation.propTypes = {
  tabs: arrayOf(
    shape({
      label: string,
      icon: string,
      value: string,
      transKey: string, // optional
    }),
  ),
  setValue: func,
  selectedValue: string,
}

export default TabsPresentation
