import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import Widget from 'components/Widget'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn/InfiniteLoadBtn'

function DashboardWidgetsPresentation({
  infiniteQueryResponse,
  headerContent,
  tileContent,
  site,
}) {
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [currentWidget, setCurrentWidget] = useState({})

  return (
    <div id="DashboardWidgetsPresentation">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <DashboardTable.Presentation
          queryResponse={infiniteQueryResponse}
          tableHead={
            <tr>
              <th
                scope="col"
                className="py-3.5 pr-3 pl-6 rounded-l-lg text-left"
              >
                Name
              </th>
              <th scope="col" className="px-3 py-3.5 text-left">
                Type
              </th>
              <th scope="col" className="px-3 py-3.5">
                Edit
              </th>
              <th scope="col" className="py-3.5 pl-3 pr-6 rounded-r-lg">
                Preview
              </th>
            </tr>
          }
          tableBody={infiniteQueryResponse?.data?.pages?.map((page) => (
            <Fragment key={page.pageNumber}>
              {page?.results?.map((widget) => (
                <tr key={widget?.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {widget?.nickname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {widget?.typeLabel}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {widget?.editable ? (
                      <Link
                        to={`/${site?.sitename}/dashboard/edit/widget?id=${widget?.id}`}
                        data-testid="widget-edit-link"
                        className="btn-tertiary btn-md-icon"
                      >
                        {getIcon('Pencil')}
                      </Link>
                    ) : null}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button
                      data-testid="widget-preview-btn"
                      type="button"
                      onClick={() => {
                        setCurrentWidget(widget)
                        setPreviewModalOpen(true)
                      }}
                      className="btn-tertiary btn-md-icon"
                    >
                      {getIcon('Preview')}
                    </button>
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
          infiniteLoadBtn={
            <InfiniteLoadBtn infiniteQueryResponse={infiniteQueryResponse} />
          }
        />
        {/* Preview Modal */}
        <Modal.Presentation
          isOpen={previewModalOpen}
          closeHandler={() => setPreviewModalOpen(false)}
        >
          <div className="bg-white w-[90vw] mx-auto">
            <Widget.Container data={currentWidget} />
          </div>
        </Modal.Presentation>
      </DashboardLanding.Presentation>
    </div>
  )
}
// PROPTYPES
const { array, object } = PropTypes
DashboardWidgetsPresentation.propTypes = {
  infiniteQueryResponse: object,
  headerContent: object,
  site: object,
  tileContent: array,
}

export default DashboardWidgetsPresentation
