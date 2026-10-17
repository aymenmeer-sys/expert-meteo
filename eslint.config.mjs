import eslint from '@eslint/js'
import nextVitals from 'eslint-config-next/core-web-vitals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['.next/**', 'node_modules/**', 'public/sw.js', 'drizzle/**', 'tests/load/**'] },
  eslint.configs.recommended,
  ...nextVitals,
  ...tseslint.configs.recommended,
  {
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/refs': 'off',
      '@next/next/no-location-assign-relative-destination': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'no-empty': 'off',
    },
  },
)
