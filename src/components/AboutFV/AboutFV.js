import React from 'react'
import SectionTitle from 'components/SectionTitle'

function AboutFV() {
  //   const headerStyle = 'text-xl font-bold mb-1 text-center'
  const paraStyle = 'mb-2'
  return (
    <section
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="AboutFirstVoices"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation
          title="About First Voices"
          accentColor="primary"
        />
        <div className="max-w-4xl mx-auto text-fv-charcoal space-y-4 text-center py-8">
          <p className={paraStyle}>
            This section contains information about FirstVoices, language
            preservation and revitalization, how the projects work and
            frequently asked questions.
          </p>
          <iframe
            width="860"
            height="484"
            title="AboutFirstVoices"
            src="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1704813/About+FirstVoices"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default AboutFV
