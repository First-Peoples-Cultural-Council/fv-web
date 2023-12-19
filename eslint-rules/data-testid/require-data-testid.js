module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce that required elements have a data-testid attribute for testing purposes.',
      recommended: true,
    },
    fixable: null,
    schema: [],
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.name === 'div' || node.name.name === 'button') {
          const hasDataTestId = node.attributes.some(
            (attr) => attr.name && attr.name.name === 'data-testid',
          )
          if (!hasDataTestId) {
            context.report({
              node,
              message: `{{currentElement}} elements must have a 'data-testid' attribute present.`,
              data: {
                currentElement: node.name.name,
              },
            })
          }
        }
      },
    }
  },
}
