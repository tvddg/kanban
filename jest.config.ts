import type {Config} from 'jest';
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./"
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
  },
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
