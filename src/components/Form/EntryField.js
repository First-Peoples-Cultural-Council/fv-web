import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import EntrySelector from 'components/EntrySelector'
import { TYPE_WORD, TYPE_PHRASE } from 'common/constants'
import FieldButton from 'components/Form/FieldButton'
import ValidationError from 'components/Form/ValidationError'

function EntryField({ errors, label, nameId, helpText, control, types }) {
  return (
    <div data-testid={`${nameId}_EntryField`}>
      <label className="block text-sm font-medium text-fv-charcoal">
        {label}
      </label>
      <div className="space-y-2 mt-2">
        <ul className="space-y-2 space-x-1">
          <Controller
            id={nameId}
            name={nameId}
            control={control}
            render={({ field: { value, onChange } }) => (
              <EntryButton
                value={value}
                label={label}
                onChange={onChange}
                types={types}
              />
            )}
          />
        </ul>
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-fv-charcoal-light">{helpText}</p>
      )}
      <ValidationError errors={errors} nameId={nameId} />
    </div>
  )
}

function EntryButton({ label, onChange, types, value }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const add = (entry) => {
    onChange(entry)
    setIsModalOpen(false)
  }

  const remove = () => {
    onChange(null)
  }
  return (
    <div data-testid="EntryButton">
      {value?.id ? (
        <div className="inline-flex border border-transparent bg-white rounded-lg shadow-md text-sm font-medium p-2 space-x-1">
          <div className="font-bold text-lg">{value?.title}</div>
          <div className="has-tooltip flex items-center">
            <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-primary text-xs -mt-12">
              Remove
            </span>
            <button
              type="button"
              aria-label="Remove"
              className="-mr-1.5 border p-1 border-transparent inline-flex items-center rounded-lg text-sm font-bold text-fv-charcoal hover:bg-gray-300"
              onClick={remove}
            >
              {getIcon('Close', 'fill-current text-fv-charcoal h-5 w-5')}
            </button>
          </div>
        </div>
      ) : (
        <FieldButton
          label={label}
          openModal={() => setIsModalOpen(!isModalOpen)}
        />
      )}
      <Modal.Presentation
        isOpen={isModalOpen}
        closeHandler={() => setIsModalOpen(false)}
      >
        <div className="w-1/2-screen mx-auto rounded-lg overflow-hidden">
          <EntrySelector.Container
            types={types}
            addItem={add}
            removeItem={remove}
          />
        </div>
      </Modal.Presentation>
    </div>
  )
}

// PROPTYPES
const { array, func, object, string } = PropTypes
EntryField.propTypes = {
  errors: object,
  helpText: string,
  label: string,
  nameId: string.isRequired,
  control: object,
  types: array,
}

EntryField.defaultProps = {
  label: 'Dictionary Entry',
  types: [TYPE_PHRASE, TYPE_WORD],
}

EntryButton.propTypes = {
  label: string,
  value: object,
  onChange: func,
  types: array,
}

export default EntryField
