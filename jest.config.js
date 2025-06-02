/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "jest-expo",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js"],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
};