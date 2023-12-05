import React from 'react'

// FPCC
import SingleSelect from 'components/AdvancedSearchOptions/SingleSelect'
import {
  HAS_AUDIO,
  HAS_IMAGE,
  HAS_VIDEO,
  HAS_TRANSLATION,
  SORT,
  SORT_ALPHABETICAL,
  SORT_CREATED,
  SORT_MODIFIED,
  TRUE,
  FALSE,
} from 'common/constants'

function AdvancedSearchOptionsPresentation() {
  return (
    <div data-testid="AdvancedSearchOptionsPresentation" className="bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <section
          aria-labelledby="filter-heading"
          className="border-t border-gray-200 py-6"
        >
          <h2 id="filter-heading" className="sr-only">
            Dictionary filters
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-8">
              <SingleSelect
                id={SORT}
                label="Sort"
                options={[
                  { value: 'any', label: null },
                  { value: SORT_ALPHABETICAL, label: 'Alphabetical' },
                  { value: SORT_MODIFIED, label: 'Recently modified' },
                  { value: SORT_CREATED, label: 'Recently created' },
                ]}
                menuAlignment="left"
              />
            </div>

            <div className="flex items-baseline space-x-8">
              <SingleSelect
                id={HAS_AUDIO}
                label="Audio"
                options={[
                  { value: 'any', label: null },
                  { value: TRUE, label: 'Has audio' },
                  { value: FALSE, label: 'Has no audio' },
                ]}
              />
              <SingleSelect
                id={HAS_IMAGE}
                label="Image"
                options={[
                  { value: 'any', label: null },
                  { value: TRUE, label: 'Has image' },
                  { value: FALSE, label: 'Has no image' },
                ]}
              />
              <SingleSelect
                id={HAS_VIDEO}
                label="Video"
                options={[
                  { value: 'any', label: null },
                  { value: TRUE, label: 'Has video' },
                  { value: FALSE, label: 'Has no video' },
                ]}
              />
              <SingleSelect
                id={HAS_TRANSLATION}
                label="Translation"
                options={[
                  { value: 'any', label: null },
                  { value: TRUE, label: 'Has translation' },
                  { value: FALSE, label: 'Has no translation' },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdvancedSearchOptionsPresentation
