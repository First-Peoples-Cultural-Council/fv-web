import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import getIcon from 'common/utils/getIcon'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn/InfiniteLoadBtn'

function DashboardSpeakersPresentation({
  infiniteQueryResponse,
  headerContent,
  tileContent,
  site,
}) {
  const tableHeaderClass =
    'px-6 py-3 text-left text-xs font-medium text-charcoal-900 uppercase tracking-wider'
  return (
    <div id="DashboardSpeakersPresentation" className="space-y-5">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        {infiniteQueryResponse?.hasResults && (
          <div>
            <DashboardTable.Presentation
              queryResponse={infiniteQueryResponse}
              title="Speakers"
              tableHead={
                <tr>
                  <th scope="col" className={tableHeaderClass}>
                    Name
                  </th>
                  <th scope="col" className={tableHeaderClass}>
                    Bio
                  </th>
                  {/* `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile. */}
                  <th scope="col" className={`relative ${tableHeaderClass}`}>
                    <span className="sr-only">Edit speaker</span>
                  </th>
                </tr>
              }
              tableBody={infiniteQueryResponse?.data?.pages?.map((page) => (
                <Fragment key={page.pageNumber}>
                  {page.results.map((speaker) => (
                    <tr key={speaker?.id}>
                      <td className="px-6 py-4 whitespace-normal text-sm font-medium text-charcoal-900">
                        {speaker?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-charcoal-900">
                        {speaker?.bio || '-'}
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          data-testid={`edit-speaker-${speaker?.name}`}
                          to={`/${site?.sitename}/dashboard/edit/speaker?id=${speaker?.id}`}
                          className="btn-tertiary btn-md-icon mr-6"
                        >
                          {getIcon('Pencil')}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
              infiniteLoadBtn={
                <InfiniteLoadBtn
                  infiniteQueryResponse={infiniteQueryResponse}
                />
              }
            />
          </div>
        )}
      </DashboardLanding.Presentation>
    </div>
  )
}
// PROPTYPES
const { array, object } = PropTypes
DashboardSpeakersPresentation.propTypes = {
  infiniteQueryResponse: object,
  headerContent: object,
  site: object,
  tileContent: array,
}

export default DashboardSpeakersPresentation
