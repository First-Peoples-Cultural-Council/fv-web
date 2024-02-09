import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ImmersionPresentationList from 'components/Immersion/ImmersionPresentationList'
import SectionTitle from 'components/SectionTitle'

function ImmersionPresentation({ actions, isLoadingEntries, items }) {
  return (
    <section className="py-12 bg-white" data-testid="ImmersionPresentation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation
          title="WHAT IS IMMERSION MODE?"
          accentColor="primary"
        />
        <div className="text-center text-fv-charcoal-light px-20 py-5 space-y-4">
          The language team for this site has added translations for the buttons
          and headers on FirstVoices, so that you can use Immersion Mode to
          navigate through their site in the language. When Immersion Mode is
          turned on, many of the English labels will be replaced by labels in
          the language.
        </div>
        <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="min-h-220 col-span-12 md:col-span-10">
              <h2 className="text-center text-fv-charcoal text-2xl pb-2">
                Immersion Labels
              </h2>
              <ImmersionPresentationList
                actions={actions}
                isLoading={isLoadingEntries}
                items={items}
              />
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
// PROPTYPES
const { array, bool } = PropTypes
ImmersionPresentation.propTypes = {
  actions: array,
  isLoadingEntries: bool,
  items: array,
}

export default ImmersionPresentation
