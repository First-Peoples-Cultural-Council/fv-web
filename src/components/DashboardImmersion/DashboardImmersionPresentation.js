import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import ImmersionCrudForm from 'components/DashboardImmersion/ImmersionCrudForm'
import getIcon from 'common/utils/getIcon'
import Form from 'components/Form'

function DashboardImmersionPresentation({
  queryResponse,
  headerContent,
  tileContent,
  site,
  currentLabel,
  setCurrentLabel,
  submitHandler,
}) {
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
        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-4">
            <DashboardTable.Presentation
              queryResponse={queryResponse}
              title="Immersion Labels"
              tableHead={
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    Label
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    English Label
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Audio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                </tr>
              }
              tableBody={queryResponse?.data?.labels.map((label) => (
                <tr
                  key={label?.transKey}
                  onClick={() => setCurrentLabel(label)}
                  className="hover:bg-charcoal-50 cursor-pointer"
                >
                  <td className="px-6 py-3">{label?.immersionLabel || '-'}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {label?.english}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center">
                      {getIndicatorIcon(label?.relatedAudio)}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="btn-md-icon btn-tertiary">
                      {getIcon('Pencil')}
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
const { array, func, object } = PropTypes
DashboardImmersionPresentation.propTypes = {
  queryResponse: object,
  headerContent: object,
  site: object,
  tileContent: array,
  currentLabel: object,
  setCurrentLabel: func,
  submitHandler: func,
}

export default DashboardImmersionPresentation
