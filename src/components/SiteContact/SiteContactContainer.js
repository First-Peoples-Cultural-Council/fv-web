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
  const queryResponse = useOrganizations({ page: 1 })

  return (
    <LoadOrError queryResponse={queryResponse}>
      <main id="SiteContactPresentation" className="py-2 md:py-4 lg:py-8">
        <SiteDocHead titleArray={['Contact']} />
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-2 lg:mb-6">
            <SectionTitle.Presentation title="Contact" />
            <div className="sr-only">for {site?.title}</div>
          </div>
          <div className="mx-auto max-w-4xl md:space-y-2 pb-6 lg:pb-12">
            <div className="divide-y divide-charcoal-300 space-y-8">
              {queryResponse?.data?.results?.map((organization) => (
                <SiteContactOrganization
                  key={organization?.id}
                  organization={organization}
                />
              ))}
            </div>

            <section className="space-y-6">
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
