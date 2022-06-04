module.exports = {
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom",
};