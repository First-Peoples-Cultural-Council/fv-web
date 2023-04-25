import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function useSearchResultSelector({ searchResults }) {
  const [selectedItem, setSelectedItem] = useState()

  useEffect(() => {
    if (!selectedItem && searchResults?.pages?.[0]?.results) {
      const firstFile = searchResults?.pages?.[0]?.results?.[0]
      setSelectedItem(firstFile)
    }
  }, [searchResults])

  return { selectedItem, setSelectedItem }
}

export default useSearchResultSelector

// PROPTYPES
const { arrayOf, object } = PropTypes

useSearchResultSelector.propTypes = {
  searchResults: arrayOf(object),
}
