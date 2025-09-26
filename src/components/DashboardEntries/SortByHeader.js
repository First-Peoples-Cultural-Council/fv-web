import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import useSearchParamsState from 'common/hooks/useSearchParamsState'
import { SORT } from 'common/constants'

function SortByHeader({ title, asc, desc }) {
  const [paramValue, setParamValue, removeParamValue] = useSearchParamsState({
    searchParamName: SORT,
    defaultValue: '',
  })

  const handleClick = () => {
    switch (paramValue) {
      case asc:
        setParamValue(desc)
        break
      case desc:
        removeParamValue()
        break
      default:
        setParamValue(asc)
        break
    }
  }

  const isActive = paramValue === asc || paramValue === desc

  let iconName = ''
  switch (paramValue) {
    case asc:
      iconName = 'ArrowUp'
      break
    case desc:
      iconName = 'ArrowDown'
      break
    default:
      iconName = 'ChevronUpDown'
      break
  }

  return (
    <button
      type="button"
      data-testid={`sortby-${asc}-btn`}
      onClick={() => handleClick()}
      className="group inline-flex items-center cursor-pointer"
    >
      <span
        className={`${
          isActive ? 'font-bold' : 'font-medium'
        } text-left text-xs text-charcoal-900 uppercase tracking-wider`}
      >
        {title}
      </span>
      {getIcon(
        iconName,
        'text-charcoal-500 ml-1 h-5 w-5 flex-none rounded-sm fill-current group-hover:text-charcoal-900 group-focus:text-charcoal-900',
      )}
    </button>
  )
}

// PROPTYPES
const { string } = PropTypes
SortByHeader.propTypes = {
  title: string,
  asc: string,
  desc: string,
}

export default SortByHeader
