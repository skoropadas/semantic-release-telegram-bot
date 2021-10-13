module.exports = {
	plugins: [
		[
			'./lib/index.js',
			{
				notifyOnFail: false,
				notifyOnSuccess: false,
				notifications: [],
			},
		],
	],
};
