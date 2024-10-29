import React from 'react'
import PropTypes from 'prop-types'

function HeaderSelect({ value, handleSelectChange, headerBlockTypes }) {
  const onToggle = (event) => {
    event.preventDefault()
    const style = event.target.value
    handleSelectChange(event, style)
  }

  return (
    <select
      value={value}
      onChange={onToggle}
      className="border-r border-charcoal-100 pl-3 pr-10 py-2 focus:outline-none focus:ring-scarlet-800 focus:border-scarlet-800 text-sm"
    >
      <option value="">Normal</option>
      {headerBlockTypes.map((heading) => (
        <option key={heading.value} value={heading.value}>
          {heading.label}
        </option>
      ))}
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
