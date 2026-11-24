import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC

function PageTabs({ tabs = [] }) {
  return (
    <div className="w-full px-4 py-3 bg-white rounded-lg">
      <div className="">
        <nav aria-label="Tabs" className="-mb-px flex">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              to={tab.href}
              aria-current={tab.current ? 'page' : undefined}
              className={`
                  ${
                    tab.current
                      ? 'border-blumine-700 text-blumine-800 font-bold'
                      : 'border-charcoal-100 text-charcoal-400 hover:border-charcoal-300 hover:text-charcoal-700'
                  }
                  w-1/${tabs.length} border-b-4 px-1 py-3 text-center text-lg`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
// PROPTYPES
const { arrayOf, bool, shape, string } = PropTypes
PageTabs.propTypes = {
  tabs: arrayOf(
    shape({
      label: string,
      href: string,
      current: bool,
    }),
  ),
}

export default PageTabs
