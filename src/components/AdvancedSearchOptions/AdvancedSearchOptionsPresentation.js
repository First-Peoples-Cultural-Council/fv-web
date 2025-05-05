import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SingleSelect from 'components/AdvancedSearchOptions/SingleSelect'
import {
  HAS_AUDIO,
  HAS_IMAGE,
  HAS_VIDEO,
  HAS_TRANSLATION,
  HAS_CATEGORIES,
  HAS_RELATED_ENTRIES,
  TRUE,
  FALSE,
  VISIBILITY,
  VISIBILITY_PUBLIC,
  VISIBILITY_MEMBERS,
  VISIBILITY_TEAM,
} from 'common/constants'

function AdvancedSearchOptionsPresentation({ items }) {
  console.log({ items })
  const count = items?.pages[0]?.count
  let countStr = count
  if (count >= 10000) {
    countStr = '10000+'
  }

  return (
    <div
      data-testid="AdvancedSearchOptionsPresentation"
      className="bg-white rounded-lg"
    >
      <div className="mx-auto px-6 py-3 text-center">
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="sr-only">
            Dictionary filters
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-8">
              <p className="text-sm text-charcoal-500">Results : {countStr}</p>
            </div>

            <div className="flex items-baseline space-x-8">
              <SingleSelect
                id={HAS_CATEGORIES}
                options={[
                  { value: null, label: 'Categories' },
                  { value: TRUE, label: 'Has categories' },
                  { value: FALSE, label: 'Has no categories' },
                ]}
              />
              <SingleSelect
                id={HAS_RELATED_ENTRIES}
                options={[
                  { value: null, label: 'Related Entries' },
                  { value: TRUE, label: 'Has related entries' },
                  { value: FALSE, label: 'Has no related entries' },
                ]}
              />
              <SingleSelect
                id={HAS_AUDIO}
                options={[
                  { value: null, label: 'Audio' },
                  { value: TRUE, label: 'Has audio' },
                  { value: FALSE, label: 'Has no audio' },
                ]}
              />
              <SingleSelect
                id={HAS_IMAGE}
                options={[
                  { value: null, label: 'Image' },
                  { value: TRUE, label: 'Has image' },
                  { value: FALSE, label: 'Has no image' },
                ]}
              />
              <SingleSelect
                id={HAS_VIDEO}
                options={[
                  { value: null, label: 'Video' },
                  { value: TRUE, label: 'Has video' },
                  { value: FALSE, label: 'Has no video' },
                ]}
              />
              <SingleSelect
                id={HAS_TRANSLATION}
                options={[
                  { value: null, label: 'Translation' },
                  { value: TRUE, label: 'Has translation' },
                  { value: FALSE, label: 'Has no translation' },
                ]}
              />
              <SingleSelect
                id={VISIBILITY}
                options={[
                  { value: null, label: 'Visibility' },
                  { value: VISIBILITY_PUBLIC, label: 'Public' },
                  { value: VISIBILITY_MEMBERS, label: 'Members Only' },
                  { value: VISIBILITY_TEAM, label: 'Team Only' },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes
AdvancedSearchOptionsPresentation.propTypes = {
  items: object,
}

export default AdvancedSearchOptionsPresentation
