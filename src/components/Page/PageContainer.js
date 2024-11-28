import React from 'react'
import PropTypes from 'prop-types'

import PageData from 'components/Page/PageData'
import WidgetArea from 'components/WidgetArea'
import PageBanner from 'components/PageBanner'
import ErrorHandler from 'components/ErrorHandler'
import SiteDocHead from 'components/SiteDocHead'

function PageContainer({ pageSlug }) {
  const { banner, title, subtitle, widgets, notFound } = PageData({ pageSlug })
  const { background, backgroundType, showLogo } = banner
  return notFound ? (
    <ErrorHandler.Container
      error={{ status: 404, statusText: 'Page not found' }}
    />
  ) : (
    <main id="CustomPage">
      {title && <SiteDocHead titleArray={[title]} description={subtitle} />}
      <PageBanner.Presentation
        variant={subtitle ? 'CENTER' : 'LEFT'}
        background={background}
        backgroundType={backgroundType}
        textNode={
          <div>
            <h1 className="font-bold text-5xl p-3">{title}</h1>
            <p>{subtitle}</p>
          </div>
        }
        showLogo={showLogo}
      />
      <div className="pb-16 max-w-7xl mx-auto">
        <WidgetArea.Container widgetData={widgets} />
      </div>
    </main>
  )
}

// PROPTYPES
const { string } = PropTypes
PageContainer.propTypes = {
  pageSlug: string,
}

export default PageContainer
