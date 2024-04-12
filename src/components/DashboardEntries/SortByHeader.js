import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import useSearchParamsState from 'common/hooks/useSearchParamsState'
import { SORT, SORT_ALPHABETICAL } from 'common/constants'

function SortByHeader({ title, asc, desc }) {
  const [paramValue, setParamValue] = useSearchParamsState({
    searchParamName: SORT,
    defaultValue: SORT_ALPHABETICAL,
  })

  const handleClick = () => {
    if (paramValue === asc) {
      setParamValue(desc)
    } else {
      setParamValue(asc)
    }
  }

  const isActive = paramValue === asc || paramValue === desc

  let iconName = ''
  switch (paramValue) {
    case asc:
      iconName = 'ChevronUp'
      break
    case desc:
      iconName = 'ChevronDown'
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
        } text-left text-xs text-fv-charcoal uppercase tracking-wider`}
      >
        {title}
      </span>
      {getIcon(
        iconName,
        'text-fv-charcoal-light ml-2 h-5 w-5 flex-none rounded fill-current group-hover:text-fv-charcoal group-focus:text-fv-charcoal',
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
