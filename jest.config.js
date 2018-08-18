module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^suggestion_utils/(.*)$': '<rootDir>/src/suggestion_utils/$1',
    '^suggestion_engine/(.*)$': '<rootDir>/src/suggestion_engine/$1',
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
    '^.*\\.(css|less|sass|scss)$': '<rootDir>/test/__mocks__/styleMock.scss',
    '^react-dom/server$':
      '<rootDir>/node_modules/preact-render-to-string/dist/index.js',
    '^react-addons-test-utils$':
      '<rootDir>/node_modules/preact-test-utils/lib/index.js',
    '^react$': '<rootDir>/node_modules/preact-compat/lib/index.js',
    '^react-dom$': '<rootDir>/node_modules/preact-compat/lib/index.js'
  },
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest.transform.js'
  }
};
