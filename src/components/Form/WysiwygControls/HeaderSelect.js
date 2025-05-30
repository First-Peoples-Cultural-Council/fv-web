import React from 'react'
import PropTypes from 'prop-types'

function HeaderSelect({ editor, handleSelectChange, headerBlockTypes }) {
  let headerValue = JSON.stringify('') // default to normal text

  const headerLevels = headerBlockTypes.map(
    (heading) => JSON.parse(heading.value)?.level,
  )
  const matchedLevel = headerLevels.find((lvl) =>
    editor?.isActive('heading', { level: lvl }),
  )
  if (matchedLevel) {
    headerValue = JSON.stringify({ level: matchedLevel })
  }

  const onToggle = (event) => {
    event.preventDefault()
    const parsedValue = JSON.parse(event.target.value)
    handleSelectChange(event, parsedValue)
  }

  return (
    <select
      value={headerValue}
      onChange={onToggle}
      className="border-r border-charcoal-100 pl-3 pr-10 py-2 focus:outline-none focus:ring-scarlet-800 focus:border-scarlet-800 text-sm"
    >
      {headerBlockTypes.map((heading) => (
        <option key={heading.value} value={heading.value}>
          {heading.label}
        </option>
      ))}
    </select>
  )
}

// PROPTYPES
const { array, func, object } = PropTypes
HeaderSelect.propTypes = {
  editor: object,
  handleSelectChange: func,
  headerBlockTypes: array,
}

export default HeaderSelect
