import React from 'react'

// FPCC
import SiteKeyboardsPresentation from 'components/SiteKeyboards/SiteKeyboardsPresentation'
import { useSiteStore } from 'context/SiteContext'
import { usePage } from 'common/dataHooks/usePages'
import SectionTitle from 'components/SectionTitle'
import Widget from 'components/Widget'
import SiteDocHead from 'components/SiteDocHead'
import LoadOrError from 'components/LoadOrError'

function SiteKeyboardsContainer() {
  const { site } = useSiteStore()

  const queryResponse = usePage({
    pageSlug: 'keyboards',
  })

  return (
    <div
      data-testid="SiteKeyboardsContainer"
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
    >
      <SiteDocHead titleArray={['Keyboards']} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation title="KEYBOARDS" />
        <LoadOrError queryResponse={queryResponse}>
          {queryResponse?.data?.widgets?.map((widget) => (
            <div key={widget?.id} className="flex lg:my-4">
              <Widget.Container data={widget} />
            </div>
          ))}
        </LoadOrError>
        <SiteKeyboardsPresentation title={site?.title} />
      </div>
    </div>
  )
}

export default SiteKeyboardsContainer
