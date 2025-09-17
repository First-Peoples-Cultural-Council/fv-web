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
      <section
        data-testid="DashboardTablePresentation"
        className="mx-auto h-full px-8"
      >
        <div className="bg-white shadow-sm rounded-md overflow-hidden">
          {title && (
            <div className="my-5 px-6">
              <h2
                id="billing-history-heading"
                className="text-lg leading-6 font-medium text-charcoal-900"
              >
                {title}
              </h2>
            </div>
          )}
          <div className="flex flex-col ">
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="border-t border-charcoal-100 max-h-3/4-screen overflow-auto">
                  <table className="min-w-full divide-y divide-charcoal-100">
                    <thead className="bg-charcoal-50">{tableHead}</thead>
                    <tbody className="bg-white divide-y divide-charcoal-100">
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
