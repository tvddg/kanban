import type {Config} from 'jest';
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./"
});

const config: Config = {
  reporters: process.env.CI
    ? [['github-actions', { silent: false }], 'summary']
    : ['default'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
  },
  testEnvironment: "jsdom",
  testMatch: [ 
    '<rootDir>/tests/**/*.test.{ts,tsx}', 
  ]
};

export default createJestConfig(config);
