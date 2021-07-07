module.exports = {
  env: { browser: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true } },
  settings: { react: { version: 'detect' } },
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        semi: false,
        singleQuote: true,
        trailingComma: 'none'
      }
    ]
  }
}