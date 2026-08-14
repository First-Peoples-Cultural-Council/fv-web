import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import SingleSelect from 'components/SingleSelect'
import {
  YEAR,
  SIX_MONTHS,
  THREE_MONTHS,
  MONTH,
  WEEK,
  STATS_WORDS,
  STATS_PHRASES,
  STATS_SONGS,
  STATS_STORIES,
} from 'common/constants'

function DashboardStatsPresentation({ data }) {
  const stats = [
    {
      id: 1,
      name: 'Words',
      stat: STATS_WORDS,
      icon: 'Word',
      color: 'word-color-600',
      aggregateData: data?.aggregate?.[STATS_WORDS],
      temporalData: data?.temporal?.[STATS_WORDS],
    },
    {
      id: 2,
      name: 'Phrases',
      stat: STATS_PHRASES,
      icon: 'Phrase',
      color: 'phrase-color-700',
      aggregateData: data?.aggregate?.[STATS_PHRASES],
      temporalData: data?.temporal?.[STATS_PHRASES],
    },
    {
      id: 3,
      name: 'Songs',
      stat: STATS_SONGS,
      icon: 'Song',
      color: 'song-color-900',
      aggregateData: data?.aggregate?.[STATS_SONGS],
      temporalData: data?.temporal?.[STATS_SONGS],
    },
    {
      id: 4,
      name: 'Stories',
      stat: STATS_STORIES,
      icon: 'Story',
      color: 'story-color-700',
      aggregateData: data?.aggregate?.[STATS_STORIES],
      temporalData: data?.temporal?.[STATS_STORIES],
    },
  ]

  const timePeriodOptions = [
    { id: '1', value: '', label: 'On your site' },
    { id: '2', value: WEEK, label: 'Past week' },
    { id: '3', value: MONTH, label: 'Past month' },
    { id: '4', value: THREE_MONTHS, label: 'Past 3 months' },
    { id: '5', value: SIX_MONTHS, label: 'Past 6 months' },
    { id: '6', value: YEAR, label: 'Past year' },
  ]

  const [selectedTimePeriod, setSelectedTimePeriod] = useState(
    timePeriodOptions[0],
  )

  const changePeriod = (timePeriod) => {
    setSelectedTimePeriod(timePeriod)
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-charcoal-900">
        <SingleSelect
          id="stats-time-period"
          selectedOption={selectedTimePeriod}
          options={timePeriodOptions}
          handleChange={changePeriod}
        />
      </h3>

      <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="rounded-lg bg-white shadow py-4 px-6 space-y-6"
          >
            <div className="flex items-start space-x-4">
              <div
                className={`flex  shrink-none items-center justify-center rounded-md p-3 bg-${item.color} size-16`}
              >
                {getIcon(item.icon, 'size-8 fill-current text-white')}
              </div>
              <div>
                <div className=" text-charcoal-500">{item.name}</div>
                <div className="text-3xl font-bold text-charcoal-900">
                  {selectedTimePeriod?.value ? '' : item.aggregateData?.total}
                </div>
              </div>
            </div>
            {selectedTimePeriod?.value ? (
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-4xl font-bold text-charcoal-900">
                    {item.temporalData?.[selectedTimePeriod?.value]?.created > 0
                      ? '+'
                      : ''}
                    {item.temporalData?.[selectedTimePeriod?.value]?.created}
                  </div>
                  <div className="text-sm text-charcoal-500">
                    New <span className="sr-only"> {item.name}</span>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-charcoal-900">
                    {/* `lastModified` includes `created` - subtracting created to get updates only */}
                    {item.temporalData?.[selectedTimePeriod?.value]
                      ?.lastModified -
                      item.temporalData?.[selectedTimePeriod?.value]?.created}
                  </div>
                  <div className="text-sm text-charcoal-500">
                    Updated <span className="sr-only"> {item.name}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-2" />
            )}

            <div>
              <div className="flex justify-between px-1">
                <div className="text-center text-charcoal-600">
                  <div className="font-bold text-xl">
                    {selectedTimePeriod?.value
                      ? item.temporalData?.[selectedTimePeriod?.value]?.team
                      : item.aggregateData?.team}
                  </div>
                  {getIcon('Team', 'size-5 mx-auto fill-current')}
                  <div className="text-xs">
                    Team <span className="sr-only"> {item.name}</span>
                  </div>
                </div>
                <div className="text-center text-charcoal-600">
                  <div className="font-bold text-xl">
                    {selectedTimePeriod?.value
                      ? item.temporalData?.[selectedTimePeriod?.value]?.members
                      : item.aggregateData?.members}
                  </div>
                  {getIcon('Members', 'size-5 mx-auto fill-current')}
                  <div className="text-xs">
                    Members <span className="sr-only"> {item.name}</span>
                  </div>
                </div>
                <div className="text-center text-charcoal-600">
                  <div className="font-bold text-xl">
                    {selectedTimePeriod?.value
                      ? item.temporalData?.[selectedTimePeriod?.value]?.public
                      : item.aggregateData?.public}
                  </div>
                  {getIcon('Public', 'size-5 mx-auto fill-current')}
                  <div className="text-xs">
                    Public <span className="sr-only"> {item.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
DashboardStatsPresentation.propTypes = {
  data: object,
}

export default DashboardStatsPresentation
