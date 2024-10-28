import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import ImmersionCrudForm from 'components/DashboardImmersion/ImmersionCrudForm'
import getIcon from 'common/utils/getIcon'
import Form from 'components/Form'

function DashboardImmersionPresentation({
  headerContent,
  isLoading,
  tileContent,
  labels,
  site,
  currentLabel,
  setCurrentLabel,
  submitHandler,
}) {
  const tableHeaderClass =
    'px-6 py-3 text-xs font-medium text-charcoal-900 uppercase tracking-wider'

  const getIndicatorIcon = (dataArray) => {
    const icon = dataArray?.length > 0 ? 'Checkmark' : 'Minus'
    return getIcon(icon, 'fill-current w-6 h-6')
  }

  return (
    <div id="DashboardImmersionPresentation" className="space-y-5">
      <DashboardLanding.Presentation
        tileContent={tileContent}
        headerContent={headerContent}
        site={site}
      >
        <div className="grid grid-cols-6">
          <div className="col-span-4">
            <DashboardTable.Presentation
              isLoading={isLoading}
              title="Immersion Labels"
              tableHead={
                <tr>
                  <th scope="col" className={`${tableHeaderClass} text-left`}>
                    Label
                  </th>
                  <th scope="col" className={`${tableHeaderClass} text-left`}>
                    English Label
                  </th>
                  <th scope="col" className={`${tableHeaderClass} text-center`}>
                    Audio
                  </th>
                  {/* `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile. */}
                  <th scope="col" className={`relative ${tableHeaderClass}`}>
                    <span className="sr-only">Edit character</span>
                  </th>
                </tr>
              }
              tableBody={labels.map((label) => (
                <tr
                  key={label?.transKey}
                  onClick={() => setCurrentLabel(label)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-6 py-4 text-charcoal-900">
                    {label?.immersionLabel || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-charcoal-900">
                    {label?.english}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-charcoal-900">
                    <div className="flex justify-center">
                      {getIndicatorIcon(label?.relatedAudio)}
                    </div>
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="text-secondary hover:text-secondary-dark flex items-center">
                      {getIcon('Pencil', 'fill-current w-6 h-6 mr-2')}
                    </div>
                  </td>
                </tr>
              ))}
            />
          </div>
          <div className="col-span-2">
            <div className="py-8 pr-8">
              {currentLabel?.transKey ? (
                <ImmersionCrudForm
                  dataToEdit={currentLabel}
                  submitHandler={submitHandler}
                  site={site}
                />
              ) : (
                <Form.Header title="Select a label to edit" />
              )}
            </div>
          </div>
        </div>
      </DashboardLanding.Presentation>
    </div>
  )
}
// PROPTYPES
const { array, bool, func, object } = PropTypes
DashboardImmersionPresentation.propTypes = {
  labels: array,
  headerContent: object,
  isLoading: bool,
  site: object,
  tileContent: array,
  currentLabel: object,
  setCurrentLabel: func,
  submitHandler: func,
}

export default DashboardImmersionPresentation
