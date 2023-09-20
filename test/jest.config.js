module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      // Votre configuration ts-jest spécifique, si vous en avez une, irait ici.
    }],
  },
};
