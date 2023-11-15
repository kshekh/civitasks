/** @type {import('ts-jest').JestConfigWithTsJest} */
const { pathsToModuleNameMapper } = require('ts-jest');
const requireJSON5 = require('require-json5');
const { compilerOptions } = requireJSON5('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "moduleFileExtensions": [
    "js",
    "jsx",
    "tsx",
    "ts"
  ],
  // "roots": ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};

module.exports.moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */);
