module.exports = {
  env: {
    es6: true,
    browser: true,
    commonjs: true,
    node: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:cypress/recommended',
    'plugin:testcafe/recommended',
  ],
  overrides: [],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: [
    'prettier',
    'react',
    'react-hooks',
    'jsx-a11y',
    '@babel',
    'cypress',
    'testcafe',
    'custom-rules',
    '@tanstack/query',
  ],
  ignorePatterns: ['node_modules/', 'webpack/*.js', 'testcafe/*.js'],
  rules: {
    'consistent-return': ['warn'],
    'no-underscore-dangle': ['off'],
    'no-unsafe-optional-chaining': ['warn'],
    'import/no-cycle': ['warn'],
    'import/no-extraneous-dependencies': ['warn'],
    'jsx-a11y/alt-text': ['warn'],
    'jsx-a11y/aria-role': ['warn'],
    'jsx-a11y/media-has-caption': ['off'],
    'custom-rules/require-data-testid': ['warn'],
    // Rules below credited to @imaginary-cloud - see https://www.npmjs.com/package/@imaginary-cloud/eslint-config-react?activeTab=code
    'arrow-body-style': ['error', 'as-needed'],
    'class-methods-use-this': 'off',
    'import/imports-first': 'off',
    'import/newline-after-import': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'error',
    'import/no-webpack-loader-syntax': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'newline-per-chained-call': 'off',
    'no-confusing-arrow': 'off',
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'no-use-before-define': 'off',
    'prefer-template': 'error',
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'react/require-extension': 'off',
    'react/self-closing-comp': 'off',
    'react/sort-comp': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-uses-vars': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        // NOTE: If this error triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input'],
      },
    ],
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'react-hooks/rules-of-hooks': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
          ['assets', './src/assets'],
          ['common', './src/common'],
          ['components', './src/components'],
          ['context', './src/context'],
          ['qa', './src/qa'],
          ['services', './src/services'],
          ['fonts', './src/assets/fonts'],
          ['favicons', './src/assets/favicons'],
          ['images', './src/assets/images'],
        ],
      },
    },
  },
}
