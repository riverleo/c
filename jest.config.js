module.exports = {
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/+(*.)+(spec|test).js?(x)',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  projects: [
    {
      displayName: 'test',
      transform: {
        '.js$': 'babel-7-jest',
      },
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.js'],
    },
  ],
};
