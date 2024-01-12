import React from 'react'
import SectionTitle from 'components/SectionTitle'

function FVApps() {
  const headerStyle = 'text-xl font-bold mb-1 mt-4'
  const paraStyle = 'mb-2'
  return (
    <section
      className="pt-2 md:pt-4 lg:pt-8 bg-white"
      data-testid="FirstVoicesApps"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation
          title="FirstVoices Apps"
          accentColor="primary"
        />
        <div className="max-w-4xl mx-auto text-fv-charcoal space-y-4 py-8">
          <h2 className={headerStyle}>FirstVoices Keyboard App</h2>
          <p className={paraStyle}>
            The FirstVoices Keyboard App contains keyboard software for over 100
            languages and includes every First Nations language in Canada,
            Australia and New Zealand, plus many languages in the USA.
          </p>
        </div>
      </div>
    </section>
  )
}

export default FVApps
