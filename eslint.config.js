import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'storybook-static']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // no semicolons (standard)
      semi: ['error', 'never'],
      // single quotes
      quotes: ['error', 'single'],
      // 2 space indent
      indent: ['error', 2],
      // max line length custom rule
      'max-len': ['error', { code: 120 }],
      // standard style rules
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-trailing-spaces': 'error',
      'space-infix-ops': 'error',
      'keyword-spacing': ['error', { before: true, after: true }],
      'comma-spacing': ['error', { before: false, after: true }],
    },
  },
])
