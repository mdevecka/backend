const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../tsconfig');

module.exports = {
  rootDir: "..",
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['<rootDir>'],
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: ".e2e-spec.ts$",
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  collectCoverageFrom: ['**/*.(t|j)s'],
};