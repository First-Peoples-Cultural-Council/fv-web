import React from 'react'
import PropTypes from 'prop-types'

function HeaderSelect({ value, handleSelectChange, headerBlockTypes }) {
  const onToggle = (event) => {
    event.preventDefault()
    let style = event.target.value
    handleSelectChange(event, style)
  }

  return (
    <select
      value={value}
      onChange={onToggle}
      className="border-r border-gray-200 pl-3 pr-10 py-2 focus:outline-none focus:ring-secondary focus:border-secondary text-sm"
    >
      <option value="">Normal</option>
      {headerBlockTypes.map((heading) => {
        return (
          <option key={heading.value} value={heading.value}>
            {heading.label}
          </option>
        )
      })}
    </select>
  )
}

// PROPTYPES
const { array, func, string } = PropTypes
HeaderSelect.propTypes = {
  handleSelectChange: func,
  headerBlockTypes: array,
  value: string,
}

export default HeaderSelect
