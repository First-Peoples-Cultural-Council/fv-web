import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC

import useSearchModal from 'common/hooks/useSearchModal'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SelectorEntriesPresentationList from 'components/SelectorEntries/SelectorEntriesPresentationList'
import useArrayStateManager from 'common/hooks/useArrayStateManager'
import getIcon from 'common/utils/getIcon'

function SelectorEntriesContainer({
  formEntries,
  isModalOpen,
  types,
  updateFormEntries,
  visibility,
}) {
  const infiniteQueryResponse = useSearchModal({ types, visibility })

  const { selectedItems, setSelectedItems, handleSelectAdditionalItem } =
    useArrayStateManager({ maxItems: 30 })

  // Clear the Selected items when the modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setSelectedItems([])
    }
  }, [isModalOpen, setSelectedItems])

  return (
    <div
      id="SelectorEntriesContainer"
      className="h-4/5-screen w-3/4-screen mx-auto rounded-lg overflow-y-scroll bg-charcoal-50 p-6"
    >
      <div className="h-full flex flex-col space-y-4">
        <h2 className="text-center text-2xl font-bold text-charcoal-900">
          Search dictionary entries
        </h2>
        <div className="w-full bg-charcoal-50 flex justify-center space-x-4">
          <button
            data-testid="add-btn"
            type="button"
            className="capitalize disabled:pointer-events-none disabled:bg-charcoal-50 disabled:opacity-50 btn-outlined hover:btn-contained"
            onClick={() => updateFormEntries(selectedItems)}
            disabled={selectedItems?.length < 1}
          >
            {getIcon('Add', 'btn-icon')}
            <span>
              {selectedItems?.length > 0
                ? `Add ${selectedItems.length} related entries`
                : 'Select Items'}
            </span>
          </button>
        </div>
        <div className="grow">
          <section className="h-full bg-charcoal-50">
            <div className="h-full w-full flex flex-col">
              <div className="w-3/4 mx-auto">
                <SelectorSearchbox.Presentation
                  onSearchChange={infiniteQueryResponse?.handleSearchTermChange}
                  onSearchSubmit={infiniteQueryResponse?.handleSearchSubmit}
                  searchPlaceholder="Search all words and phrases"
                  searchValue={infiniteQueryResponse?.displayedSearchTerm}
                />
              </div>
              <div className="grow h-72 overflow-y-scroll">
                <SelectorResultsWrapper.Presentation
                  infiniteQueryResponse={infiniteQueryResponse}
                  resultsSection={
                    <SelectorEntriesPresentationList
                      infiniteQueryResponse={infiniteQueryResponse}
                      formEntries={formEntries}
                      selectedItems={selectedItems}
                      handleSelectAdditionalItem={handleSelectAdditionalItem}
                      types={types}
                    />
                  }
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { array, arrayOf, bool, func, string } = PropTypes
SelectorEntriesContainer.propTypes = {
  formEntries: array,
  isModalOpen: bool,
  types: arrayOf(string),
  updateFormEntries: func,
  visibility: string,
}

export default SelectorEntriesContainer
