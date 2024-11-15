import React from 'react'

// FPCC
import getIcon from 'common/utils/getIcon'
import useSearchTerm from 'common/hooks/useSearchTerm'

function SearchLanguagesFormContainer() {
  const {
    displayedSearchTerm,
    handleSearchTermChange,
    setSubmittedSearchTerm,
    searchTermInUrl,
    setSearchTermInUrl,
    clearSearchTerm,
  } = useSearchTerm()

  const submitHandler = (event) => {
    event.preventDefault()
    setSubmittedSearchTerm(displayedSearchTerm)
    if (displayedSearchTerm !== searchTermInUrl) {
      setSearchTermInUrl(displayedSearchTerm)
    }
  }

  return (
    <div id="SearchLanguagesFormContainer" className="flex w-full">
      <div className="flex w-full md:w-1/2 mx-auto border-2 p-2 rounded-lg">
        <form onSubmit={submitHandler} className="flex items-stretch grow">
          <label id="SearchLabel" htmlFor="SearchInput" className="sr-only">
            Search Bar Input
          </label>
          <input
            data-testid="search-languages-input"
            id="SearchInput"
            aria-labelledby="SearchLabel"
            className="block w-full md:text-xl lg:text-2xl text-charcoal-500 rounded-none rounded-l-md pl-4 truncate border-0"
            type="text"
            placeholder="Search for a language site"
            onInput={handleSearchTermChange}
            value={displayedSearchTerm}
          />
        </form>

        <div className="relative inline-flex items-center px-2 py-1.5 text-charcoal-500 border-l-2 border-charcoal-200 rounded-r-md bg-charcoal-50 hover:bg-charcoal-50">
          <button
            type="button"
            data-testid="submit-search-btn"
            aria-label="Search/Go"
            onClick={submitHandler}
          >
            {getIcon('Search', 'fill-current h-7 w-7 ')}
          </button>
        </div>
        {searchTermInUrl && (
          <button
            data-testid="clear-search-btn"
            type="button"
            className="inline-flex items-center ml-4 my-1 px-2 text-charcoal-500 border-charcoal-200 text-sm font-medium rounded-lg bg-charcoal-50 hover:bg-charcoal-100"
            onClick={clearSearchTerm}
          >
            Clear Search
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchLanguagesFormContainer
