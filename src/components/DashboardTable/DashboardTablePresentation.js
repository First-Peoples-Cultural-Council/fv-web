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
      <section data-testid="DashboardTablePresentation" className="h-full">
        <div className="bg-white shadow-sm rounded-md overflow-hidden">
          {title && <h2 className="sr-only">{title}</h2>}
          <div className="flex flex-col ">
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="border-t border-charcoal-100 max-h-[75vh] overflow-auto">
                  <table className="min-w-full divide-y divide-charcoal-100">
                    <thead className="bg-charcoal-50 text-charcoal-500">
                      {tableHead}
                    </thead>
                    <tbody className="bg-white divide-y divide-charcoal-100 text-sm text-charcoal-900">
                      {tableBody}
                    </tbody>
                  </table>
                  {infiniteLoadBtn && <div>{infiniteLoadBtn}</div>}
                </div>
              </div>
            </div>
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
