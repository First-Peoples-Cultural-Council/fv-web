import React from 'react'
import { Link, useParams } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'
import SectionTitle from 'components/SectionTitle'
import { useStatsForWidget } from 'common/dataHooks/useStats'
import LoadOrError from 'components/LoadOrError'
import {
  STATS_TYPES_FOR_WIDGET,
  STATS_WORDS,
  STATS_PHRASES,
  STATS_SONGS,
  STATS_STORIES,
} from 'common/constants'

function WidgetStats() {
  const queryResponse = useStatsForWidget()
  const { sitename } = useParams()

  const getColorsForType = (type) => {
    switch (type) {
      case STATS_WORDS:
        return {
          background: 'bg-word-color-100',
          border: 'border-word-color-200',
          textLight: 'text-word-color-600',
          textDark: 'text-word-color-800',
        }
      case STATS_PHRASES:
        return {
          background: 'bg-phrase-color-100',
          border: 'border-phrase-color-200',
          textLight: 'text-phrase-color-600',
          textDark: 'text-phrase-color-700',
        }
      case STATS_SONGS:
        return {
          background: 'bg-song-color-100',
          border: 'border-song-color-200',
          textLight: 'text-song-color-800',
          textDark: 'text-song-color-900',
        }
      case STATS_STORIES:
      default:
        return {
          background: 'bg-story-color-100',
          border: 'border-story-color-200',
          textLight: 'text-story-color-600',
          textDark: 'text-story-color-800',
        }
    }
  }

  return (
    <section id="WidgetStats" className="py-3 md:py-6">
      <div className="mx-2 md:mx-5 lg:mx-10 mb-6 lg:mb-10">
        <SectionTitle.Presentation title="On This Site" />
      </div>
      <LoadOrError queryResponse={queryResponse} height="h-60">
        <div className="w-full">
          <div className="max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mx-4 sm:mx-8 lg:mx-10 xl:mx-auto text-center">
            {STATS_TYPES_FOR_WIDGET.map((type) => {
              const colors = getColorsForType(type)
              return (
                <div
                  key={type}
                  className={`flex-col w-full justify-center mx-auto col-span-1 rounded-md border ${colors.border} space-y-5 pt-5`}
                >
                  <div>
                    {getIcon(
                      type,
                      `fill-current ${colors.textLight} h-10 w-auto mx-auto`,
                    )}
                  </div>
                  <div className={`text-5xl font-bold ${colors.textLight}`}>
                    {queryResponse?.data?.[type]?.total}
                  </div>
                  <div
                    className={`text-xl uppercase font-bold ${colors.textLight}`}
                  >
                    {type}
                  </div>
                  <div
                    className={`text-base ${colors.textDark} ${queryResponse?.data?.[type]?.recent > 0 ? 'visible' : 'invisible'}`}
                  >
                    Recently updated: {queryResponse?.data?.[type]?.recent}
                  </div>
                  <Link
                    to={`/${sitename}/${type}`}
                    className={`w-full flex items-center justify-center space-x-4 border-t py-6 ${colors.border} ${colors.background} ${colors.textDark}`}
                  >
                    <span>View all</span>
                    {getIcon('RightArrowCircle', 'fill-current size-5')}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </LoadOrError>
    </section>
  )
}

export default WidgetStats
