import React from 'react'

// FPCC
import SiteContactOrganization from 'components/SiteContactOrganization'
import { useSiteStore } from 'context/SiteContext'
import { useOrganizations } from 'common/dataHooks/useOrganizations'
import LoadOrError from 'components/LoadOrError'
import SectionTitle from 'components/SectionTitle'
import SiteContactForm from 'components/SiteContactForm'
import SiteDocHead from 'components/SiteDocHead'

function SiteContactContainer() {
  const { site } = useSiteStore()
  const infiniteQueryResponse = useOrganizations()

  return (
    <LoadOrError queryResponse={infiniteQueryResponse}>
      <main id="SiteContactPresentation" className="py-2 md:py-4 lg:py-8">
        <SiteDocHead titleArray={['Contact']} />
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-6 lg:mb-10 space-y-4">
            <SectionTitle.Presentation title="Contact" />
            <div className="sr-only">for {site?.title}</div>
          </div>
          <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
            {infiniteQueryResponse?.data?.pages?.map((page) => (
              <React.Fragment key={page?.pageNumber}>
                {page.results.map((organization) => (
                  <SiteContactOrganization
                    key={organization?.id}
                    organization={organization}
                  />
                ))}
              </React.Fragment>
            ))}
            <section className="space-y-6 pb-6 lg:pb-12">
              <h2 className="text-3xl text-blumine-800">Send us a message.</h2>
              <SiteContactForm.Container />
            </section>
          </div>
        </div>
      </main>
    </LoadOrError>
  )
}

export default SiteContactContainer
