module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert', 'deploy'],
    ],
    'scope-empty': [1, 'never'],
    'scope-min-length': [2, 'always', 3],
    'subject-min-length': [2, 'always', 15],
  },
};
