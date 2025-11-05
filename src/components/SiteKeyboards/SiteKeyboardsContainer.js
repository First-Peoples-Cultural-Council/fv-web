import React from 'react'

// FPCC
import SiteKeyboardsPresentation from 'components/SiteKeyboards/SiteKeyboardsPresentation'
import { useSiteStore } from 'context/SiteContext'
import { usePage } from 'common/dataHooks/usePages'
import SectionTitle from 'components/SectionTitle'
import SiteDocHead from 'components/SiteDocHead'
import WidgetArea from 'components/WidgetArea'

function SiteKeyboardsContainer() {
  const { site } = useSiteStore()

  const queryResponse = usePage({
    pageSlug: 'keyboards',
  })

  return (
    <div
      data-testid="SiteKeyboardsContainer"
      className="max-w-7xl mx-auto pt-2 md:pt-4 lg:pt-8 bg-white"
    >
      <SiteDocHead titleArray={['Keyboards']} />
      <div className="px-4 sm:px-6 lg:px-8 space-y-4">
        <SectionTitle.Presentation title="KEYBOARDS" />

        {queryResponse?.data?.widgets?.length > 0 && (
          <WidgetArea.Container widgetData={queryResponse?.data?.widgets} />
        )}

        <SiteKeyboardsPresentation title={site?.title} />
      </div>
    </div>
  )
}

export default SiteKeyboardsContainer
