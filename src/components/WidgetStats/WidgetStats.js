import React from 'react'

// FPCC
import getIcon from 'common/utils/getIcon'
import SectionTitle from 'components/SectionTitle'
import { useStatsForWidget } from 'common/dataHooks/useStats'
import LoadOrError from 'components/LoadOrError'
import { STATS_TYPES_FOR_WIDGET } from 'common/constants'

function WidgetStats() {
  const queryResponse = useStatsForWidget()

  return (
    <section id="WidgetStats" className="py-3 md:py-6">
      <div className="mx-2 md:mx-5 lg:mx-10 mb-6 lg:mb-10">
        <SectionTitle.Presentation title="On This Site" />
      </div>
      <LoadOrError queryResponse={queryResponse} height="h-60">
        <div className="w-full">
          <div className="max-w-6xl grid grid-cols-4 mx-auto text-center">
            {STATS_TYPES_FOR_WIDGET.map((type) => (
              <div
                key={type}
                className="flex-col justify-center mx-auto col-span-1 space-y-5"
              >
                <div>
                  {getIcon(
                    type,
                    'fill-current text-ochre-500 h-10 md:h-12 lg:h-14 w-auto mx-auto',
                  )}
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-medium">
                  {queryResponse?.data?.[type]?.total || '-'}
                </div>
                <div className="text-base capitalize">{type}</div>
                <div className="text-base font-thin">
                  Recently updated: {queryResponse?.data?.[type]?.recent}
                </div>
              </div>
            ))}
          </div>
        </div>
      </LoadOrError>
    </section>
  )
}

export default WidgetStats
