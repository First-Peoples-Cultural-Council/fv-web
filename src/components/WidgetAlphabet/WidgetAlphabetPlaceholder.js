import React from 'react'
import SectionTitle from 'components/SectionTitle'

function WidgetAlphabetPlaceholder() {
  return (
    <section id="WidgetAlphabetPlaceholder" className="p-6 md:p-12">
      <div className="mb-6 lg:mb-10">
        <SectionTitle.Presentation title="Alphabet" />
      </div>
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 lg:gap-11">
            <div className="col-span-12 md:col-span-7 py-3 md:pr-6 lg:pr-11 md:border-r-2 border-charcoal-200 content-center">
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
            <div className="hidden md:block md:col-span-5 content-center">
              <div className="text-center sm:text-3xl text-2xl p-20 bg-charcoal-50 text-charcoal-50">
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WidgetAlphabetPlaceholder
