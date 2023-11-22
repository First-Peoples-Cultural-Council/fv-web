import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

// FPCC
import Form from 'components/Form'
// import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import { PUBLIC, TEAM } from 'common/constants'
import StoryCrudStepWrapper from 'components/StoryCrud/StoryCrudStepWrapper'
import { useParams } from 'react-router-dom'
import { useUserStore } from 'context/UserContext'
import { ASSISTANT } from '../../common/constants/roles'

function StoryAudienceCrudPresentation({ dataToEdit, submitHandler }) {
  const validator = yup.object().shape({
    visibility: yup.string(),
    includeInKids: yup.string(),
  })

  const { sitename } = useParams()
  const { user } = useUserStore()
  const userRoles = user?.roles || {}
  const userSiteRole = userRoles?.[sitename] || ''
  const isAssistant = userSiteRole === ASSISTANT

  const defaultValues = {
    visibility: isAssistant ? TEAM : PUBLIC,
    includeInKids: 'true',
  }

  // pageOrder

  const { control, errors, handleSubmit, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  return (
    <StoryCrudStepWrapper>
      <div
        id="StoryAudienceCrudPresentation"
        className="shadow rounded-md overflow-hidden bg-white"
      >
        <form onReset={reset}>
          <div className="grid grid-cols-12 gap-8 p-8">
            <div className="col-span-12">
              <Form.Visibility
                control={control}
                errors={errors}
                reduceAssistantOptions={isAssistant}
              />
            </div>
            <div className="col-span-6">
              <Form.RadioButtons
                label="Include on the Kids site?"
                control={control}
                errors={errors}
                nameId="includeInKids"
                options={[
                  { label: 'Yes', value: 'true' },
                  { label: 'No', value: 'false' },
                ]}
              />
            </div>
            <div className="col-span-12 flex justify-end mt-6 px-6">
              <Form.SubmitButtons
                submitLabel="Save"
                submitIcon="Save"
                onSubmitClick={handleSubmit(submitHandler)}
              />
            </div>
          </div>
        </form>
      </div>
    </StoryCrudStepWrapper>
  )
}

// PROPTYPES
const { func, object } = PropTypes

StoryAudienceCrudPresentation.propTypes = {
  submitHandler: func,
  dataToEdit: object,
}

export default StoryAudienceCrudPresentation
