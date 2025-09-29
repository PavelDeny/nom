//nomado-v1\jest.config.mjs
/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: { syntax: "typescript", tsx: true, decorators: true },
          transform: { react: { runtime: "automatic", useBuiltins: true } },
          target: "es2020",
        },
        module: { type: "es6" },
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["<rootDir>/__tests__/**/*.test.ts?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};

export default config;
