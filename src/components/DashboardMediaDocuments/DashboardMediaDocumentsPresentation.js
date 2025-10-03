import React from 'react'
import PropTypes from 'prop-types'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import { DOCUMENT_PATH } from 'common/constants'
import DashboardMediaDetails from 'components/DashboardMediaDetails'
import getIcon from 'common/utils/getIcon'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'

function DashboardMediaDocumentsPresentation({
  infiniteQueryResponse,
  currentFile,
  setCurrentFile,
}) {
  const headerClass =
    'px-6 py-3 text-xs font-medium text-charcoal-900 uppercase tracking-wider'
  const columnClass =
    'px-6 py-4 text-sm text-charcoal-900 whitespace-nowrap truncate text-center align-middle'

  return (
    <div
      id="DashboardMediaDocumentsPresentation"
      className="grid grid-cols-3 w-full"
    >
      <SiteDocHead titleArray={['Documents']} />
      <main className="col-span-2 pt-2 mx-2">
        <section className="p-2 h-full" aria-labelledby="results-header">
          <h1
            id="results-header"
            className="capitalize flex text-2xl font-bold text-charcoal-900 mb-2"
          >
            Documents
          </h1>
          <div>
            <div>
              <table className="w-full table-fixed divide-y divide-charcoal-100">
                <thead className="bg-charcoal-50">
                  <tr>
                    <th scope="col" className={headerClass}>
                      Title
                    </th>
                    <th scope="col" className={headerClass}>
                      Type
                    </th>
                    <th scope="col" className={headerClass}>
                      Date Created
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-charcoal-100">
                  {infiniteQueryResponse?.data?.pages?.[0]?.results?.length &&
                    infiniteQueryResponse?.data?.pages?.map((page) => (
                      <React.Fragment key={page?.pageNumber}>
                        {page.results.map((doc) => (
                          <tr
                            key={doc?.id}
                            className={`${
                              doc?.id === currentFile?.id
                                ? 'ring-2 ring-scarlet-800'
                                : ''
                            } m-2 rounded-lg relative`}
                            onClick={() => setCurrentFile(doc)}
                          >
                            <td className={columnClass}>{doc.title}</td>
                            <td className={columnClass}>{doc.mimeType}</td>
                            <td className={columnClass}>{doc.created}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
              <InfiniteLoadBtn infiniteQueryResponse={infiniteQueryResponse} />
            </div>
          </div>
        </section>
      </main>
      <aside className="col-span-1">
        <DashboardMediaDetails
          mediaTypePath={DOCUMENT_PATH}
          file={currentFile}
          thumbnail={
            <div className="block w-full">
              {getIcon(
                'Reports',
                'h-32 mx-auto fill-current text-charcoal-300',
              )}
            </div>
          }
        />
      </aside>
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes
DashboardMediaDocumentsPresentation.propTypes = {
  infiniteQueryResponse: object,
  currentFile: object,
  setCurrentFile: func,
}

export default DashboardMediaDocumentsPresentation
