module.exports = {
  projects: [
    {
      displayName: 'test',
      testEnvironment: 'node',
      transform: {
        '.js$': 'babel-7-jest',
      },
      testMatch: [
        '**/__tests__/**/*.js?(x)',
        '**/+(*.)+(spec|test).js?(x)',
      ],
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.js'],
    },
  ],
};
