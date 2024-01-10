import * as yup from 'yup'
import get from 'lodash.get'

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

const uniquePropertyTest = function (value, propertyName, message) {
  if (
    this.parent
      .filter((v) => v !== value)
      .some((v) => get(v, propertyName) === get(value, propertyName))
  ) {
    throw this.createError({
      path: `${this.path}.${propertyName}`,
      message,
    })
  }

  return true
}
yup.addMethod(yup.object, 'uniqueProperty', function (propertyName, message) {
  return this.test('unique', message, function (value) {
    return uniquePropertyTest.call(this, value, propertyName, message)
  })
})
yup.addMethod(yup.object, 'uniqueProperties', function (propertyNames) {
  return this.test('unique', '', function (value) {
    const errors = propertyNames
      .map(([propertyName, message]) => {
        try {
          return uniquePropertyTest.call(this, value, propertyName, message)
        } catch (error) {
          return error
        }
      })
      .filter((error) => error instanceof yup.ValidationError)

    if (errors?.length > 0) {
      throw new yup.ValidationError(errors)
    }

    return true
  })
})

const relatedVideoLinksUrls = yup
  .string()
  .trim()
  .matches(
    /(^(https?:\/\/)?|^)(?:www.)?(?:((vimeo)\.com\/(.+))|((youtube)\.com\/watch\?v=(.+)))/,
    {
      message: 'Only YouTube and Vimeo links are currently supported',
      excludeEmptyString: true,
    },
  )

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
        text: stringWithMax(charCount).min(
          1,
          'This field cannot be empty. Remove it if you do not want to include it.',
        ),
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
  nickname: ({ charCount = 45 } = {}) =>
    yup
      .string()
      .min(5)
      .max(charCount)
      .required('A unique nickname is required')
      .trim(),
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
      .notRequired()
      .nullable()
      .transform((value) => value || null),
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
  relatedVideoUrlsArray: () =>
    yup.array().of(
      yup
        .object({
          text: relatedVideoLinksUrls.min(
            1,
            'This field cannot be empty. Remove it if you do not want to include it.',
          ),
        })
        .uniqueProperties([['text', 'Duplicate links are not allowed.']]),
    ),
}
