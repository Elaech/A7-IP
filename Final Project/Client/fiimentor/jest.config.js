module.exports = {
	clearMocks: true,
	roots: [
		'<rootDir>/main',
		'<rootDir>/tests',
	],
	testMatch: ['<rootDir>/tests/**/*.test.js'],
	collectCoverageFrom: [
		'<rootDir>/main/**/*.js',
		'!<rootDir>/main/store/store.js',
		'!<rootDir>/main/core/domain/Extension.js',
		'!<rootDir>/main/services/**/*.js',
		'!<rootDir>/main/**/*.scss.d.js',
	],
	coverageDirectory: 'coverage',
	setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
	coverageThreshold: {
		"global": {
			"statements": 90,
		},
	},
	moduleNameMapper: {
		'.(css|less|scss|sass)$': 'identity-obj-proxy'
	},
};
