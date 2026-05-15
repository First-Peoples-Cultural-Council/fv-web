import React from 'react'
import SectionTitle from 'components/SectionTitle'

function WidgetAlphabetPlaceholder() {
  return (
    <section
      data-testid="WidgetAlphabetPlaceholder"
      className="py-3 md:py-6 bg-white"
    >
      <div className="mx-5 lg:mx-10 mb-6 lg:mb-12">
        <SectionTitle.Presentation title="ALPHABET" />
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-12 gap-6 lg:gap-11">
          <div className="col-span-7 py-3 pr-6 lg:pr-11 border-r-2 border-charcoal-200 content-center">
            <div className="grid grid-cols-6 lg:grid-cols-7 gap-3">
              {[...new Array(34)].map((_, i) => (
                <span
                  key={i}
                  className="bg-charcoal-50 col-span-1 font-medium inline-flex justify-center p-4 rounded-sm text-2xl"
                >
                  &nbsp;
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-5 content-center">
            <div className="text-center sm:text-3xl text-2xl p-20 bg-charcoal-50 text-charcoal-50">
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WidgetAlphabetPlaceholder
