import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'

function DashboardTablePresentation({ title, isLoading, tableHead, tableBody }) {
  return (
    <Loading.Container isLoading={isLoading}>
      <section id="DashboardTablePresentation" className="mx-auto max-w-7xl h-full px-8">
        <div className="bg-white shadow rounded-md overflow-hidden">
          {title && (
            <div className="my-5 px-6">
              <h2 id="billing-history-heading" className="text-lg leading-6 font-medium text-gray-900">
                {title}
              </h2>
            </div>
          )}
          <div className="flex flex-col ">
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 max-h-3/4-screen overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">{tableHead}</thead>
                    <tbody className="bg-white divide-y divide-gray-200">{tableBody}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Loading.Container>
  )
}
// PROPTYPES
const { bool, node, string } = PropTypes
DashboardTablePresentation.propTypes = {
  isLoading: bool,
  tableHead: node,
  tableBody: node,
  title: string,
}

export default DashboardTablePresentation
