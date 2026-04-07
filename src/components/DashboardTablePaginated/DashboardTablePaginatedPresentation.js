import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadOrError from 'components/LoadOrError'
import PaginationControls from 'components/PaginationControls'

function DashboardTablePaginatedPresentation({
  queryResponse,
  tableHead,
  tableBody,
  page,
  setPage,
}) {
  return (
    <div
      id="DashboardTablePaginatedPresentation"
      className="px-4 xl:px-6 w-full"
    >
      <div className="flex items-center">
        <div className="flow-root w-full">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-3 align-middle px-6 lg:px-8">
              <div className="shadow outline-solid outline-1 outline-black/5 rounded-lg bg-white p-4 lg:p-8">
                <LoadOrError queryResponse={queryResponse}>
                  <table className="relative min-w-full">
                    {tableHead}

                    {tableBody}
                  </table>
                </LoadOrError>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaginationControls
        hasNextPage={queryResponse?.data?.next ? true : false}
        isPlaceholderData={queryResponse?.isPlaceholderData}
        numberOfPages={queryResponse?.data?.pages}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}
// PROPTYPES
const { func, object, node, number } = PropTypes
DashboardTablePaginatedPresentation.propTypes = {
  queryResponse: object,
  tableHead: node,
  tableBody: node,
  page: number,
  setPage: func,
}

export default DashboardTablePaginatedPresentation
