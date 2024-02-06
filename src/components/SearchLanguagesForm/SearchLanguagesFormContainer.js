import React from 'react'

// FPCC
import SearchBox from 'components/SearchBox'
import getIcon from 'common/utils/getIcon'
import useSearchParamsState from 'common/hooks/useSearchParamsState'
import useSearchTerm from 'common/hooks/useSearchTerm'

function SearchLanguagesFormContainer() {
  const [query, setQuery, removeQuery] = useSearchParamsState({
    searchParamName: 'q',
    defaultValue: '',
  })

  const {
    displayedSearchTerm,
    handleSearchTermChange,
    setSubmittedSearchTerm,
  } = useSearchTerm()

  const submitHandler = (event) => {
    event.preventDefault()
    setSubmittedSearchTerm(displayedSearchTerm)
    if (displayedSearchTerm !== query) {
      setQuery(displayedSearchTerm)
    }
  }

  return (
    <div id="SearchLanguagesFormContainer" className="flex w-full">
      <div className="flex w-full md:w-1/2 mx-auto border-2 p-2 rounded-lg">
        <SearchBox.Presentation
          onSubmit={submitHandler}
          setSearchTerm={handleSearchTermChange}
          searchTerm={displayedSearchTerm}
          placeholder="Search for a language site"
        />

        <div className="relative inline-flex items-center px-2 py-1.5 text-fv-charcoal-light border-l-2 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
          <button
            type="button"
            id="SearchSubmit"
            aria-label="Search/Go"
            onClick={submitHandler}
          >
            {getIcon('Search', 'fill-current h-7 w-7 ')}
          </button>
        </div>
        {query && (
          <button
            type="button"
            className="inline-flex items-center ml-4 my-1 px-2 text-fv-charcoal-light border-gray-300 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200"
            onClick={removeQuery}
          >
            Clear Search
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchLanguagesFormContainer
