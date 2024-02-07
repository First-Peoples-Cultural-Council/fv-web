import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'
import getIcon from 'common/utils/getIcon'
function CategoriesBrowserPresentation({
  isLoading,
  chooseDocHandler,
  currentCategory,
  setCurrentCategory,
  filteredCategories,
  setQuery,
}) {
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  }

  return (
    <section id="CategoriesBrowserPresentation" className="h-full">
      <div className="w-full bg-white p-4">
        <header className="p-2">
          <div className="flex-1 flex">
            <form className="w-full flex">
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <span className="absolute inset-y-0 left-0 flex items-center">
                  {getIcon('Search', 'fill-current flex-shrink-0 h-5 w-5')}
                </span>
                <input
                  className="h-full w-full border-transparent px-4 py-2 pl-8 pr-3 bg-gray-100 rounded text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
                  placeholder="Search all Categories"
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </form>
          </div>
          {currentCategory && (
            <button
              type="button"
              onClick={() => chooseDocHandler(currentCategory)}
              className="mx-auto my-4 bg-secondary border border-transparent rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
            >
              {getIcon('Add', 'fill-current -ml-1 mr-2 h-5 w-5')}
              <span>Add Category to document</span>
            </button>
          )}
        </header>
        <Loading.Container isLoading={isLoading}>
          {filteredCategories && (
            <section className="text-left">
              <div className="flex justify-start px-4 py-2 font-semibold">
                <h2 className="w-1/2 ml-4">Category</h2>
                <h2 className="w-1/2">Parent Category</h2>
              </div>
              <ul className="flex-col divide-y divide-gray-200 bg-white overflow-y-scroll grow mt-2 h-72">
                {filteredCategories?.map((category) => (
                  <button
                    data-testid="DashboardCategoryRow"
                    type="button"
                    key={category.id}
                    onClick={() => setCurrentCategory(category)}
                    className={`${
                      category?.id === currentCategory?.id
                        ? 'ring-2 ring-offset-2 ring-primary'
                        : 'focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-offset-gray-100 focus-within:ring-primary'
                    } flex mx-auto w-11/12 p-4 cursor-pointer rounded-sm`}
                  >
                    <div className="w-1/2 text-left">{category?.title}</div>
                    <div className="w-1/2 text-left">
                      {category?.parentTitle || '----------'}
                    </div>
                  </button>
                ))}
              </ul>
            </section>
          )}
          {!filteredCategories && (
            <p className="bg-white">You have not created any categories yet</p>
          )}
        </Loading.Container>
      </div>
    </section>
  )
}

// PROPTYPES
const { array, bool, object, func } = PropTypes
CategoriesBrowserPresentation.propTypes = {
  isLoading: bool,
  chooseDocHandler: func,
  currentCategory: object,
  setCurrentCategory: func,
  filteredCategories: array,
  setQuery: func,
}

export default CategoriesBrowserPresentation
