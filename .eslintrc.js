module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    '@imaginary-cloud/react',
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
    '@babel',
    'cypress',
    'testcafe',
    'custom-rules',
  ],
  ignorePatterns: ['webpack/*.js', 'testcafe/*.js'],
  rules: {
    'consistent-return': ['warn'],
    'no-underscore-dangle': ['off'],
    'no-unsafe-optional-chaining': ['warn'],
    'import/no-cycle': ['warn'],
    'import/no-extraneous-dependencies': ['warn'],
    'jsx-a11y/alt-text': ['warn'],
    'jsx-a11y/aria-role': ['warn'],
    'jsx-a11y/media-has-caption': ['off'],
    'custom-rules/require-data-testid': ['error'],
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
