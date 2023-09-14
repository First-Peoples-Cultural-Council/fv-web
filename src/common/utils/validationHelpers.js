import * as yup from 'yup'

// FPCC
import { UUID_REGEX, PUBLIC, MEMBERS, TEAM } from 'common/constants'
import { getFileExtensions } from 'common/utils/stringHelpers'

const uuid = yup
  .string()
  .typeError('A valid string id is required')
  .matches(UUID_REGEX, {
    message: 'A valid id is required',
    excludeEmptyString: true,
  })
  .nullable()

const stringWithMax = (charCount) =>
  yup
    .string()
    .max(charCount, `Maximum length for this field is ${charCount} characters`)
    .trim()

// Yup Validator Definition Helpers
export const definitions = {
  idArray: () => yup.array().of(uuid),
  objectArray: () => yup.array().of(yup.object()),
  label: () => yup.string().max(35).trim(),
  latinOnly: ({ message = 'This is a required field' } = {}) =>
    stringWithMax(20)
      .required(message)
      .matches(
        /^[aA-zZ-]+$/,
        'Only Latin alphabet characters and hyphens are allowed in this field (e.g. our-people)',
      ),
  stringArray: () => yup.array().of(yup.string()),
  title: ({ charCount = 90 } = {}) => stringWithMax(charCount).min(1),
  paragraph: ({ charCount = 250 } = {}) => stringWithMax(charCount).nullable(),

  textArray: ({ charCount = 225 } = {}) =>
    yup.array().of(
      yup.object({
        text: stringWithMax(charCount),
      }),
    ),
  url: ({ required = false } = {}) =>
    required
      ? yup
          .string()
          .url('URL must be valid')
          .trim()
          .required('At least one URL is required')
      : yup.string().url('URL must be valid').trim(),
  uuid: () => uuid,
  nickname: () =>
    stringWithMax(90).min(5).required('A unique nickname is required'),
  visibility: () => yup.string().required().oneOf([PUBLIC, MEMBERS, TEAM]),
  wysiwyg: ({ charCount = 500 } = {}) =>
    yup
      .object()
      .test(
        'draftjs-length',
        `Maximum length for this field is ${charCount} characters`,
        (value) => {
          const plainText = value?.getCurrentContent
            ? value.getCurrentContent().getPlainText(' ')
            : ''
          return plainText?.length < charCount
        },
      )
      .nullable(),
  file: ({ extensionList = [] } = {}) =>
    yup.mixed().test({
      message: 'Unsupported file type',
      test: (file) => {
        let isValid = true
        if (extensionList.length) {
          isValid = extensionList.includes(getFileExtensions(file?.[0]?.name))
        }
        return isValid
      },
    }),
}
