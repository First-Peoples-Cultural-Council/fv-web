import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ImmersionPresentationList from 'components/Immersion/ImmersionPresentationList'
import SectionTitle from 'components/SectionTitle'
import LoadOrError from 'components/LoadOrError'

function ImmersionPresentation({ queryResponse }) {
  return (
    <LoadOrError queryResponse={queryResponse}>
      <section className="py-12 bg-white" data-testid="ImmersionPresentation">
        {queryResponse?.data?.count > 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle.Presentation title="WHAT IS IMMERSION MODE?" />
            <div className="text-center text-charcoal-500 px-20 py-5 space-y-4">
              The language team for this site has added translations for the
              buttons and headers on FirstVoices, so that you can use Immersion
              Mode to navigate through their site in the language. When
              Immersion Mode is turned on, many of the English labels will be
              replaced by labels in the language.
            </div>
            <div className="flex-1 flex items-stretch overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                <div className="min-h-220 col-span-12 md:col-span-10">
                  <h2 className="text-center text-charcoal-900 text-2xl pb-2">
                    Immersion Labels
                  </h2>
                  <ImmersionPresentationList
                    labels={queryResponse?.data?.labels}
                  />
                </div>
              </main>
            </div>
          </div>
        ) : (
          <div className="text-center text-charcoal-500 px-20 py-5 space-y-4">
            No immersion labels have been set for this site yet. Please check
            back later.
          </div>
        )}
      </section>
    </LoadOrError>
  )
}
// PROPTYPES
const { object } = PropTypes
ImmersionPresentation.propTypes = {
  queryResponse: object,
}

export default ImmersionPresentation
