import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardLanding from 'components/DashboardLanding'
import DashboardTable from 'components/DashboardTable'
import ImmersionCrud from 'components/ImmersionCrud'
import getIcon from 'common/getIcon'
// import en from 'assets/locale/en'

function DashboardImmersionPresentation({
  headerContent,
  isLoading,
  tileContent,
  labels,
  site,
}) {
  const [currentLabel, setCurrentLabel] = useState()
  const tableHeaderClass =
    'px-6 py-3 text-xs font-medium text-fv-charcoal uppercase tracking-wider'

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
        <div className="grid grid-cols-5">
          <div className="col-span-3">
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
                  <td className="px-6 py-4 whitespace-nowrap text-fv-charcoal">
                    {label?.immersionLabel || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-fv-charcoal">
                    {label?.english}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-fv-charcoal">
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
            <ImmersionCrud.Container label={currentLabel} />
          </div>
        </div>
      </DashboardLanding.Presentation>
    </div>
  )
}
// PROPTYPES
const { array, bool, object, string } = PropTypes
DashboardImmersionPresentation.propTypes = {
  labels: array,
  headerContent: object,
  isLoading: bool,
  site: object,
  sitename: string,
  tileContent: array,
}

export default DashboardImmersionPresentation
