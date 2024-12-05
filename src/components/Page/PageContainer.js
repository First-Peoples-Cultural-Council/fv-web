import React from 'react'
import PropTypes from 'prop-types'

import PageData from 'components/Page/PageData'
import WidgetArea from 'components/WidgetArea'
import PageBanner from 'components/PageBanner'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function PageContainer({ pageSlug }) {
  const { banner, title, subtitle, widgets, pageQueryReturn } = PageData({
    pageSlug,
  })
  const { background, backgroundType, showLogo } = banner
  return (
    <LoadOrError queryReturn={pageQueryReturn}>
      <main id="CustomPage">
        {title && <SiteDocHead titleArray={[title]} description={subtitle} />}
        <PageBanner.Presentation
          variant={subtitle ? 'CENTER' : 'LEFT'}
          background={background}
          backgroundType={backgroundType}
          textNode={
            <div>
              <h1 className="font-bold text-3xl lg:text-5xl p-3">{title}</h1>
              <p>{subtitle}</p>
            </div>
          }
          showLogo={showLogo}
        />
        <div className="pb-16 max-w-7xl mx-auto">
          <WidgetArea.Container widgetData={widgets} />
        </div>
      </main>
    </LoadOrError>
  )
}

// PROPTYPES
const { string } = PropTypes
PageContainer.propTypes = {
  pageSlug: string,
}

export default PageContainer
