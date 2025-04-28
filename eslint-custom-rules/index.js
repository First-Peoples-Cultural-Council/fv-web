// https://eslint.org/docs/latest/extend/custom-rule-tutorial
const dataTestIdRule = require('./require-data-testid')
module.exports = { rules: { 'require-data-testid': dataTestIdRule } }
