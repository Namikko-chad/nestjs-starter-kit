module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.(test|spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '^@libs/config(|/.*)$': '<rootDir>/libs/config/src/$1',
    '^@libs/tools(|/.*)$': '<rootDir>/libs/tools/src/$1',
    '^@libs/utils(|/.*)$': '<rootDir>/libs/utils/src/$1',
    '^@libs/web3(|/.*)$': '<rootDir>/libs/web3/src/$1',
  },
};
