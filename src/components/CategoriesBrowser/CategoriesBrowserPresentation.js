import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadOrError from 'components/LoadOrError'
import getIcon from 'common/utils/getIcon'
function CategoriesBrowserPresentation({
  categoriesQueryResponse,
  filteredCategories,
  setQuery,
  selectedCategories,
  handleSelectAdditionalItem,
  onAddCategories,
}) {
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  }

  const categoryLabelForPluralisation =
    selectedCategories.length === 1
      ? 'category'
      : `${selectedCategories.length} categories`

  return (
    <section id="CategoriesBrowserPresentation" className="h-full">
      <div className="w-full bg-white rounded-lg p-4">
        <header className="p-2 flex flex-col items-center space-y-4">
          <div className="w-full max-w-lg">
            <form className="w-full">
              <div className="inline-flex items-center w-full bg-charcoal-50 rounded-lg px-4 py-2">
                <span className="flex items-center">
                  {getIcon('Search', 'fill-current h-5 w-5 text-charcoal-500')}
                </span>
                <input
                  className="w-full bg-charcoal-50 border-transparent px-4 py-2 text-base text-charcoal-900 placeholder-charcoal-500 focus:outline-none"
                  placeholder="Search all Categories"
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </form>
          </div>
          <button
            data-testid="add-category"
            type="button"
            onClick={onAddCategories}
            disabled={selectedCategories.length < 1}
            className="btn-primary btn-md mx-auto my-4"
          >
            {selectedCategories.length > 0 && getIcon('Add')}
            <span>
              {selectedCategories.length > 0
                ? `Add  ${categoryLabelForPluralisation}`
                : 'Choose categories'}
            </span>
          </button>
        </header>

        <LoadOrError queryResponse={categoriesQueryResponse}>
          {filteredCategories.length > 0 ? (
            <>
              <div className="flex px-4 py-2 font-semibold border-b border-charcoal-100">
                <h2 className="w-1/2">Category</h2>
                <h2 className="w-1/2">Parent Category</h2>
              </div>
              <ul className="overflow-y-auto h-72 mt-2 divide-y divide-charcoal-100">
                {filteredCategories.map((category) => {
                  const isSelected = selectedCategories.some(
                    (c) => c.id === category.id,
                  )
                  return (
                    <li key={category.id} className="p-1">
                      <button
                        data-testid={`${category.title}-btn`}
                        type="button"
                        onClick={() => handleSelectAdditionalItem(category)}
                        className={`w-full flex items-center px-4 py-3 ${
                          isSelected
                            ? 'ring-2 ring-blumine-500 bg-charcoal-50'
                            : 'hover:bg-charcoal-50'
                        } rounded-sm`}
                      >
                        <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center mr-3">
                          {isSelected &&
                            getIcon(
                              'CheckCircleSolid',
                              'h-6 w-6 fill-blumine-500',
                            )}
                        </span>
                        <div className="w-1/2 text-left">{category.title}</div>
                        <div className="w-1/2 text-left">
                          {category.parentTitle || '—'}
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          ) : (
            <p className="p-4 bg-white text-center">
              You have not created any categories yet
            </p>
          )}
        </LoadOrError>
      </div>
    </section>
  )
}

const { array, object, func } = PropTypes
CategoriesBrowserPresentation.propTypes = {
  categoriesQueryResponse: object.isRequired,
  selectedCategories: array.isRequired,
  handleSelectAdditionalItem: func.isRequired,
  onAddCategories: func.isRequired,
  filteredCategories: array.isRequired,
  setQuery: func.isRequired,
}

export default CategoriesBrowserPresentation
