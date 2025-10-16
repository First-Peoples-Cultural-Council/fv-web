import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router'

// FPCC
import LoadOrError from 'components/LoadOrError'
import EntryDetail from 'components/EntryDetail'
import getIcon from 'common/utils/getIcon'
import DashboardDrawer from 'components/DashboardDrawer'
import { makePlural } from 'common/utils/urlHelpers'
import SortByHeader from 'components/DashboardEntries/SortByHeader'
import useAuthCheck from 'common/hooks/useAuthCheck'
import {
  SORT_ALPHABETICAL,
  SORT_ALPHABETICAL_DESC,
  SORT_CREATED,
  SORT_CREATED_DESC,
  SORT_MODIFIED,
  SORT_MODIFIED_DESC,
} from 'common/constants'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'
import Tooltip from 'components/Tooltip'

function DashboardEntriesPresentationList({
  searchInfiniteQueryResponse,
  emptyListMessage,
  entryLabel = 'Language Entry',
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const { sitename } = useParams()
  const { checkIfUserCanEdit } = useAuthCheck()

  function handleItemClick(item) {
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  const tableHeaderClass =
    'p-4 text-left text-xs font-medium text-charcoal-900 uppercase tracking-wider'

  return (
    <LoadOrError queryResponse={searchInfiniteQueryResponse}>
      <section
        data-testid="EntriesListPresentation"
        className="bg-white min-h-screen w-full rounded-lg overflow-hidden"
      >
        {searchInfiniteQueryResponse?.data?.hasResults ? (
          <div className="flex flex-col w-full">
            <div className="border-b border-charcoal-200">
              <table className="table-auto w-full divide-y divide-charcoal-200">
                <thead className="bg-charcoal-50">
                  <tr>
                    <th
                      scope="col"
                      aria-labelledby={SORT_ALPHABETICAL}
                      className="pl-6 pr-4 py-4 text-left text-xs font-medium text-charcoal-900 uppercase tracking-wider"
                    >
                      <SortByHeader
                        id={SORT_ALPHABETICAL}
                        title={entryLabel}
                        asc={SORT_ALPHABETICAL}
                        desc={SORT_ALPHABETICAL_DESC}
                      />
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Translation
                    </th>
                    <th
                      scope="col"
                      aria-labelledby={SORT_CREATED}
                      className={tableHeaderClass}
                    >
                      <SortByHeader
                        id={SORT_CREATED}
                        title="Created"
                        asc={SORT_CREATED}
                        desc={SORT_CREATED_DESC}
                      />
                    </th>
                    <th
                      scope="col"
                      aria-labelledby={SORT_MODIFIED}
                      className={tableHeaderClass}
                    >
                      <SortByHeader
                        id={SORT_MODIFIED}
                        title="Last modified"
                        asc={SORT_MODIFIED}
                        desc={SORT_MODIFIED_DESC}
                      />
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Type
                    </th>
                    <th scope="col" className={`relative ${tableHeaderClass}`}>
                      Edit
                    </th>
                    <th scope="col" className={`relative ${tableHeaderClass}`}>
                      Preview
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-charcoal-200 text-charcoal-900">
                  {searchInfiniteQueryResponse?.data?.pages.map((page) => (
                    <Fragment key={page?.pageNumber}>
                      {page.results.map((entry) => (
                        <tr
                          data-testid="EntryRow"
                          key={entry?.id}
                          className="w-full hover:bg-charcoal-50"
                        >
                          <td>
                            <button
                              data-testid="click-title"
                              type="button"
                              onClick={() => handleItemClick(entry)}
                              className="btn-teriary btn-md text-left pl-6"
                            >
                              {entry?.title}
                            </button>
                          </td>
                          <td>
                            <button
                              data-testid="click-translations"
                              type="button"
                              className="btn-tertairy btn-md"
                              onClick={() => handleItemClick(entry)}
                            >
                              {/* For Dictionary Entries */}
                              {entry?.translations && (
                                <ol className="text-charcoal-900 text-left">
                                  {entry?.translations.map((translation, i) => (
                                    <li key={translation?.text}>
                                      {entry?.translations.length > 1
                                        ? `${i + 1}. `
                                        : null}{' '}
                                      {translation?.text}
                                    </li>
                                  ))}
                                </ol>
                              )}
                              {/* For Songs and Stories */}
                              {entry?.titleTranslation && (
                                <div className="text-charcoal-900 text-left">
                                  {entry?.titleTranslation}
                                </div>
                              )}
                            </button>
                          </td>
                          <td className="p-4 text-charcoal-900 text-xs text-left">
                            <p>{entry?.created}</p>
                            <p className="whitespace-nowrap">
                              {entry?.createdBy && `by ${entry.createdBy}`}
                            </p>
                          </td>
                          <td className="p-4 text-charcoal-900 text-xs text-left">
                            <p>{entry?.lastModified}</p>
                            <p className="whitespace-nowrap">
                              {entry?.lastModifiedBy &&
                                `by ${entry?.lastModifiedBy}`}
                            </p>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs font-medium rounded-full bg-${entry?.type?.toLowerCase()}-color-700 capitalize text-white`}
                            >
                              {entry?.type}
                            </span>
                          </td>
                          <td>
                            {checkIfUserCanEdit(entry) ? (
                              <Link
                                to={`/${sitename}/dashboard/edit/${entry?.type}?id=${entry?.id}`}
                                className="btn-md-icon btn-tertiary"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {getIcon('Pencil')}
                              </Link>
                            ) : (
                              <Tooltip message="You do not have access to edit this.">
                                <button
                                  data-testid="edit-link"
                                  type="button"
                                  disabled
                                  className="btn-md-icon btn-tertiary"
                                >
                                  {getIcon('Pencil')}
                                </button>
                              </Tooltip>
                            )}
                          </td>
                          <td>
                            <button
                              data-testid={`${entry?.title}-preview`}
                              type="button"
                              onClick={() => handleItemClick(entry)}
                              className="btn-md-icon btn-tertiary"
                            >
                              {getIcon('Preview')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <InfiniteLoadBtn
              infiniteQueryResponse={searchInfiniteQueryResponse}
            />
          </div>
        ) : (
          <div className="w-full flex">
            <div className="mx-6 mt-4 text-center md:mx-auto md:mt-20">
              {emptyListMessage}
            </div>
          </div>
        )}
      </section>

      <DashboardDrawer.Presentation
        isOpen={drawerOpen}
        closeHandler={() => setDrawerOpen(false)}
      >
        {selectedItem?.type && (
          <>
            <div className="flex justify-center my-2 space-x-2">
              {checkIfUserCanEdit(selectedItem) ? (
                <Link
                  to={`/${sitename}/dashboard/edit/${selectedItem?.type}?id=${selectedItem?.id}`}
                  data-testid="EntryDrawerEdit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary btn-md"
                >
                  {getIcon('Pencil')}
                  <span>Edit</span>
                </Link>
              ) : (
                <div className="btn-secondary btn-md">
                  <span className="tooltip rounded-sm shadow-lg p-1 bg-charcoal-50 text-charcoal-900 text-xs -mt-10 -ml-10">
                    You do not have access to edit this.
                  </span>
                  {getIcon('Pencil')}
                  <span>Edit</span>
                </div>
              )}
              <Link
                to={`/${sitename}/${makePlural(selectedItem?.type)}/${
                  selectedItem?.id
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-md"
              >
                {getIcon('Fullscreen')}
                <span>View on site</span>
              </Link>
            </div>
            <EntryDetail.Container
              id={selectedItem?.id}
              type={selectedItem?.type}
              isDrawer
              isDashboard
            />
          </>
        )}
      </DashboardDrawer.Presentation>
    </LoadOrError>
  )
}

// PROPTYPES
const { object, string } = PropTypes
DashboardEntriesPresentationList.propTypes = {
  searchInfiniteQueryResponse: object,
  emptyListMessage: string,
  entryLabel: string,
}

export default DashboardEntriesPresentationList
