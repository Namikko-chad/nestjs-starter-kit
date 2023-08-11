const tsRules = {
  // TypeScript would check it on its own
  /**
   * @link https://eslint.org/docs/latest/rules/indent#rule-details
   * @description Заменяет табуляцию на два пробела в начале строки
   * @summary Для удобства чтения
   */
  indent: [
    'error',
    2,
    {
      SwitchCase: 1,
      ignoredNodes: [
        // `PropertyDefinition`,
      ],
    },
  ],
  /**
   * @link https://eslint.org/docs/latest/rules/comma-dangle#rule-details
   * @description Добавляет запятые после элементов
   * @summary Для скорости добавления новых элементов
   */
  'comma-dangle': [
    'warn',
    {
      arrays: 'never',
      objects: 'always',
      imports: 'always',
      exports: 'always',
      functions: 'never',
    },
  ],
  /**
   * @link https://eslint.org/docs/latest/rules/quotes#rule-details
   * @description Заменяет ковычки на одинарные
   * @summary Для удобства чтения
   */
  quotes: ['warn', 'single'],
  /**
   * @link https://eslint.org/docs/latest/rules/array-bracket-spacing#rule-details
   * @description Убирает пробелы в элементах массива
   * @summary Для удобства чтения
   */
  'array-bracket-spacing': ['warn', 'never'],
  /**
   * @link https://eslint.org/docs/latest/rules/array-callback-return#rule-details
   * @description Требует всегда возвращать значение во всех методах массива в которые передается колбэк
   * @summary Для гибкости
   */
  'array-callback-return': 'off',
  /**
   * @link https://eslint.org/docs/latest/rules/computed-property-spacing#rule-details
   * @description Убирает пробелы в элементах массива
   * @summary Для удобства чтения
   */
  'computed-property-spacing': ['warn', 'never'],
  /**
   * @link https://eslint.org/docs/latest/rules/func-style#rule-details
   * @description Декларирование функций
   * @summary Для удобства чтения
   */
  'func-style': ['warn', 'declaration', { allowArrowFunctions: true }],
  /**
   * @link https://eslint.org/docs/latest/rules/guard-for-in#rule-details
   * @description
   * @summary Для удобства
   */
  'guard-for-in': 'off', //
  /**
   * @link https://eslint.org/docs/latest/rules/max-len#rule-details
   * @description Максимальная длина строки
   * @summary Для удобства
   */
  'max-len': ['error', 150],
  /**
   * @link https://eslint.org/docs/latest/rules/no-await-in-loop#rule-details
   * @description
   * @summary Для удобства
   */
  'no-await-in-loop': 'off',
  /**
   * @link https://eslint.org/docs/latest/rules/no-fallthrough#rule-details
   * @description Запрещяет выполнение нескольких блоков case подряд
   * @summary Для удобства
   */
  'no-fallthrough': 'off',
  /**
   * @link https://eslint.org/docs/latest/rules/no-param-reassign#rule-details
   * @description Запрещает переназначать переданные свойства
   * @summary Для безопасности
   */
  'no-param-reassign': 'warn',
  /**
   * @link https://eslint.org/docs/latest/rules/no-plusplus#rule-details
   * @description Разрешает унарный оператор ++ и --
   * @summary Для удобства
   */
  'no-plusplus': 'off',
  /**
   * @link https://eslint.org/docs/latest/rules/no-restricted-syntax#rule-details
   * @description
   * @summary
   */
  'no-restricted-syntax': 'off',
  /**
   * @link https://eslint.org/docs/latest/rules/no-return-await#rule-details
   * @description Разрешает возвращать промис
   * @summary Для удобства
   */
  'no-return-await': 'off',
  /**
   * @link https://eslint.org/docs/latest/rules/object-curly-spacing#rule-details
   * @description Добавляет пробелы в свойства объектов
   * @summary Улучшение читаемости
   */
  'object-curly-spacing': ['warn', 'always'],
  /**
   * @link https://eslint.org/docs/latest/rules/padding-line-between-statements#rule-details
   * @description Добавляет переводы строк
   * @summary Улучшение читаемости
   */
  'padding-line-between-statements': [
    'warn',
    { blankLine: 'always', prev: '*', next: 'return' },
    { blankLine: 'always', prev: '*', next: 'block-like' },
    { blankLine: 'always', prev: 'block-like', next: '*' },
    // { 'blankLine': 'always', 'prev': '*', 'next': 'throw' },
    // { 'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*' },
    // { 'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var'] }
  ],
  /**
   * @link https://eslint.org/docs/latest/rules/require-await
   * @description Требует указывать await при вызове асинхронных функций
   * @summary Нельзя упустить выполнения промиса
   */
  'require-await': 'off',
  /**
   * @link https://eslint.org/docs/latest/rules/semi#rule-details
   * @description Проставление точекзпт
   * @summary Улучшение читаемости
   */
  semi: ['error', 'always'],
  /**
   * @link https://www.npmjs.com/package/eslint-plugin-simple-import-sort
   * @description Упорядочивание импортов
   * @summary Улучшение читаемости
   */
  'simple-import-sort/imports': [
    'error',
    {
      groups: [
        // Packages `nest` related packages come first.
        ['^@nestjs', '^@?\\w'],
        ['^@hapi', '^@?\\w'],
        ['^@jest', '^@?\\w'],
        ['^@libs', '^@?\\w'],
        // Internal packages.
        ['^(@|app)(/.*|$)'],
        // Side effect imports.
        ['^\\u0000'],
        // Parent imports. Put `..` last.
        ['^\\\\.\\\\.(?!/?$)", "^\\\\.\\\\./?$'],
        // Other relative imports. Put same-folder imports and `.` last.
        ['^\\\\./(?=.*/)(?!/?$)", "^\\\\.(?!/?$)", "^\\\\./?$'],
      ],
    },
  ],
  /**
   * @link https://typescript-eslint.io/rules/ban-types
   * @description Требует типизации
   * @summary Более строгая типизация оставляет меньше места для ошибок
   */
  '@typescript-eslint/ban-types': 'warn',
  /**
   * @link https://typescript-eslint.io/rules/no-unused-vars/
   * @description Требует использовать все переменные
   * @summary используются все ресурсы
   */
  '@typescript-eslint/no-unused-vars': ["off", /*{ "destructuredArrayIgnorePattern": "^_" }*/],
  /**
   * @link https://typescript-eslint.io/rules/no-var-requires/
   * @description Запрещяет использование var и старых способов импорта
   * @summary Однотипные импорты и код доступен в своей области видимости
   */
  '@typescript-eslint/no-var-requires': 'warn',
  '@typescript-eslint/indent': ['error', 2],
  // For Hapi.js
  '@hapi/hapi/scope-start': 'off',
  '@hapi/hapi/for-loop': 'off',
};

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
  root: true,
  ignorePatterns: ['node_modules/', 'build/', 'dist/', 'docs/', '*.d.ts', '*.json*', '*.md'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:security/recommended',
        'prettier',
      ],
      env: {
        node: true,
      },
      rules: tsRules,
    },
    {
      files: ['*.spec.ts', '*.test.ts', '*.try.ts', '*.mock.ts'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'prettier',
      ],
      env: {
        node: true,
        jest: true,
      },
      rules: {
        ...tsRules,
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-types': 'off',
      },
    },
  ],
};