import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { Field, Fieldset, Label, Radio, RadioGroup } from '@headlessui/react'
import { useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// FPCC
import getIcon from 'common/utils/getIcon'
import { definitions } from 'common/utils/validationHelpers'
import useEditForm from 'common/hooks/useEditForm'
import { useMembershipUpdateRole } from 'common/dataHooks/useMemberships'
import ValidationError from 'components/Form/ValidationError'
import {
  LANGUAGE_ADMIN_ENUM_NAME,
  EDITOR_ENUM_NAME,
  ASSISTANT_ENUM_NAME,
  MEMBER_ENUM_NAME,
} from 'common/constants'

function MembershipCrudPresentation({ cancelHandler, membership }) {
  const [t] = useTranslation()
  const mutation = useMembershipUpdateRole()

  const dataToEdit = {
    id: membership?.id,
    role: membership?.role,
  }

  const validator = yup.object().shape({
    role: definitions.role(),
  })

  const defaultValues = {
    role: dataToEdit?.role || '',
  }

  const { control, errors, handleSubmit, reset } = useEditForm({
    defaultValues,
    validator,
    dataToEdit,
  })

  const { field } = useController({
    name: 'role',
    control,
  })

  const roleOptions = [
    {
      id: MEMBER_ENUM_NAME,
      descriptions: [
        { key: 1, text: 'Can view public and members only content' },
      ],
    },
    {
      id: ASSISTANT_ENUM_NAME,
      descriptions: [{ key: 1, text: 'Can upload and edit private entries' }],
    },
    {
      id: EDITOR_ENUM_NAME,
      descriptions: [
        { key: 1, text: 'Can upload and edit all entries' },
        { key: 2, text: 'Can delete and hide/publish entries.' },
      ],
    },
    {
      id: LANGUAGE_ADMIN_ENUM_NAME,
      descriptions: [
        {
          key: 1,
          text: 'Can upload, edit, delete, and hide/publish all entries',
        },
        { key: 2, text: 'Can edit the language site pages and widgets' },
        { key: 3, text: 'Can add site members and team members' },
      ],
    },
  ]

  return (
    <div
      id="MembershipCrudPresentation"
      className="inline-block align-bottom space-y-6 divide-y divide-charcoal-300 bg-white rounded-3xl py-6 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
    >
      <div className="space-y-4 text-left px-6">
        <h3 className="text-xl font-bold text-charcoal-700">
          Choose a role for{' '}
          {membership?.user?.firstName || membership?.user?.email}
        </h3>
        <p className="text-pretty text-sm text-charcoal-400">
          <a
            className="inline-url"
            href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/1704238/Team+roles+on+FirstVoices"
            target="_blank"
            rel="noreferrer noopener"
          >
            Click here
          </a>{' '}
          to learn more about user roles and permissions.
        </p>
      </div>
      <form onReset={reset} className="px-6">
        <Fieldset>
          <RadioGroup
            name="role"
            value={field?.value}
            defaultValue={dataToEdit?.role}
            onChange={field?.onChange}
          >
            {roleOptions.map((role) => (
              <Field key={role.id}>
                <div className="relative flex items-start px-3 py-4">
                  <div className="flex h-6 items-center">
                    <Radio
                      value={role.id}
                      className={`group flex h-6 w-6 items-center justify-center rounded-full border border-blumine-900 ${field?.value === role.id ? 'bg-blumine-900' : 'bg-white'}`}
                    >
                      {getIcon(
                        'Checkmark',
                        `h-3 w-3 fill-white opacity-0 transition ${field?.value === role.id && 'opacity-100'}`,
                      )}
                    </Radio>
                  </div>
                  <div className="ml-6 text-left text-blumine-900">
                    <Label htmlFor={role.id} className="text-base font-bold">
                      {t(`role-${role?.id}`)}
                    </Label>
                    {role.descriptions.map((description) => (
                      <p key={description.key} className="text-sm">
                        {description.text}
                      </p>
                    ))}
                  </div>
                </div>
              </Field>
            ))}
          </RadioGroup>
        </Fieldset>
        <ValidationError errors={errors} nameId="role" />
        <div className="flex w-full py-6 items-center justify-between">
          <button
            data-testid="form-submit"
            type="button"
            onClick={handleSubmit((formData) => {
              mutation.mutate(formData)
            })}
            className="btn-primary btn-md"
          >
            <span>Update</span>
          </button>
          <button
            data-testid="form-cancel"
            type="button"
            onClick={() => cancelHandler()}
            className="btn-tertiary btn-md"
          >
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes

MembershipCrudPresentation.propTypes = {
  cancelHandler: func,
  membership: object,
}

export default MembershipCrudPresentation
