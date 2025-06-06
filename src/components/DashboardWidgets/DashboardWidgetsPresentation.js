import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import Widget from 'components/Widget'

function DashboardWidgetsPresentation({
  queryResponse,
  headerContent,
  tileContent,
  site,
}) {
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [currentWidget, setCurrentWidget] = useState({})
  const tableHeaderClass =
    'px-6 py-3 text-left text-xs font-medium text-charcoal-900 uppercase tracking-wider'

  return (
    <div id="DashboardWidgetsPresentation" className="space-y-5">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <DashboardTable.Presentation
          queryResponse={queryResponse}
          title="Widgets"
          tableHead={
            <tr>
              <th scope="col" className={tableHeaderClass}>
                Name
              </th>
              <th scope="col" className={tableHeaderClass}>
                Type
              </th>
              {/* `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile. */}
              <th scope="col" className={`relative ${tableHeaderClass}`}>
                <span className="sr-only">Edit Widget</span>
              </th>
              <th scope="col" className={`relative ${tableHeaderClass}`}>
                <span className="sr-only">Preview Widget</span>
              </th>
            </tr>
          }
          tableBody={queryResponse?.widgets?.map((widget) => (
            <tr key={widget?.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-charcoal-900">
                {widget?.nickname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-900">
                {widget?.typeLabel}
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                {widget?.editable ? (
                  <Link
                    to={`/${site?.sitename}/dashboard/edit/widget?id=${widget?.id}`}
                    className="btn-tertiary btn-md-icon"
                  >
                    {getIcon('Pencil')}
                  </Link>
                ) : null}
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  data-testid="widget-preview-btn"
                  type="button"
                  onClick={() => {
                    setCurrentWidget(widget)
                    setPreviewModalOpen(true)
                  }}
                  className="btn-tertiary btn-md-icon mr-6"
                >
                  {getIcon('Preview')}
                </button>
              </td>
            </tr>
          ))}
        />
        {/* Preview Modal */}
        <Modal.Presentation
          isOpen={previewModalOpen}
          closeHandler={() => setPreviewModalOpen(false)}
        >
          <div className="bg-white w-4/5-screen mx-auto p-5 rounded-lg">
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
  queryResponse: object,
  headerContent: object,
  site: object,
  tileContent: array,
}

export default DashboardWidgetsPresentation
