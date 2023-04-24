import React from 'react'
import PropTypes from 'prop-types'
import ErrorHandlerPresentation from 'components/ErrorHandler/ErrorHandlerPresentation'
import ErrorHandlerData from 'components/ErrorHandler/ErrorHandlerData'

function ErrorHandlerContainer({ error }) {
  const { backHandler, errorStatusCode, errorStatusText } = ErrorHandlerData()
  let errorStatus = null
  let errorText = null

  if (error && error?.status) {
    errorStatus = error?.status
    errorText = error?.statusText
  }
  if (errorStatusCode) {
    errorStatus = errorStatusCode
    errorText = errorStatusText
  }

  switch (true) {
    case errorStatus === 401:
    case errorStatus === 403:
      return (
        <ErrorHandlerPresentation
          status={errorStatus}
          heading={'Unauthorized'}
          content={errorText ? errorText : 'You do not have permission to view this page.'}
          backHandler={backHandler}
        />
      )
    case errorStatus === 404:
      return (
        <ErrorHandlerPresentation
          status={errorStatus}
          heading={'Not Found'}
          content={errorText ? errorText : "Sorry, we couldn't find that page."}
          backHandler={backHandler}
        />
      )
    // Catch any other 4** errors
    case Math.floor(errorStatusCode / 100) === 4:
      return (
        <ErrorHandlerPresentation
          status={errorStatusCode}
          heading={'Error'}
          content={errorText ? errorText : 'Sorry, please try again. If this issue persists please contact our team.'}
          backHandler={backHandler}
        />
      )
    // Catch any other 5** errors
    case Math.floor(errorStatus / 100) === 5:
      return (
        <ErrorHandlerPresentation
          status={errorStatus}
          heading={'Oops, something went wrong.'}
          content={errorText ? errorText : 'Please try again. If this issue persists please contact our team.'}
          backHandler={backHandler}
        />
      )
    default:
      return (
        <ErrorHandlerPresentation
          status={errorStatus}
          heading={'Oops, something went wrong.'}
          content={'Please try again. If this issue persists please contact our team.'}
          backHandler={backHandler}
        />
      )
  }
}
// PROPTYPES
const { node, object } = PropTypes
ErrorHandlerContainer.propTypes = {
  children: node,
  error: object,
}

export default ErrorHandlerContainer
