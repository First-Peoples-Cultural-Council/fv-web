import React, { Fragment } from 'react'
import { useController } from 'react-hook-form'

import PropTypes from 'prop-types'

// FPCC
import HelpText from 'components/Form/HelpText'
import FieldLabel from 'components/Form/FieldLabel'
import ValidationError from 'components/Form/ValidationError'
import AutocompleteMultiSelect from 'components/AutocompleteMultiSelect'

function AutocompleteMultiple({
  control,
  errors,
  placeholder,
  helpText,
  label = '',
  nameId,
  options,
}) {
  const { field } = useController({
    name: nameId,
    control,
  })

  const getCurrentLabel = (currentValue) => {
    const currentOption = options?.find(({ value }) => value === currentValue)
    return currentOption?.label ? currentOption?.label : ''
  }

  return (
    <Fragment data-testid="FormAutocompleteMultiple">
      <FieldLabel nameId={nameId} text={label} />
      <div className="w-full">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <AutocompleteMultiSelect
              selectedOptions={field?.value}
              placeholder={placeholder}
              options={options}
              onChange={field?.onChange}
              onBlur={field?.onBlur}
            />
          </div>
          <div className="col-span-6">
            <p className="text-xs">Selected {label?.toLowerCase()}:</p>
            {field?.value?.length > 0 &&
              field?.value
                ?.map((optionValue) => getCurrentLabel(optionValue))
                .join(', ')}
          </div>
        </div>
      </div>
      <HelpText text={helpText} />
      <ValidationError errors={errors} nameId={nameId} />
    </Fragment>
  )
}

// PROPTYPES
const { any, arrayOf, object, shape, string } = PropTypes
AutocompleteMultiple.propTypes = {
  label: string,
  nameId: string.isRequired,
  options: arrayOf(shape({ label: string, value: any })),
  placeholder: string,
  control: object,
  helpText: string,
  errors: object,
}

export default AutocompleteMultiple
