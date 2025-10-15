import globals from 'globals'
import { defineConfig } from 'eslint/config'
import parserBabel from '@babel/eslint-parser'

// Plugins
import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import css from '@eslint/css'
import pluginBabel from '@babel/eslint-plugin'
import pluginCypress from 'eslint-plugin-cypress/flat'
import pluginImport from 'eslint-plugin-import'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginReactHooks from 'eslint-plugin-react-hooks'

// FPCC
import pluginCustomRules from './eslint-custom-rules/index.js'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    extends: [
      'js/recommended',
      pluginReact.configs.flat['jsx-runtime'],
      pluginCypress.configs.recommended,
      pluginImport.flatConfigs.recommended,
      pluginJsxA11y.flatConfigs.recommended,
      pluginReactHooks.configs.flat.recommended,
      pluginQuery.configs['flat/recommended'],
      pluginReact.configs.flat.recommended,
      pluginPrettierRecommended,
    ],
    ignores: ['node_modules/**', 'webpack/**'],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      ...pluginJsxA11y.flatConfigs.recommended.languageOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parser: parserBabel,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          configFile: false,
          presets: ['@babel/preset-react'],
        },
      },
    },
    plugins: {
      '@babel': pluginBabel,
      'custom-rules': pluginCustomRules,
      cypress: pluginCypress,
      js,
      react: pluginReact,
      '@tanstack/query': pluginQuery,
    },
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
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
])
