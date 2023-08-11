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
    '^@libs/blockchain(|/.*)$': '<rootDir>/libs/blockchain/src/$1',
    '^@libs/config(|/.*)$': '<rootDir>/libs/config/src/$1',
    '^@libs/openocean(|/.*)$': '<rootDir>/libs/openocean/src/$1',
    '^@libs/symbiosis(|/.*)$': '<rootDir>/libs/symbiosis/src/$1',
    '^@libs/tools(|/.*)$': '<rootDir>/libs/tools/src/$1',
    '^@libs/transit(|/.*)$': '<rootDir>/libs/transit/src/$1',
    '^@libs/tron(|/.*)$': '<rootDir>/libs/tron/src/$1',
    '^@libs/utils(|/.*)$': '<rootDir>/libs/utils/src/$1',
    '^@libs/web3(|/.*)$': '<rootDir>/libs/web3/src/$1',
  },
};
