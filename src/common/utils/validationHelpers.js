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

// Yup Validator Definition Helpers
export const definitions = {
  idArray: () => yup.array().of(uuid),
  objectArray: () => yup.array().of(yup.object({ id: uuid })),
  label: () => yup.string().max(35).trim(),
  latinOnly: ({ message = 'This is a required field' } = {}) =>
    yup
      .string()
      .max(20)
      .required(message)
      .trim()
      .matches(
        /^[aA-zZ-]+$/,
        'Only Latin alphabet characters and hyphens are allowed in this field (e.g. our-people)',
      ),
  stringArray: () => yup.array().of(yup.string()),
  title: () => yup.string().max(90).min(1).trim(),
  paragraph: ({ charCount = 250 } = {}) =>
    yup.string().max(charCount).nullable().trim(),
  translations: () =>
    yup.array().of(
      yup.object({
        language: yup
          .string()
          .matches(/(english|french)/, { excludeEmptyString: true }),
        translation: yup.string().trim(),
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
    yup.string().min(5).required('A unique nickname is required').trim(),
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
