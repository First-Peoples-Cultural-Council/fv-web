import React from 'react'
import PropTypes from 'prop-types'

function FormHeader({ title, subtitle }) {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-2xl leading-6 font-bold text-charcoal-900">
        {title}
      </h1>
      <p className="text-lg text-charcoal-500">{subtitle}</p>
    </div>
  )
}

// PROPTYPES
const { string } = PropTypes

FormHeader.propTypes = {
  title: string,
  subtitle: string,
}

export default FormHeader
