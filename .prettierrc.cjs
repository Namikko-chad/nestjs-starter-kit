module.exports = {
  bracketSpacing: true,
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 150,
  overrides: [
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
  ],
};
