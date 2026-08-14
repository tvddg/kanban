import type {Config} from 'jest';
import nextJest from "next/jest.js";
import { createDefaultEsmPreset } from "ts-jest";

const tsEsmJestCfg = createDefaultEsmPreset();

const createJestConfig = nextJest({
    dir: './',
});

const config: Config = {
  clearMocks: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/e2e/'
  ],
  moduleNameMapper: {
    '^next/image$': '<rootDir>/__mocks__/next-image-mock.tsx', 
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  ...tsEsmJestCfg
};

export default createJestConfig(config);
