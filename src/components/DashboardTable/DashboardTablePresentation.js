import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadOrError from 'components/LoadOrError'
function DashboardTablePresentation({
  title,
  queryResponse,
  tableHead,
  tableBody,
  infiniteLoadBtn,
}) {
  return (
    <LoadOrError queryResponse={queryResponse}>
      <section data-testid="DashboardTablePresentation">
        <div className="bg-white shadow-sm rounded-lg">
          {title && <h2 className="sr-only">{title}</h2>}

          <div className="max-h-[75vh] overflow-auto pt-2 bg-charcoal-50 shadow-sm rounded-lg">
            <table className="min-w-full divide-y divide-charcoal-100">
              <thead className="text-charcoal-500 rounded-lg overflow-hidden">
                {tableHead}
              </thead>
              <tbody className="bg-white divide-y divide-charcoal-100 text-sm text-charcoal-900">
                {tableBody}
              </tbody>
            </table>
            {infiniteLoadBtn && (
              <div className="bg-white">{infiniteLoadBtn}</div>
            )}
          </div>
        </div>
      </section>
    </LoadOrError>
  )
}
// PROPTYPES
const { object, node, string } = PropTypes
DashboardTablePresentation.propTypes = {
  queryResponse: object,
  tableHead: node,
  tableBody: node,
  title: string,
  infiniteLoadBtn: node,
}

export default DashboardTablePresentation
