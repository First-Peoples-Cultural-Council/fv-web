import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import PageData from 'components/Page/PageData'
import WidgetArea from 'components/WidgetArea'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'
import BannerBackground from 'components/BannerBackground'
import PagePresentation from 'components/Page/PagePresentation'

function PageContainer({ pageSlug }) {
  const {
    bannerImage,
    bannerVideo,
    showLogo,
    title,
    subtitle,
    widgets,
    pageQueryResponse,
  } = PageData({
    pageSlug,
  })

  const hasMedia = bannerImage || bannerVideo

  return (
    <LoadOrError queryResponse={pageQueryResponse}>
      <main id="CustomPage">
        {title && <SiteDocHead titleArray={[title]} description={subtitle} />}
        <BannerBackground
          bannerImage={bannerImage}
          bannerVideo={bannerVideo}
          bgColor="bg-white"
        >
          <PagePresentation
            title={title}
            subtitle={subtitle}
            hasMedia={hasMedia}
            showLogo={showLogo}
          />
        </BannerBackground>
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
