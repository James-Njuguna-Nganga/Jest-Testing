/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['<rootDir>/src/tests/*.spec.ts'],
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },

};