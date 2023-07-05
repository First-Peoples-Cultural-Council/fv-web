import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router-dom'

// Adapted from https://blog.logrocket.com/use-state-url-persist-state-usesearchparams/

function useSearchParamsState({ searchParamName, defaultValue }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const acquiredSearchParam = searchParams.get(searchParamName)
  const searchParamsState = acquiredSearchParam || defaultValue

  const setSearchParamsState = (newState) => {
    const next = {
      ...[...searchParams.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {},
      ),
      [searchParamName]: newState,
    }
    setSearchParams(next)
  }
  return [searchParamsState, setSearchParamsState]
}

// PROPTYPES
const { string } = PropTypes

useSearchParamsState.propTypes = {
  searchParamName: string,
  defaultValue: string,
}

export default useSearchParamsState
