/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
      '^.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/tests/**/*.spec.ts'],
  moduleDirectories: ['node_modules', 'src'],
};

    module.exports = {
      collectCoverage: true,
      coverageDirectory: "coverage",
      coverageThreshold: {
        global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
      },
    };
    