import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import Widget from 'components/Widget'

function DashboardWidgetsPresentation({
  headerContent,
  isLoading,
  tileContent,
  widgets,
  site,
}) {
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [currentWidget, setCurrentWidget] = useState({})
  const tableHeaderClass =
    'px-6 py-3 text-left text-xs font-medium text-fv-charcoal uppercase tracking-wider'

  return (
    <div id="DashboardWidgetsPresentation" className="space-y-5">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <DashboardTable.Presentation
          isLoading={isLoading}
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
          tableBody={widgets.map((widget) => (
            <tr key={widget?.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {widget?.nickname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-fv-charcoal">
                {widget?.typeLabel}
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                {widget?.editable ? (
                  <Link
                    to={`/${site?.sitename}/dashboard/edit/widget?id=${widget?.id}`}
                    className="text-secondary hover:text-secondary-dark flex items-center"
                  >
                    {getIcon('Pencil', 'fill-current w-6 h-6 mr-2')}
                  </Link>
                ) : null}
              </td>
              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentWidget(widget)
                    setPreviewModalOpen(true)
                  }}
                  className="text-secondary hover:text-secondary-dark flex items-center"
                >
                  {getIcon('Preview', 'fill-current w-6 h-6 mr-2', 'Preview')}
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
const { array, bool, object } = PropTypes
DashboardWidgetsPresentation.propTypes = {
  widgets: array,
  headerContent: object,
  isLoading: bool,
  site: object,
  tileContent: array,
}

export default DashboardWidgetsPresentation
