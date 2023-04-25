import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

import PageData from 'components/Page/PageData'
import WidgetContainer from 'components/Widget/WidgetContainer'
import PageBanner from 'components/PageBanner'
import ErrorHandler from 'components/ErrorHandler'

function PageContainer({ url }) {
  const { banner, title, subtitle, widgets, notFound } = PageData({ url })
  const { backgroundId, backgroundType, logoId } = banner
  return notFound ? (
    <ErrorHandler.Container
      error={{ status: 404, statusText: 'Page not found' }}
    />
  ) : (
    <main id="CustomPage">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
      </Helmet>
      <PageBanner.Presentation
        variant={subtitle ? 'CENTER' : 'LEFT'}
        backgroundId={backgroundId}
        backgroundType={backgroundType}
        textNode={
          <div>
            <h1 className="font-bold text-5xl p-3">{title}</h1>
            <p>{subtitle}</p>
          </div>
        }
        logoId={logoId}
      />
      <div className="pb-16 max-w-7xl mx-auto">
        {widgets &&
          widgets.map((widget, index) => (
            <WidgetContainer key={index} id={widget} />
          ))}
      </div>
    </main>
  )
}

// PROPTYPES
const { string } = PropTypes
PageContainer.propTypes = {
  url: string,
}

export default PageContainer
